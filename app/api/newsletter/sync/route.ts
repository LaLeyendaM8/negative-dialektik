import { cleanupNewsletter, syncNextNewsletterContact } from "@/lib/newsletter";
import { newsletterSyncAuthorization } from "@/lib/newsletter-token";

export const maxDuration = 60;

export async function POST(request: Request) {
  const auth = newsletterSyncAuthorization(request.headers, process.env.NEWSLETTER_SYNC_SECRET ?? "");
  if (auth !== "authorized") {
    console.warn("Newsletter sync request rejected:", auth);
    return new Response(null, { status: auth === "secret_not_configured" ? 503 : 401 });
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
