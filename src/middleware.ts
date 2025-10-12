import { NextRequest, NextResponse } from "next/server";
import { extractTokenFromHeader } from "@/lib/jwt";
import createIntlMiddleware from "next-intl/middleware";

// Constants for better maintainability
const PUBLIC_ROUTES = [
  { path: "/api/user", method: "POST" },
  { path: "/api/user/login", method: "POST" },
  { path: "/api/user/logout", method: "POST" },
] as const;

const isPublicRoute = (pathname: string, method: string): boolean => {
  return PUBLIC_ROUTES.some(
    (route) => route.path === pathname && route.method === method
  );
};

const extractAuthToken = (request: NextRequest): string | null => {
  return (
    extractTokenFromHeader(request.headers.get("authorization")) ||
    request.cookies.get("auth-token")?.value ||
    null
  );
};

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "uk"],
  defaultLocale: "en",
  localePrefix: "always",
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // API: Allow public routes without authentication
  if (isPublicRoute(pathname, method)) {
    return NextResponse.next();
  }

  // API: Require authentication for other user API routes
  if (pathname.startsWith("/api/user/")) {
    const token = extractAuthToken(request);

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Skip JWT verification in middleware (Edge runtime). Actual verification happens in handlers.
    return NextResponse.next();
  }

  // Non-API: handle locale routing
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|api).*)", // all non-API paths without static files
    "/api/user/", // keep API user routes matched for auth
  ],
};
