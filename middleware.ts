import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/de") || pathname.startsWith("/es")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(`/de${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};