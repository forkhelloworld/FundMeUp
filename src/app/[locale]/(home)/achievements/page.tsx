"use client";
import { AchievementsGrid } from "@/components/achievements/AchievementsGrid";
import { useUserStore } from "@/lib/user-store";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function AchievementsPage() {
  const { achievements, fetchAchievements, isAuthenticated } = useUserStore();
  const t = useTranslations("achievements");

  useEffect(() => {
    if (isAuthenticated) {
      fetchAchievements();
    }
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background to-background/60" />
      <div className="container mx-auto px-4 py-6 md:py-10 relative">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            {t("description")}
          </p>
        </div>
        {achievements.length === 0 ? (
          <p className="text-muted-foreground">{t("noAchievementsFound")}</p>
        ) : (
          <AchievementsGrid achievements={achievements} />
        )}
      </div>
    </div>
  );
}
