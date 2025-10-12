import { ApiAchievement } from "@/types/achievements";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  achievements: Array<ApiAchievement>;
  register: (
    userData: Omit<User, "id"> & { password: string }
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  getProfile: () => Promise<User>;
  fetchAchievements: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      achievements: [],

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await fetch("/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Registration failed");
          }

          const data = await response.json();

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Login failed");
          }

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false, isAuthenticated: false });
          throw error instanceof Error ? error : new Error("Login failed");
        }
      },

      logout: async () => {
        try {
          await fetch("/api/user/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          console.error("Logout API error:", error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        try {
          // Verify token by making a request to get user profile
          const response = await fetch("/api/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              isAuthenticated: true,
            });
          } else {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            });
          }
        } catch (error) {
          console.error("Auth check error:", error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      updateUser: (updates) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...updates },
          });
        }
      },

      getProfile: async () => {
        const { token } = get();
        if (!token) throw new Error("No token");
        const response = await fetch("/api/user/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        set({ user: data.user });
        return data.user;
      },
      fetchAchievements: async () => {
        set({ isLoading: true, error: null });
        const { token } = get();
        try {
          // Get current locale from the URL or default to 'en'
          const currentLocale =
            typeof window !== "undefined"
              ? window.location.pathname.split("/")[1] || "en"
              : "en";

          const res = await fetch(`/api/achievements?locale=${currentLocale}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          });
          if (!res.ok) {
            const err = await res.text();
            throw new Error(err || "Failed to load achievements");
          }
          const json = (await res.json()) as { achievements: ApiAchievement[] };
          set({ achievements: json.achievements ?? [], isLoading: false });
          return json.achievements ?? [];
        } catch (e) {
          const message = e instanceof Error ? e.message : "Unknown error";
          set({ error: message, isLoading: false });
        }
      },
    }),
    {
      name: "fundmeup-user-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
