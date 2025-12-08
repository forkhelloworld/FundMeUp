import { describe, it, expect, beforeEach, vi } from "vitest";
import { GET } from "@/app/api/user/route";
import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Mock auth
vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

// Mock prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

describe("GET /api/user", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return user data when authenticated", async () => {
    const mockSession = {
      user: {
        id: "user-id-123",
        email: "test@example.com",
      },
    };

    const mockUser = {
      id: "user-id-123",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      password: "hashed",
      createdAt: new Date(),
    };

    (auth as any).mockResolvedValue(mockSession);
    (prisma.user.findUnique as any).mockResolvedValue(mockUser);

    const request = new NextRequest("http://localhost:3000/api/user");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.user.id).toBe("user-id-123");
    expect(data.user.email).toBe("test@example.com");
    expect(data.user.firstName).toBe("Test");
    expect(data.user.lastName).toBe("User");
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: "user-id-123" },
    });
  });

  it("should return 401 when not authenticated", async () => {
    (auth as any).mockResolvedValue(null);

    const request = new NextRequest("http://localhost:3000/api/user");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Authentication required");
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it("should return 404 when user not found", async () => {
    const mockSession = {
      user: {
        id: "non-existent-id",
        email: "test@example.com",
      },
    };

    (auth as any).mockResolvedValue(mockSession);
    (prisma.user.findUnique as any).mockResolvedValue(null);

    const request = new NextRequest("http://localhost:3000/api/user");
    
    // The route uses createApiHandlerWithContext which throws NotFoundError
    // This will be caught and return 404
    const response = await GET(request);
    const data = await response.json();
    
    // The error handler should catch this and return 404
    expect(response.status).toBe(404);
    expect(data.error).toBeDefined();
  });
});



