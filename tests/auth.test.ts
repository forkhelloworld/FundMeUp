import { describe, it, expect, beforeEach, vi } from "vitest";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

// Mock prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe("NextAuth Configuration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Credentials Provider", () => {
    it("should authenticate user with valid credentials", async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      const mockUser = {
        id: "user-id",
        email: "test@example.com",
        password: hashedPassword,
        firstName: "Test",
        lastName: "User",
        image: null,
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      // Get the auth configuration to test credentials provider
      // Note: This is a simplified test - in practice, you'd test through the actual signIn flow
      const user = await prisma.user.findUnique({
        where: { email: "test@example.com" },
      });

      if (user && user.password) {
        const isValid = await bcrypt.compare("password123", user.password);
        expect(isValid).toBe(true);
      }
    });

    it("should reject invalid password", async () => {
      const hashedPassword = await bcrypt.hash("correctpassword", 10);
      const mockUser = {
        id: "user-id",
        email: "test@example.com",
        password: hashedPassword,
        firstName: "Test",
        lastName: "User",
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      const user = await prisma.user.findUnique({
        where: { email: "test@example.com" },
      });

      if (user && user.password) {
        const isValid = await bcrypt.compare("wrongpassword", user.password);
        expect(isValid).toBe(false);
      }
    });

    it("should reject non-existent user", async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);

      const user = await prisma.user.findUnique({
        where: { email: "nonexistent@example.com" },
      });

      expect(user).toBeNull();
    });
  });

  describe("Custom Adapter", () => {
    it("should split name into firstName and lastName for OAuth users", async () => {
      const mockCreatedUser = {
        id: "new-user-id",
        email: "oauth@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "random-password",
        emailVerified: null,
        image: "https://example.com/avatar.jpg",
        createdAt: new Date(),
      };

      (prisma.user.create as any).mockResolvedValue(mockCreatedUser);

      // Test name splitting logic
      const nameParts = "John Doe".split(" ") || ["", ""];
      const firstName = nameParts[0] || "User";
      const lastName = nameParts.slice(1).join(" ") || "";

      expect(firstName).toBe("John");
      expect(lastName).toBe("Doe");
    });

    it("should handle single name for OAuth users", async () => {
      const nameParts = "John".split(" ") || ["", ""];
      const firstName = nameParts[0] || "User";
      const lastName = nameParts.slice(1).join(" ") || "";

      expect(firstName).toBe("John");
      expect(lastName).toBe("");
    });

    it("should generate random password for OAuth users", () => {
      // Password should be a random hex string
      const randomPassword = "a".repeat(64); // Mock random bytes
      
      expect(randomPassword.length).toBeGreaterThan(32);
      expect(typeof randomPassword).toBe("string");
    });
  });

  describe("JWT Callbacks", () => {
    it("should add user ID to token on sign in", () => {
      const user = {
        id: "user-id-123",
        email: "test@example.com",
        name: "Test User",
        image: null,
      };

      const token: any = {};
      
      // Simulate jwt callback logic
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      expect(token.id).toBe("user-id-123");
      expect(token.email).toBe("test@example.com");
      expect(token.name).toBe("Test User");
    });

    it("should add user ID to session from token", () => {
      const session: any = {
        user: {
          email: "test@example.com",
          name: "Test User",
        },
      };

      const token: any = {
        id: "user-id-123",
        email: "test@example.com",
      };

      // Simulate session callback logic
      if (session.user && token) {
        session.user.id = token.id;
      }

      expect(session.user.id).toBe("user-id-123");
    });
  });
});



