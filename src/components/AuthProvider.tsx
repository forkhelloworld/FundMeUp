"use client";
import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useUserStore } from "@/lib/user-store";
import { initialDataLoader } from "@/lib/initial-data-loader";

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthSync({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { setSession, isAuthenticated, getProfile } = useUserStore();

  useEffect(() => {
    if (status === "authenticated" && session) {
      setSession(session);
      // Fetch full user profile to get firstName/lastName
      // Add a small delay to ensure session is fully established
      setTimeout(() => {
        getProfile().catch((error) => {
          console.error("Failed to fetch user profile:", error);
          // Don't show error to user if it's just a temporary issue
        });
      }, 100);
    } else if (status === "unauthenticated") {
      setSession(null);
    }
  }, [session, status, setSession, getProfile]);

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

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <AuthSync>{children}</AuthSync>
    </SessionProvider>
  );
}
