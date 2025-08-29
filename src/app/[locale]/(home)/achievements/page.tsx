import {
  AchievementsGrid,
  type ApiAchievement,
} from "@/components/achievements/AchievementsGrid";
import { cookies } from "next/headers";

async function getAchievements(): Promise<ApiAchievement[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    const headers: HeadersInit = {};
    if (token) headers["authorization"] = `Bearer ${token}`;

    const res = await fetch(`http://localhost:3000/api/achievements`, {
      cache: "no-store",
      headers,
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { achievements: ApiAchievement[] };
    return json.achievements ?? [];
  } catch {
    return [];
  }
}

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background to-background/60" />
      <div className="container mx-auto px-4 py-6 md:py-10 relative">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Achievements
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            All available milestones you can unlock.
          </p>
        </div>
        {achievements.length === 0 ? (
          <p className="text-muted-foreground">No achievements found.</p>
        ) : (
          <AchievementsGrid achievements={achievements} />
        )}
      </div>
    </div>
  );
}
