import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "@/components/LoginForm";

// Mock auth-actions (server actions)
const mockSignInWithGoogle = vi.fn();
const mockSignInWithCredentials = vi.fn();

vi.mock("@/lib/auth-actions", () => ({
  signInWithGoogle: (...args: unknown[]) => mockSignInWithGoogle(...args),
  signInWithCredentials: (...args: unknown[]) =>
    mockSignInWithCredentials(...args),
}));

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
const mockPathname = "/en/login";

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
    if (namespace === "auth.login") {
      const translations: Record<string, string> = {
        title: "Sign In",
        subtitle: "Enter your credentials",
        email: "Email",
        password: "Password",
        signIn: "Sign In",
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

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render login form with email and password fields", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // Use getAllByRole to get all buttons and find the submit button
    const buttons = screen.getAllByRole("button", { name: /sign in/i });
    expect(buttons.length).toBeGreaterThan(0);
    // The submit button should be the first one (type="submit")
    expect(buttons[0]).toBeInTheDocument();
  });

  it("should render Google sign in button", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("button", { name: /sign in with google/i })
    ).toBeInTheDocument();
  });

  it("should handle email/password login", async () => {
    const user = userEvent.setup();
    mockSignInWithCredentials.mockResolvedValue({ ok: true });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    // Get the submit button (first button with "Sign In" text)
    const submitButton = screen.getAllByRole("button", { name: /sign in/i })[0];
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSignInWithCredentials).toHaveBeenCalledWith(
        "test@example.com",
        "password123",
        "/en/lessons"
      );
    });
  });

  it("should handle Google OAuth sign in", async () => {
    const user = userEvent.setup();
    mockSignInWithGoogle.mockResolvedValue(undefined);

    render(<LoginForm />);

    await user.click(
      screen.getByRole("button", { name: /sign in with google/i })
    );

    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalledWith("/en/lessons");
    });
  });

  it("should show validation errors for invalid input", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    // Try to submit without filling fields
    // Get the submit button (first button with "Sign In" text)
    const submitButton = screen.getAllByRole("button", { name: /sign in/i })[0];
    await user.click(submitButton);

    // Form validation should prevent submission
    expect(mockSignInWithCredentials).not.toHaveBeenCalled();
  });
});
