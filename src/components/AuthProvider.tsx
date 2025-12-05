"use client";
import { useEffect } from "react";
import { useUserStore } from "@/lib/user-store";
import { initialDataLoader } from "@/lib/initial-data-loader";
import { identifyUser, resetPosthog } from "@/lib/posthog";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { checkAuth, isAuthenticated, user } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      initialDataLoader.loadInitialData().catch((error) => {
        console.error("Failed to load initial data:", error);
      });
    } else {
      initialDataLoader.reset();
      resetPosthog();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      identifyUser(user.id, {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });
    }
  }, [isAuthenticated, user]);

  return <>{children}</>;
}
