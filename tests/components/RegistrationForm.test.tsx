import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegistrationForm } from "@/components/RegistrationForm";
import * as nextAuth from "next-auth/react";

// Mock fetch
global.fetch = vi.fn();

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
  useSession: vi.fn(() => ({
    data: null,
    status: "unauthenticated",
  })),
}));

// Mock next/navigation
const mockPush = vi.fn();
const mockPathname = "/en/register";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname,
}));

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => (key: string) => {
    if (namespace === "auth.register") {
      const translations: Record<string, string> = {
        title: "Create Account",
        subtitle: "Sign up to get started",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        createAccount: "Create Account",
      };
      return translations[key] || key;
    }
    if (namespace === "common") {
      return key === "loading" ? "Loading..." : key;
    }
    if (namespace === "auth.messages") {
      return key;
    }
    return key;
  },
}));

describe("RegistrationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockClear();
  });

  it("should render registration form with all required fields", () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    // Use getAllByLabelText for password fields since there are two
    const passwordFields = screen.getAllByLabelText(/password/i);
    expect(passwordFields.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  it("should render Google sign up button", () => {
    render(<RegistrationForm />);

    expect(screen.getByRole("button", { name: /sign up with google/i })).toBeInTheDocument();
  });

  it("should handle successful registration", async () => {
    const user = userEvent.setup();

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        user: {
          id: "new-user-id",
          email: "newuser@example.com",
          firstName: "John",
          lastName: "Doe",
        },
      }),
    });

    (nextAuth.signIn as any).mockResolvedValue({ ok: true, error: null });

    render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/first name/i), "John");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/email/i), "newuser@example.com");
    // Get password field by name attribute to be more specific
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: "John",
          lastName: "Doe",
          email: "newuser@example.com",
          password: "password123",
        }),
      });
    });
  });

  it("should show validation error if passwords don't match", async () => {
    const user = userEvent.setup();

    render(<RegistrationForm />);

    // Get password field by name attribute to be more specific
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "differentpassword");

    // Try to submit
    await user.click(screen.getByRole("button", { name: /create account/i }));

    // Form validation should prevent submission
    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it("should handle registration error", async () => {
    const user = userEvent.setup();

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: "Email already registered",
      }),
    });

    render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/first name/i), "John");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/email/i), "existing@example.com");
    // Get password field by name attribute to be more specific
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});

