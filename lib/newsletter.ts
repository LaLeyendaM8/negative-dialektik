import "server-only";

import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { newsletter as de } from "@/app/content/de/newsletter";
import { newsletter as es } from "@/app/content/es/newsletter";
import { getSiteUrl, type SupportedLanguage } from "./site";
import { hashNewsletterToken, newsletterBucket, newsletterToken } from "./newsletter-token";
import { syncNewsletterContact, type NewsletterSyncEntry } from "./newsletter-resend";

export const newsletterCopy = { de, es };
const consentVersion = "newsletter-2026-11-v1";
const timeout = () => ({ signal: AbortSignal.timeout(7_000) });

function newsletterConfig() {
  const { NEWSLETTER_RESEND_API_KEY: key, NEWSLETTER_FROM_EMAIL: from,
    NEWSLETTER_RATE_LIMIT_SECRET: rateKey, NEWSLETTER_SEGMENT_DE: deSegment,
    NEWSLETTER_SEGMENT_ES: esSegment, NEWSLETTER_RESEND_WEBHOOK_SECRET: webhook,
    NEWSLETTER_SYNC_SECRET: sync } = process.env;
  if (!key || !from || !rateKey || rateKey.length < 32 || !deSegment || !esSegment ||
      deSegment === esSegment || !webhook || !sync || sync.length < 32) {
    throw new Error("Newsletter configuration incomplete");
  }
  return { key, from, rateKey, segments: { de: deSegment, es: esSegment } };
}

async function rpc<T>(name: string, args: Record<string, unknown> = {}): Promise<T> {
  const { SUPABASE_URL: url, SUPABASE_SERVICE_ROLE_KEY: key } = process.env;
  if (!url || !key) throw new Error("Newsletter database configuration missing");

  const response = await fetch(new URL(`/rest/v1/rpc/nd_newsletter_${name}`, url), {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
    ...timeout(),
  });
  if (!response.ok) throw new Error(`Newsletter database operation failed: ${name}`);
  const body = await response.text();
  return (body ? JSON.parse(body) : undefined) as T;
}

export async function requestNewsletter(email: string, lang: SupportedLanguage, ip: string) {
  const { key, from, rateKey } = newsletterConfig();
  const copy = newsletterCopy[lang];
  const token = newsletterToken();
  const hash = hashNewsletterToken(token);
  const created = await rpc<boolean>("request", {
    p_email: email, p_language: lang, p_hash: hash, p_bucket: newsletterBucket(ip, rateKey),
    p_version: consentVersion, p_text: copy.consent,
  });
  if (!created) return;

  const link = new URL(`/${lang}/newsletter/confirm`, getSiteUrl());
  link.hash = token;
  const { error } = await new Resend(key).emails.send({
    from, to: email, subject: copy.mailSubject,
    text: [copy.mailIntro, link.toString(), copy.mailExpiry, "Negative Dialektik"].join("\n\n"),
  }, { idempotencyKey: `nd-newsletter-confirm/${hash}`, ...timeout() });
  if (error) throw new Error("Newsletter confirmation email failed");
}

export function confirmNewsletter(token: string, lang: SupportedLanguage) {
  return rpc<boolean>("confirm", { p_hash: hashNewsletterToken(token), p_language: lang });
}

export function recordNewsletterUnsubscribe(email: string, at: string) {
  return rpc<void>("unsubscribe", { p_email: email, p_at: at });
}

export async function syncNextNewsletterContact() {
  const { key, segments } = newsletterConfig();
  const lease = randomUUID();
  const [entry] = await rpc<NewsletterSyncEntry[]>("claim", { p_lease: lease });
  if (!entry) return "empty";

  let success = false;
  try {
    await syncNewsletterContact(new Resend(key), segments, entry);
    success = true;
  } finally {
    await rpc<void>("finish", { p_lease: lease, p_revision: entry.revision, p_success: success });
  }
  return "synced";
}

export function cleanupNewsletter() {
  return rpc<void>("cleanup");
}
