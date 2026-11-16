import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/checkout";
import { isSupportedLanguage } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const langParam = searchParams.get("lang");
  const slug = searchParams.get("slug");
  const lang = langParam && isSupportedLanguage(langParam) ? langParam : "es";

  if (!slug || !/^[a-z0-9-]{1,120}$/.test(slug)) {
    return NextResponse.redirect(new URL(`/${lang}/programm`, request.url));
  }

  try {
    const { url } = await createCheckoutSession({ lang, slug });
    return NextResponse.redirect(url);
  } catch {
    return NextResponse.redirect(
      new URL(
        `/${lang}/checkout/cancel?slug=${encodeURIComponent(slug)}`,
        request.url,
      ),
    );
  }
}
