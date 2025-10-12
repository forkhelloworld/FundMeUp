"use client";
import HeaderIsland from "@/components/HeaderIsland";
import { Sidebar } from "@/components/Sidebar";
import { useSidebarStore } from "@/lib/sidebar-store";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { expanded } = useSidebarStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <HeaderIsland />
      <Sidebar />
      <div
        className={`transition-all duration-300 pb-20 lg:pb-0 ${
          expanded ? "lg:ml-56" : "lg:ml-20"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
