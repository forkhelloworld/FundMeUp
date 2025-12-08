import { ApiAchievement } from "@/types/achievements";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Extended NextAuth user type with additional fields
interface ExtendedSessionUser {
  id?: string;
  email?: string | null;
  name?: string | null;
  firstName?: string;
  lastName?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  achievements: Array<ApiAchievement>;
  setSession: (session: Session | null) => void;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  getProfile: () => Promise<User>;
  fetchAchievements: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      achievements: [],

      setSession: (session) => {
        if (session?.user) {
          // Extract user data from NextAuth session
          // Note: NextAuth session.user may not have firstName/lastName directly
          // We'll need to fetch it from the API
          const user = session.user as ExtendedSessionUser;
          set({
            isAuthenticated: true,
            user:
              user.id && user.email
                ? {
                    id: user.id,
                    email: user.email || "",
                    firstName: user.firstName || user.name?.split(" ")[0] || "",
                    lastName:
                      user.lastName ||
                      user.name?.split(" ").slice(1).join(" ") ||
                      "",
                  }
                : null,
          });
        } else {
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },

      logout: async () => {
        await signOut({ redirect: false });
        set({
          user: null,
          isAuthenticated: false,
        });
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
        // Use absolute path to avoid locale prefix issues
        const baseUrl =
          typeof window !== "undefined" ? window.location.origin : "";
        const response = await fetch(`${baseUrl}/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch profile: ${response.status} ${errorText}`
          );
        }
        const data = await response.json();
        set({ user: data.user });
        return data.user;
      },

      fetchAchievements: async () => {
        set({ isLoading: true, error: null });
        try {
          // Get current locale from the URL or default to 'en'
          const currentLocale =
            typeof window !== "undefined"
              ? window.location.pathname.split("/")[1] || "en"
              : "en";

          const res = await fetch(`/api/achievements?locale=${currentLocale}`, {
            method: "GET",
            headers: {
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
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
