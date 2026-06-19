import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/checkout";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const langParam = searchParams.get("lang");
  const slug = searchParams.get("slug");
  const lang = langParam === "es" ? "es" : "de";

  if (!slug) {
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
