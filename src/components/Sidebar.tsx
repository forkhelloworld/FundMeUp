"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  BarChart2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Settings,
  Bot,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { useSidebarStore } from "@/lib/sidebar-store";
import { useUserStore } from "@/lib/user-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function Sidebar() {
  const t = useTranslations("dashboard.sidebar");
  const tCommon = useTranslations("common");
  const tMessages = useTranslations("auth.messages");
  const { expanded, toggle } = useSidebarStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useUserStore();
  const router = useRouter();

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: t("dashboard") },
    { href: "/lessons", icon: BookOpen, label: t("lessons") },
    { href: "/simulations", icon: BarChart2, label: t("simulations") },
    { href: "/achievements", icon: Trophy, label: t("achievements") },
    { href: "/ai-buddy", icon: Bot, label: t("aiBuddy") },
    { href: "/settings", icon: Settings, label: t("settings") },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(tMessages("logoutSuccess"));
      router.push("/login");
    } catch (error) {
      toast.error(tMessages("logoutError"));
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 left-0 h-full bg-slate-800/90 border-r border-emerald-400/20 flex flex-col items-center py-6 px-2 shadow-xl backdrop-blur-md transition-all duration-300 z-40 ${
          expanded ? "w-56" : "w-20"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="mb-8 w-12 h-12 flex items-center justify-center rounded-xl hover:bg-emerald-400/10 transition-all duration-200 hover:scale-105"
          onClick={toggle}
          aria-label={expanded ? tCommon("minimize") : tCommon("expand")}
        >
          {expanded ? (
            <ChevronLeft size={22} className="text-emerald-400" />
          ) : (
            <ChevronRight size={22} className="text-emerald-400" />
          )}
        </button>

        <div className="flex flex-col gap-2 flex-1 w-full items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center w-full h-12 rounded-xl transition-all duration-200 relative px-2 ${
                  expanded ? "justify-start" : "justify-center"
                } ${
                  isActive
                    ? "bg-emerald-400/20 border border-emerald-400/40 shadow-lg"
                    : "hover:bg-emerald-400/10 hover:border hover:border-emerald-400/20"
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-400 rounded-r-full"></div>
                )}

                <span className="flex justify-center items-center w-12 h-12">
                  <Icon
                    size={22}
                    className={`transition-colors duration-200 ${
                      isActive
                        ? "text-emerald-400"
                        : "text-white group-hover:text-emerald-400"
                    }`}
                  />
                </span>

                {/* Only render label if expanded */}
                {expanded && (
                  <span
                    className={`ml-4 font-mono text-base transition-colors duration-200 ${
                      isActive
                        ? "text-emerald-400 font-semibold"
                        : "text-white group-hover:text-emerald-400"
                    }`}
                  >
                    {item.label}
                  </span>
                )}

                {/* Enhanced tooltip for minimized state */}
                {!expanded && (
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-800/95 text-xs text-emerald-400 px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-10 backdrop-blur-md border border-emerald-400/20">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800/95 border-l border-b border-emerald-400/20 transform rotate-45"></div>
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col items-center w-full">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-12 h-12 p-0 flex items-center justify-center text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-xl transition-all duration-200 hover:scale-105"
            title="Logout"
          >
            <LogOut size={22} />
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-800/95 border-t border-emerald-400/20 backdrop-blur-md">
        <div className="flex justify-around items-center py-2 px-4">
          {navItems.slice(0, 6).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px] justify-center ${
                  isActive
                    ? "bg-emerald-400/20 text-emerald-400"
                    : "text-white hover:text-emerald-400 hover:bg-emerald-400/10"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs font-mono mt-1">{item.label}</span>
              </Link>
            );
          })}
          {/* Logout button in mobile bottom navigation */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center p-2 rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px] justify-center text-red-400 hover:text-red-300 hover:bg-red-400/10"
            title="Logout"
          >
            <LogOut size={20} />
            <span className="text-xs font-mono mt-1">{tCommon("logout")}</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full bg-slate-800/95 border-r border-emerald-400/20 flex flex-col items-center py-6 px-2 shadow-xl backdrop-blur-md transition-all duration-300 z-50 ${
          mobileOpen ? "w-56 translate-x-0" : "w-56 -translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-2 flex-1 w-full items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center w-full h-12 rounded-xl transition-all duration-200 relative px-2 justify-start ${
                  isActive
                    ? "bg-emerald-400/20 border border-emerald-400/40 shadow-lg"
                    : "hover:bg-emerald-400/10 hover:border hover:border-emerald-400/20"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-400 rounded-r-full"></div>
                )}

                <span className="flex justify-center items-center w-12 h-12">
                  <Icon
                    size={22}
                    className={`transition-colors duration-200 ${
                      isActive
                        ? "text-emerald-400"
                        : "text-white group-hover:text-emerald-400"
                    }`}
                  />
                </span>

                <span
                  className={`ml-4 font-mono text-base transition-colors duration-200 ${
                    isActive
                      ? "text-emerald-400 font-semibold"
                      : "text-white group-hover:text-emerald-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col items-center w-full">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-12 h-12 p-0 flex items-center justify-center text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-xl transition-all duration-200"
            title="Logout"
          >
            <LogOut size={22} />
          </Button>
        </div>
      </aside>
    </>
  );
}
