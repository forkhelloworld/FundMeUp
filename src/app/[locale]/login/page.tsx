"use client";
import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";
import { useUserStore } from "@/lib/user-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/lessons");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4">
      <h1 className="text-3xl font-bold text-emerald-400 font-mono mb-8">
        Sign In
      </h1>
      <LoginForm />
      <p className="mt-6 text-slate-400 text-sm font-sans">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-emerald-400 underline hover:text-emerald-300 font-mono transition-colors"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}
