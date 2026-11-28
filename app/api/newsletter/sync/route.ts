import { cleanupNewsletter, syncNextNewsletterContact } from "@/lib/newsletter";
import { matchesNewsletterSecret } from "@/lib/newsletter-token";

export const maxDuration = 60;

export async function POST(request: Request) {
  const secret = process.env.NEWSLETTER_SYNC_SECRET ?? "";
  if (secret.length < 32 || !matchesNewsletterSecret(request.headers.get("authorization"), `Bearer ${secret}`)) {
    return new Response(null, { status: 401 });
  }
  try {
    await cleanupNewsletter();
    const status = await syncNextNewsletterContact();
    return Response.json({ status }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("Newsletter marketing sync failed; the job remains pending");
    return new Response(null, { status: 503 });
  }
}
