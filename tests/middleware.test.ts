import { describe, it, expect, beforeEach, vi } from "vitest";
import { NextRequest, NextResponse } from "next/server";

// Mock auth before importing middleware
const mockAuth = vi.fn();
vi.mock("@/auth-edge", () => ({
  auth: mockAuth,
}));

// Mock next-intl middleware
const mockIntlMiddleware = vi.fn((req: NextRequest) => {
  return new Response(null, { status: 200 });
});

vi.mock("next-intl/middleware", () => ({
  default: vi.fn(() => mockIntlMiddleware),
}));

describe("Middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("should allow NextAuth API routes", async () => {
    // Mock auth to return a function that wraps the handler
    // In NextAuth v5, auth() passes NextAuthRequest directly (NextRequest + .auth property)
    mockAuth.mockImplementation((handler: (req: any) => any) => {
      return async (req: NextRequest, _event?: unknown) => {
        // Add auth to req (as NextAuth does)
        (req as any).auth = null;
        // Call handler with req directly
        return handler(req);
      };
    });

    const { default: middleware } = await import("@/middleware");
    const request = new NextRequest(
      "http://localhost:3000/api/auth/callback/google"
    );

    // event parameter is optional in Next.js middleware, but TypeScript requires it in type definition
    // @ts-expect-error - event is optional and not needed for these tests
    const response = await middleware(request);

    expect(response?.status).toBe(200);
  });

  it("should require authentication for /api/user routes", async () => {
    // Mock auth - unauthenticated user (req.auth = null)
    mockAuth.mockImplementation((handler: (req: any) => any) => {
      return async (req: NextRequest, _event?: unknown) => {
        (req as any).auth = null;
        return handler(req);
      };
    });

    const { default: middleware } = await import("@/middleware");
    const request = new NextRequest("http://localhost:3000/api/user");
    // event parameter is optional in Next.js middleware, but TypeScript requires it in type definition
    // @ts-expect-error - event is optional and not needed for these tests
    const response = await middleware(request);
    const data = await response?.json();

    expect(response?.status).toBe(401);
    expect(data.error).toBe("Authentication required");
  });

  it("should allow authenticated requests to /api/user routes", async () => {
    const mockAuthResult = {
      user: {
        id: "user-id",
        email: "test@example.com",
      },
    };

    // Mock auth - authenticated user
    mockAuth.mockImplementation((handler: (req: any) => any) => {
      return async (req: NextRequest, _event?: unknown) => {
        (req as any).auth = mockAuthResult;
        return handler(req);
      };
    });

    const { default: middleware } = await import("@/middleware");
    const request = new NextRequest("http://localhost:3000/api/user");
    // event parameter is optional in Next.js middleware, but TypeScript requires it in type definition
    // @ts-expect-error - event is optional and not needed for these tests
    const response = await middleware(request);

    // NextResponse.next() returns a response with status 200 by default
    expect(response?.status).toBe(200);
  });
});
