"use client";
import { RegistrationForm } from "@/components/RegistrationForm";
import Link from "next/link";
import { useUserStore } from "@/lib/user-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
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
        Create Account
      </h1>
      <RegistrationForm />
      <p className="mt-6 text-slate-400 text-sm font-sans">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-emerald-400 underline hover:text-emerald-300 font-mono transition-colors"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
