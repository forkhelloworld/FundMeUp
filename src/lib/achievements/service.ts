import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@/lib/api-error";
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

// Simple data entry function - no achievement evaluation
export async function recordLessonCompletion(
  userId: string,
  lessonSlug: string
): Promise<void> {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new NotFoundError(`User not found`);
  }

  const now = new Date();

  // Upsert UserLesson and mark as completed
  await prisma.userLesson.upsert({
    where: { userId_lessonSlug: { userId, lessonSlug } },
    create: {
      userId,
      lessonSlug,
      status: "COMPLETED" as LessonStatus,
      startedAt: now,
      completedAt: now,
    },
    update: { status: "COMPLETED" as LessonStatus, completedAt: now },
  });
}

// Award a specific achievement
export async function awardAchievement(
  userId: string,
  achievementKey: AchievementKey
): Promise<boolean> {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw new NotFoundError(`User not found`);
  }

  // Find the achievement first
  const target = await prisma.achievement.findUnique({
    where: { key: achievementKey },
  });

  if (!target) {
    throw new NotFoundError(`Achievement not found`);
  }

  // Check if achievement already exists using achievementId
  const exists = await prisma.userAchievement.findUnique({
    where: {
      userId_achievementId: {
        userId,
        achievementId: target.id,
      },
    },
    select: { id: true },
  });

  if (exists) {
    return false; // Already awarded
  }

  try {
    // Award the achievement
    await prisma.userAchievement.create({
      data: {
        userId,
        achievementId: target.id,
      },
    });

    return true; // Successfully awarded
  } catch (error) {
    // Handle potential race condition where achievement was awarded between check and create
    console.error("Failed to award achievement:", error);
    return false;
  }
}
