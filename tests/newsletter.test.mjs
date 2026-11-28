import assert from "node:assert/strict";
import { createHmac, randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { PGlite } from "@electric-sql/pglite";
import { syncNewsletterContact, verifyNewsletterWebhook } from "../lib/newsletter-resend.ts";
import {
  hashNewsletterToken, isNewsletterToken, matchesNewsletterSecret,
  newsletterBucket, newsletterToken, normalizeNewsletterEmail,
} from "../lib/newsletter-token.ts";

test("Resend verifies the exact webhook payload and rejects stale signatures", () => {
  const secret = randomBytes(32);
  const webhookSecret = `whsec_${secret.toString("base64")}`;
  const payload = JSON.stringify({ type: "contact.updated", data: { email: "a@example.com", unsubscribed: true } });
  const now = Math.floor(Date.now() / 1000);
  const headers = (timestamp) => new Headers({
    "svix-id": "msg_test",
    "svix-timestamp": String(timestamp),
    "svix-signature": `v1,${createHmac("sha256", secret).update(`msg_test.${timestamp}.${payload}`).digest("base64")}`,
  });
  const verify = (body, time = now) => verifyNewsletterWebhook("re_test", webhookSecret, body, headers(time));
  assert.equal(verify(payload).type, "contact.updated");
  assert.throws(() => verify(payload.replace("true", "false")));
  assert.throws(() => verify(payload, now - 3600));
});

test("Resend sync creates only confirmed contacts and suppresses opt-outs", async () => {
  const calls = [];
  const record = (method, error = null, data = null) => async (body) => {
    calls.push({ method, body });
    return { data, error };
  };
  const resend = { contacts: {
    get: record("get", { statusCode: 404 }),
    create: record("create"),
    update: record("update"),
    segments: { remove: record("remove"), add: record("add") },
  } };
  const segments = { de: "segment-de", es: "segment-es" };
  const entry = { email: "a@example.com", language: "es", revision: 1 };
  const sync = (status) => syncNewsletterContact(resend, segments, { ...entry, status });
  await assert.rejects(sync("pending"), /not confirmed/);
  assert.deepEqual(calls, []);
  await sync("confirmed");
  assert.deepEqual(calls[1].body.segments, [{ id: "segment-es" }]);
  await sync("unsubscribed");
  assert.deepEqual(calls[2], { method: "update", body: { email: entry.email, unsubscribed: true } });
  calls.length = 0;
  resend.contacts.get = record("get", null, { unsubscribed: true });
  await sync("confirmed");
  assert.deepEqual(calls.map(({ method }) => method), ["get", "remove", "add", "update"]);
  assert.equal(calls.at(-1).body.unsubscribed, false);
});

test("token generation, email validation, rate buckets and secret comparison", () => {
  const token = newsletterToken();
  assert.ok(isNewsletterToken(token));
  assert.ok(!isNewsletterToken(token + "x"));
  assert.notEqual(token, newsletterToken());
  assert.match(hashNewsletterToken(token), /^[a-f0-9]{64}$/);
  assert.equal(normalizeNewsletterEmail(" READER@EXAMPLE.COM "), "reader@example.com");
  for (const invalid of ["name@example", "a@b.com,c@d.com", "a@example..com", "a\n@example.com", null]) {
    assert.equal(normalizeNewsletterEmail(invalid), null);
  }
  assert.notEqual(newsletterBucket("203.0.113.1", "first"), newsletterBucket("203.0.113.1", "second"));
  assert.ok(matchesNewsletterSecret("x".repeat(32), "x".repeat(32)));
  assert.ok(!matchesNewsletterSecret("x".repeat(32), "y".repeat(32)));
  assert.ok(!matchesNewsletterSecret("x", "x"));
});

test("newsletter migration and database workflow", async (t) => {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(`
    create role anon;
    create role authenticated;
    create role service_role bypassrls;
    create table newsletter_subscribers (email text);
    insert into newsletter_subscribers values ('legacy@example.com');
  `);
  const migration = await readFile(new URL("../docs/SUPABASE_NEWSLETTER_MIGRATION.sql", import.meta.url), "utf8");
  await db.exec(migration);
  await db.exec(migration);
  const scalar = async (query, args = []) => (await db.query(query, args)).rows[0]?.value;
  const request = (address, hash, bucket = "ip", lang = "de") => scalar(
    "select nd_newsletter_request($1,$2,$3,$4,'first-version','Original consent') as value",
    [address, lang, hash, bucket],
  );
  const confirm = (hash, lang = "de") => scalar("select nd_newsletter_confirm($1,$2) as value", [hash, lang]);
  const email = "reader@example.com";
  const leaseA = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  const leaseB = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
  const claim = async (lease) => (await db.query("select * from nd_newsletter_claim($1)", [lease])).rows;
  const finish = (lease, rev, ok) => db.query("select nd_newsletter_finish($1,$2,$3)", [lease, rev, ok]);

  await t.test("legacy rows stay separate and anonymous users cannot access the RPC", async () => {
    assert.equal(await scalar("select count(*)::int as value from nd_newsletter_subscriptions"), 0);
    await db.exec("set role anon");
    await assert.rejects(confirm("any"), /permission denied/);
    await db.exec("reset role");
  });

  await t.test("first request is pending, cooldown applies, and token is private and language-bound", async () => {
    assert.equal(await request(email, "hash-a"), true);
    assert.equal(await request(email, "hash-b"), false);
    assert.deepEqual(await claim(leaseA), []);
    assert.equal(await confirm("hash-b"), false);
    assert.equal(await confirm("hash-a", "es"), false);
  });

  await t.test("expired tokens fail; a fresh token can be redeemed just once", async () => {
    await db.exec(`update nd_newsletter_subscriptions
      set expires_at = now() - interval '1 second', requested_at = now() - interval '1 day'`);
    assert.equal(await confirm("hash-a"), false);
    assert.equal(await request(email, "hash-c"), true);
    const attempts = await Promise.all([confirm("hash-c"), confirm("hash-c")]);
    assert.deepEqual(attempts.sort(), [false, true]);
    const proof = (await db.query("select consent_version, consent_text from nd_newsletter_consent")).rows;
    assert.deepEqual(proof, [{ consent_version: "first-version", consent_text: "Original consent" }]);
    assert.equal(await scalar("select token_hash as value from nd_newsletter_subscriptions"), null);
    assert.equal(await request(email, "hash-d"), false);
  });

  await t.test("outbox retries, serializes work and preserves opt-out during an in-flight sync", async () => {
    const [job] = await claim(leaseA);
    assert.equal(job.status, "confirmed");
    assert.deepEqual(await claim(leaseB), []);
    await finish(leaseA, job.revision, false);
    assert.deepEqual(await claim(leaseB), []);
    await db.exec("update nd_newsletter_subscriptions set retry_at = now()");
    assert.equal((await claim(leaseA))[0].status, "confirmed");
    await db.query("select nd_newsletter_unsubscribe($1, now() - interval '1 hour')", [email]);
    assert.equal(await scalar("select status as value from nd_newsletter_subscriptions"), "confirmed");
    await db.query("select nd_newsletter_unsubscribe($1, now())", [email]);
    await db.query("select nd_newsletter_unsubscribe($1, now())", [email]);
    await finish(leaseA, job.revision, true);
    const [suppression] = await claim(leaseB);
    assert.equal(suppression.status, "unsubscribed");
    assert.equal(Number(suppression.revision), Number(job.revision) + 1);
    await finish(leaseB, suppression.revision, true);
    assert.deepEqual(await claim(leaseA), []);
  });

  await t.test("resubscription needs fresh consent and rate limits hold across addresses", async () => {
    assert.equal(await request(email, "hash-e", "ip", "es"), false); // cooldown
    await db.exec("update nd_newsletter_subscriptions set requested_at = now() - interval '1 day'");
    assert.equal(await request(email, "hash-f", "new-ip", "es"), true);
    assert.equal(await scalar("select status as value from nd_newsletter_subscriptions"), "unsubscribed");
    assert.deepEqual(await claim(leaseA), []);
    assert.equal(await confirm("hash-f", "es"), true);
    assert.equal(await scalar("select count(*)::int as value from nd_newsletter_consent"), 2);
    for (let i = 0; i < 6; i++) {
      assert.equal(await request(`test${i}@example.com`, `test-hash-${i}`, "limited"), i < 5);
    }
    let accepted = 0;
    for (let i = 0; i < 70; i++) {
      if (await request(`global${i}@example.com`, `global-hash-${i}`, `unique-ip-${i}`)) accepted++;
    }
    assert.ok(accepted > 0 && accepted < 60);
    assert.equal(await scalar("select hits as value from nd_newsletter_limits where bucket = 'global'"), 60);
  });
});
