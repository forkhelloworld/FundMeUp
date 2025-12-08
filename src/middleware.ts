import { NextResponse } from "next/server";
import { auth } from "@/auth-edge";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "uk"],
  defaultLocale: "en",
  localePrefix: "always",
});

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Allow NextAuth API routes
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  // API: Require authentication for user API routes
  if (pathname.startsWith("/api/user")) {
    if (!req.auth) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // Non-API: handle locale routing
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|api).*)", // all non-API paths without static files
    "/api/user", // API user route (exact match)
    "/api/user/:path*", // API user routes with subpaths
    "/api/auth/:path*", // NextAuth routes
  ],
};
