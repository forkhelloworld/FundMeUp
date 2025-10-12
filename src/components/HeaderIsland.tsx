"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Trophy,
  BookOpen,
  BarChart2,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/lib/user-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export function HeaderIsland() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, achievements, logout } = useUserStore();
  const t = useTranslations("common");
  const tHeader = useTranslations("headerIsland");

  const navItems = [
    { href: "/lessons", icon: BookOpen, label: t("lessons") },
    { href: "/simulations", icon: BarChart2, label: t("simulations") },
    { href: "/achievements", icon: Trophy, label: t("achievements") },
  ];

  const handleClickOutside = (event: MouseEvent) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayName = useMemo(() => {
    if (!user) return tHeader("guest");
    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    return name || user.email;
  }, [user, tHeader]);

  const initials = useMemo(() => {
    if (!user) return "";
    const parts = [user.firstName, user.lastName].filter(Boolean) as string[];
    if (parts.length === 0 && user.email)
      return user.email[0]?.toUpperCase() ?? "";
    return parts
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2);
  }, [user]);

  // Simple progress proxy: proportion of achievements earned out of 3 visible items
  const progress = useMemo(() => {
    const earned = achievements?.length ?? 0;
    const total = 3; // heuristic for compact header; avoid 0 division
    return Math.min(100, Math.round((earned / total) * 100));
  }, [achievements]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (e) {
      console.log(e);
      toast.error("Logout failed");
    }
  };

  return (
    <div
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-50 p-3 sm:p-0 sm:top-4 sm:bottom-auto sm:left-auto sm:right-4 sm:w-80 xl:w-80"
    >
      <div className="mx-auto">
        <div className="bg-slate-900/90 border border-emerald-400/20 backdrop-blur-md shadow-lg rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
            {initials ? (
              <span className="text-emerald-300 text-sm font-semibold">
                {initials}
              </span>
            ) : (
              <UserIcon size={18} className="text-emerald-300" />
            )}
          </div>

          {/* Name and progress */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate text-white/90">
              {displayName}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Trophy size={14} className="text-emerald-400 shrink-0" />
              <div className="w-full">
                <Progress value={progress} className="h-1.5 bg-slate-800" />
              </div>
              <span className="text-[10px] text-white/60 w-8 text-right">
                {progress}%
              </span>
            </div>
          </div>

          {/* Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-label={tHeader("openMenu")}
            className="rounded-xl hover:bg-emerald-400/10"
          >
            {open ? (
              <X size={18} className="text-emerald-300" />
            ) : (
              <Menu size={18} className="text-emerald-300" />
            )}
          </Button>
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 6, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="origin-top bg-slate-900/95 border border-emerald-400/20 backdrop-blur-md shadow-xl rounded-xl sm:rounded-2xl mt-2 overflow-hidden"
            >
              <nav className="py-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                        active
                          ? "text-emerald-300 bg-emerald-400/10"
                          : "text-white/90 hover:text-emerald-300 hover:bg-emerald-400/10"
                      }`}
                    >
                      <Icon
                        size={16}
                        className={
                          active ? "text-emerald-300" : "text-emerald-400"
                        }
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <div className="h-px bg-emerald-400/20 my-1" />
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-300 hover:bg-red-400/10 transition-colors"
                >
                  <LogOut size={16} />
                  <span>{tHeader("logout")}</span>
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HeaderIsland;
