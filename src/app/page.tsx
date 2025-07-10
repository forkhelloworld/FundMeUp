"use client";

import { useEffect } from "react";
import { AuthForm } from "@/components/AuthForm";
import { Toaster } from "@/components/ui/sonner";
import { useUserStore } from "@/lib/user-store";

export default function Home() {
  const { isAuthenticated, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                FundMeUp
              </h1>
              <p className="text-muted-foreground text-lg">
                Master your finances with interactive learning
              </p>
            </div>
            
            <AuthForm />
          </>
        ) : (
          <p>User Dashboard</p>
        )}
      </main>
      <Toaster />
    </div>
  );
}
