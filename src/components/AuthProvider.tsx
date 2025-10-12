"use client";
import { useEffect } from "react";
import { useUserStore } from "@/lib/user-store";
import { initialDataLoader } from "@/lib/initial-data-loader";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { checkAuth, isAuthenticated } = useUserStore();

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
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
