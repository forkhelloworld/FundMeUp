import { describe, it, expect, beforeEach, vi } from "vitest";
import { POST } from "@/app/api/auth/register/route";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Mock prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

describe("POST /api/auth/register", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should register a new user successfully", async () => {
    const mockUser = {
      id: "test-user-id",
      email: "newuser@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "hashedpassword",
      createdAt: new Date(),
    };

    (prisma.user.findUnique as any).mockResolvedValue(null);
    (prisma.user.create as any).mockResolvedValue(mockUser);

    const request = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        email: "newuser@example.com",
        password: "password123",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.user.email).toBe("newuser@example.com");
    expect(data.user.firstName).toBe("John");
    expect(data.user.lastName).toBe("Doe");
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: "newuser@example.com" },
    });
    expect(prisma.user.create).toHaveBeenCalled();
  });

  it("should return 409 if email already exists", async () => {
    const existingUser = {
      id: "existing-user-id",
      email: "existing@example.com",
      firstName: "Existing",
      lastName: "User",
    };

    (prisma.user.findUnique as any).mockResolvedValue(existingUser);

    const request = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        email: "existing@example.com",
        password: "password123",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.error).toBe("Email already registered");
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("should return 400 for invalid input", async () => {
    const request = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        firstName: "J", // Too short
        lastName: "Doe",
        email: "invalid-email", // Invalid email
        password: "123", // Too short
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Validation failed");
    expect(data.details).toBeDefined();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("should hash password before storing", async () => {
    const mockUser = {
      id: "test-user-id",
      email: "newuser@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "hashedpassword",
      createdAt: new Date(),
    };

    (prisma.user.findUnique as any).mockResolvedValue(null);
    (prisma.user.create as any).mockResolvedValue(mockUser);

    const request = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        email: "newuser@example.com",
        password: "password123",
      }),
    });

    await POST(request);

    const createCall = (prisma.user.create as any).mock.calls[0][0];
    const hashedPassword = createCall.data.password;

    // Password should be hashed (not plain text)
    expect(hashedPassword).not.toBe("password123");
    expect(hashedPassword.length).toBeGreaterThan(20); // bcrypt hash is long
  });
});



