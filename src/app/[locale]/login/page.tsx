"use client";
import { LoginForm } from "@/components/LoginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      const locale = window.location.pathname.split("/")[1] || "en";
      router.push(`/${locale}/lessons`);
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4">
        <div className="text-emerald-400 font-mono">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4">
      <h1 className="text-3xl font-bold text-emerald-400 font-mono mb-8">
        Sign In
      </h1>
      <LoginForm />
    </div>
  );
}
