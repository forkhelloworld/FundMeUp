import { prisma } from "@/lib/prisma";
import type { UserProgress } from "@prisma/client";

export type AchievementKey =
  | "first-step"
  | "knowledge-seeker"
  | "quick-learner"
  | "first-simulation"
  | "smart-investor"
  | "consistency-is-key";

export type EventType =
  | { type: "lesson_completed" }
  | { type: "simulation_completed"; returnPct?: number }
  | { type: "login"; now?: Date };

export async function ensureUserProgress(
  userId: number
): Promise<UserProgress> {
  return prisma.userProgress.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
}

export async function recordEventAndEvaluate(
  userId: number,
  event: EventType
): Promise<AchievementKey[]> {
  let progress = await ensureUserProgress(userId);
  const now = new Date();

  if (event.type === "lesson_completed") {
    progress = await prisma.userProgress.update({
      where: { userId },
      data: {
        lessonsCompletedCount: { increment: 1 },
        consecutiveLessonsInSession: { increment: 1 },
      },
    });
  }

  if (event.type === "simulation_completed") {
    const bestSimulationReturn = Math.max(
      progress.bestSimulationReturn,
      event.returnPct ?? 0
    );
    progress = await prisma.userProgress.update({
      where: { userId },
      data: {
        simulationsCompletedCount: { increment: 1 },
        bestSimulationReturn,
      },
    });
  }

  if (event.type === "login") {
    const last = progress.lastLoginAt ? new Date(progress.lastLoginAt) : null;
    const today = new Date(event.now ?? now);
    const sameDay = !!last && last.toDateString() === today.toDateString();
    const yesterday =
      !!last &&
      new Date(last.getTime() + 24 * 60 * 60 * 1000).toDateString() ===
        today.toDateString();

    progress = await prisma.userProgress.update({
      where: { userId },
      data: {
        lastLoginAt: today,
        loginStreak: sameDay
          ? progress.loginStreak
          : yesterday
          ? progress.loginStreak + 1
          : 1,
      },
    });
  }

  const newlyAwarded: AchievementKey[] = [];

  const checks: Array<{ key: AchievementKey; pass: boolean }> = [
    { key: "first-step", pass: progress.lessonsCompletedCount >= 1 },
    { key: "knowledge-seeker", pass: progress.lessonsCompletedCount >= 3 },
    { key: "quick-learner", pass: progress.consecutiveLessonsInSession >= 3 },
    { key: "first-simulation", pass: progress.simulationsCompletedCount >= 1 },
    { key: "smart-investor", pass: progress.bestSimulationReturn > 0 },
    { key: "consistency-is-key", pass: progress.loginStreak >= 5 },
  ];

  for (const c of checks) {
    if (!c.pass) continue;
    const exists = await prisma.userAchievement.findFirst({
      where: { userId, target: { key: c.key } },
      select: { id: true },
    });
    if (!exists) {
      const target = await prisma.achievement.findUnique({
        where: { key: c.key },
      });
      if (target) {
        await prisma.userAchievement.create({
          data: { userId, achievementId: target.id },
        });
        newlyAwarded.push(c.key);
      }
    }
  }

  if (
    event.type !== "lesson_completed" &&
    progress.consecutiveLessonsInSession !== 0
  ) {
    await prisma.userProgress.update({
      where: { userId },
      data: { consecutiveLessonsInSession: 0 },
    });
  }

  return newlyAwarded;
}
