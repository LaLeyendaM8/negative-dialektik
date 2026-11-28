import { Resend } from "resend";

type Language = "es" | "de";

export type NewsletterSyncEntry = {
  email: string;
  language: Language;
  status: "confirmed" | "unsubscribed";
  revision: number;
};

const timeout = () => ({ signal: AbortSignal.timeout(7_000) });

function providerMissing(error: { statusCode?: number | null } | null) {
  return error?.statusCode === 404;
}

export async function syncNewsletterContact(
  resend: Pick<Resend, "contacts">,
  segments: Record<Language, string>,
  entry: NewsletterSyncEntry,
) {
  const { email, language, status } = entry;
  if (status === "unsubscribed") {
    const { error } = await resend.contacts.update({ email, unsubscribed: true }, timeout());
    if (error && !providerMissing(error)) throw new Error("Newsletter suppression failed");
    return;
  }
  if (status !== "confirmed") throw new Error("Newsletter contact is not confirmed");

  const segmentId = segments[language];
  const otherId = segments[language === "de" ? "es" : "de"];
  const existing = await resend.contacts.get({ email }, timeout());
  if (providerMissing(existing.error)) {
    const { error } = await resend.contacts.create({ email, segments: [{ id: segmentId }] }, timeout());
    if (error) throw new Error("Newsletter contact creation failed");
    return;
  }
  if (!existing.data || existing.error) throw new Error("Newsletter contact lookup failed");

  const removal = await resend.contacts.segments.remove({ email, segmentId: otherId }, timeout());
  if (removal.error && !providerMissing(removal.error)) throw new Error("Newsletter segment removal failed");
  const addition = await resend.contacts.segments.add({ email, segmentId }, timeout());
  if (addition.error && addition.error.statusCode !== 409) throw new Error("Newsletter segment addition failed");

  if (existing.data.unsubscribed) {
    const { error } = await resend.contacts.update({ email, unsubscribed: false }, timeout());
    if (error) throw new Error("Newsletter contact reactivation failed");
  }
}

export function verifyNewsletterWebhook(
  key: string, webhookSecret: string, payload: string, headers: Headers,
) {
  return new Resend(key).webhooks.verify({
    payload, webhookSecret,
    headers: {
      id: headers.get("svix-id") ?? "",
      timestamp: headers.get("svix-timestamp") ?? "",
      signature: headers.get("svix-signature") ?? "",
    },
  });
}
