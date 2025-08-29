import { prisma } from "@/lib/prisma";
import achievements from "@/constants/achievements";

export async function syncAchievements(): Promise<void> {
  for (const a of achievements) {
    const key = a.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    await prisma.achievement.upsert({
      where: { key },
      update: {
        title: a.title,
        description: a.description,
      },
      create: {
        key,
        title: a.title,
        description: a.description,
      },
    });
  }
}
