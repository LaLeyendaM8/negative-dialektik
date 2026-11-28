import { recordNewsletterUnsubscribe } from "@/lib/newsletter";
import { verifyNewsletterWebhook } from "@/lib/newsletter-resend";
import { normalizeNewsletterEmail } from "@/lib/newsletter-token";

async function readWebhook(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) return Buffer.concat(chunks).toString("utf8");
    total += value.length;
    if (total > 32_768) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
}

export async function POST(request: Request) {
  const webhookSecret = process.env.NEWSLETTER_RESEND_WEBHOOK_SECRET;
  const key = process.env.NEWSLETTER_RESEND_API_KEY;
  if (!webhookSecret || !key) return new Response(null, { status: 503 });

  let event;
  try {
    const payload = await readWebhook(request);
    if (!payload) return new Response(null, { status: 400 });
    event = verifyNewsletterWebhook(key, webhookSecret, payload, request.headers);
  } catch {
    return new Response(null, { status: 400 });
  }

  if (event.type !== "contact.deleted" &&
      !(event.type === "contact.updated" && event.data.unsubscribed === true)) {
    return new Response(null, { status: 204 });
  }
  const email = normalizeNewsletterEmail(event.data.email);
  const eventTime = Date.parse(event.created_at);
  if (!email || !Number.isFinite(eventTime)) return new Response(null, { status: 400 });

  try {
    await recordNewsletterUnsubscribe(email, new Date(eventTime).toISOString());
    return new Response(null, { status: 204 });
  } catch {
    console.error("Newsletter unsubscribe sync failed");
    return new Response(null, { status: 503 });
  }
}
