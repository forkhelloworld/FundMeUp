"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUserStore } from "@/lib/user-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export const Navigation = () => {
  const { isAuthenticated, logout } = useUserStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              FundMeUp
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a
              href="#features"
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Pricing
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/lessons">
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-emerald-400 hover:bg-slate-800 text-sm sm:text-base"
                  >
                    Lessons
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all duration-200"
                  title="Logout"
                >
                  <LogOut size={18} />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-emerald-400 hover:bg-slate-800 text-sm sm:text-base"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-sm sm:text-base">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
