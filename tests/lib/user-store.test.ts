import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUserStore } from "@/lib/user-store";
import * as nextAuth from "next-auth/react";

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  signOut: vi.fn(),
  useSession: vi.fn(() => ({
    data: null,
    status: "unauthenticated",
  })),
}));

// Mock fetch
global.fetch = vi.fn();

describe("user-store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset store state
    const { result } = renderHook(() => useUserStore());
    act(() => {
      result.current.setSession(null);
    });
  });

  it("should initialize with null user and false authentication", () => {
    const { result } = renderHook(() => useUserStore());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("should set session and update user state", () => {
    const { result } = renderHook(() => useUserStore());

    const mockSession = {
      user: {
        id: "user-id-123",
        email: "test@example.com",
        name: "Test User",
      },
    };

    act(() => {
      result.current.setSession(mockSession as any);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toBeDefined();
    expect(result.current.user?.email).toBe("test@example.com");
  });

  it("should clear session on logout", async () => {
    const { result } = renderHook(() => useUserStore());
    const mockSignOut = vi.fn().mockResolvedValue(undefined);

    (nextAuth.signOut as any).mockImplementation(mockSignOut);

    // Set session first
    act(() => {
      result.current.setSession({
        user: {
          id: "user-id",
          email: "test@example.com",
          name: "Test User",
        },
      } as any);
    });

    expect(result.current.isAuthenticated).toBe(true);

    // Logout
    await act(async () => {
      await result.current.logout();
    });

    expect(mockSignOut).toHaveBeenCalled();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it("should fetch user profile", async () => {
    const { result } = renderHook(() => useUserStore());

    const mockUser = {
      id: "user-id",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
    };

    // Mock window.location.origin
    Object.defineProperty(window, "location", {
      value: { origin: "http://localhost:3000" },
      writable: true,
    });

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });

    let profile;
    await act(async () => {
      profile = await result.current.getProfile();
    });

    expect(profile).toEqual(mockUser);
    expect(result.current.user).toEqual(mockUser);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/user"),
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("should update user data", () => {
    const { result } = renderHook(() => useUserStore());

    // Set initial user
    act(() => {
      result.current.setSession({
        user: {
          id: "user-id",
          email: "test@example.com",
          name: "Test User",
        },
      } as any);
    });

    // Update user
    act(() => {
      result.current.updateUser({ firstName: "Updated" });
    });

    expect(result.current.user?.firstName).toBe("Updated");
  });

  it("should fetch achievements", async () => {
    const { result } = renderHook(() => useUserStore());

    const mockAchievements = [
      { id: "1", key: "first-step", title: "First Step", unlocked: true },
    ];

    // Mock window.location.pathname
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/en/lessons",
      },
      writable: true,
    });

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ achievements: mockAchievements }),
    });

    await act(async () => {
      await result.current.fetchAchievements();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/achievements?locale=en"),
      expect.any(Object)
    );
    expect(result.current.achievements).toEqual(mockAchievements);
    expect(result.current.isLoading).toBe(false);
  });
});

