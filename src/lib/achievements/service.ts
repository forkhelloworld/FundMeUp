import { prisma } from "@/lib/prisma";
import type { LessonStatus } from "@prisma/client";

export type AchievementKey =
  | "first-step"
  | "knowledge-seeker"
  | "quick-learner"
  | "first-simulation"
  | "smart-investor"
  | "consistency-is-key";

export type EventType =
  | { type: "lesson_completed"; slug?: string }
  | { type: "simulation_completed"; returnPct?: number }
  | { type: "login"; now?: Date };

export async function recordEventAndEvaluate(
  userId: string,
  event: EventType
): Promise<AchievementKey[]> {
  const now = new Date();

  if (event.type === "lesson_completed") {
    if (event.slug) {
      // Ensure Lesson exists (optional: create if missing)
      const lesson = await prisma.lesson.findUnique({
        where: { slug: event.slug },
        select: { slug: true },
      });
      if (!lesson) {
        await prisma.lesson.create({
          data: { slug: event.slug, title: event.slug },
        });
      }
      // Upsert UserLesson and mark as completed
      await prisma.userLesson.upsert({
        where: { userId_lessonSlug: { userId, lessonSlug: event.slug } },
        create: {
          userId,
          lessonSlug: event.slug,
          status: "COMPLETED" as LessonStatus,
          startedAt: now,
          completedAt: now,
        },
        update: { status: "COMPLETED" as LessonStatus, completedAt: now },
      });
    }
  }

  const newlyAwarded: AchievementKey[] = [];

  // Compute achievements based on current data without UserProgress
  const completedLessonsCount = await prisma.userLesson.count({
    where: { userId, status: "COMPLETED" },
  });

  const checks: Array<{ key: AchievementKey; pass: boolean }> = [
    { key: "first-step", pass: completedLessonsCount >= 1 },
    { key: "knowledge-seeker", pass: completedLessonsCount >= 3 },
    // Removed checks that depended on UserProgress (quick-learner, first-simulation, smart-investor, consistency-is-key)
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

  return newlyAwarded;
}
