import { describe, it, expect } from "vitest";
import {
  loginSchema,
  registrationSchema,
  registrationBaseSchema,
} from "@/lib/validationSchemes";

describe("Validation Schemas", () => {
  describe("loginSchema", () => {
    it("should validate correct login data", () => {
      const validData = {
        email: "test@example.com",
        password: "password123",
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const invalidData = {
        email: "invalid-email",
        password: "password123",
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject empty password", () => {
      const invalidData = {
        email: "test@example.com",
        password: "",
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("registrationSchema", () => {
    it("should validate correct registration data", () => {
      const validData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      };

      const result = registrationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject if passwords don't match", () => {
      const invalidData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "differentpassword",
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("confirmPassword");
      }
    });

    it("should reject short first name", () => {
      const invalidData = {
        firstName: "J",
        lastName: "Doe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject short password", () => {
      const invalidData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "short",
        confirmPassword: "short",
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject invalid email", () => {
      const invalidData = {
        firstName: "John",
        lastName: "Doe",
        email: "invalid-email",
        password: "password123",
        confirmPassword: "password123",
      };

      const result = registrationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});

