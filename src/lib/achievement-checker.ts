import { useUserStore } from "./user-store";
import { useUserProfileStore } from "./userProfile-store";
import { toast } from "sonner";

export interface AchievementCheckResult {
  shouldCheck: boolean;
  achievementKey: string;
  title: string;
  description: string;
}

export class AchievementChecker {
  private static getUnlockedAchievements(): Set<string> {
    const { achievements } = useUserStore.getState();
    return new Set(achievements.filter((a) => a.unlocked).map((a) => a.key));
  }

  private static async triggerAchievementEvaluation(
    achievementKey: string
  ): Promise<boolean> {
    const { isAuthenticated } = useUserStore.getState();

    if (!isAuthenticated) return false;

    try {
      // Award the specific achievement directly
      const response = await fetch("/api/user/achievements/award", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ achievementKey }),
      });

      if (response.ok) {
        const data = await response.json();
        const wasAwarded = data?.awarded ?? false;

        if (wasAwarded) {
          // Refresh achievements in store
          await useUserStore.getState().fetchAchievements();
        }

        return wasAwarded;
      }
    } catch (error) {
      console.error("Failed to check achievement:", error);
    }

    return false;
  }

  private static showAchievementNotification(
    title: string,
    description: string
  ) {
    toast.success(`Achievement unlocked: ${title}`, {
      description,
      duration: 5000,
    });
  }

  // Check if user qualifies for lesson-based achievements
  private static checkLessonAchievements(): AchievementCheckResult[] {
    const unlockedKeys = this.getUnlockedAchievements();
    const results: AchievementCheckResult[] = [];

    // These will be checked against actual lesson data on the backend
    const lessonAchievements = [
      {
        key: "first-step",
        title: "First Step",
        description: "Completed your first lesson",
      },
      {
        key: "knowledge-seeker",
        title: "Knowledge Seeker",
        description: "Completed 3 lessons",
      },
      {
        key: "quick-learner",
        title: "Quick Learner",
        description: "Completed 3 lessons in one day",
      },
    ];

    for (const achievement of lessonAchievements) {
      if (!unlockedKeys.has(achievement.key)) {
        results.push({
          shouldCheck: true,
          achievementKey: achievement.key,
          title: achievement.title,
          description: achievement.description,
        });
      }
    }

    return results;
  }

  // Check if user qualifies for simulation-based achievements
  private static checkSimulationAchievements(): AchievementCheckResult[] {
    const unlockedKeys = this.getUnlockedAchievements();
    const { monthlyIncome, monthlyExpenses } = useUserProfileStore.getState();
    const results: AchievementCheckResult[] = [];

    // First Simulation - check if user has any profile data
    if (!unlockedKeys.has("first-simulation")) {
      const hasProfileData = monthlyIncome > 0 || monthlyExpenses > 0;
      if (hasProfileData) {
        results.push({
          shouldCheck: true,
          achievementKey: "first-simulation",
          title: "First Simulation",
          description: "Finished your first investment simulation",
        });
      }
    }

    // Smart Investor - check if user has positive cash flow
    if (!unlockedKeys.has("smart-investor")) {
      const hasPositiveCashFlow =
        monthlyIncome > 0 &&
        monthlyExpenses > 0 &&
        monthlyIncome > monthlyExpenses;
      if (hasPositiveCashFlow) {
        results.push({
          shouldCheck: true,
          achievementKey: "smart-investor",
          title: "Smart Investor",
          description: "Achieved positive returns in a simulation",
        });
      }
    }

    return results;
  }

  // Check if user qualifies for time-based achievements
  private static checkTimeBasedAchievements(): AchievementCheckResult[] {
    const unlockedKeys = this.getUnlockedAchievements();
    const { user } = useUserStore.getState();
    const results: AchievementCheckResult[] = [];

    // Consistency is Key - check if 5+ days since registration
    if (!unlockedKeys.has("consistency-is-key") && user) {
      // We'll let the backend calculate this precisely
      results.push({
        shouldCheck: true,
        achievementKey: "consistency-is-key",
        title: "Consistency is Key",
        description: "Learning for 5+ days since registration",
      });
    }

    return results;
  }

  // Main method to check all achievements efficiently
  static async checkAllAchievements(): Promise<void> {
    const allChecks = [
      ...this.checkLessonAchievements(),
      ...this.checkSimulationAchievements(),
      ...this.checkTimeBasedAchievements(),
    ];

    // Only make API call if there are potential achievements to unlock
    if (allChecks.length === 0) {
      return;
    }

    // Check each potential achievement individually
    for (const check of allChecks) {
      if (check.shouldCheck) {
        const wasAwarded = await this.triggerAchievementEvaluation(
          check.achievementKey
        );
        if (wasAwarded) {
          this.showAchievementNotification(check.title, check.description);
        }
      }
    }
  }

  // Check for a specific lesson achievement and award it if eligible
  static async checkAndAwardLessonAchievement(): Promise<string | null> {
    const { isAuthenticated } = useUserStore.getState();

    if (!isAuthenticated) return null;

    // Get current achievements to see what's already unlocked
    const unlockedKeys = this.getUnlockedAchievements();

    // Check lesson-based achievements in priority order
    const lessonAchievements = [
      {
        key: "first-step",
        title: "First Step",
        description: "Completed your first lesson",
        check: async () => {
          // Check if user has completed any lessons
          const response = await fetch("/api/user/lessons", {
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            return data.completedLessons?.length >= 1;
          }
          return false;
        },
      },
      {
        key: "knowledge-seeker",
        title: "Knowledge Seeker",
        description: "Completed 3 lessons",
        check: async () => {
          const response = await fetch("/api/user/lessons", {
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            return data.completedLessons?.length >= 3;
          }
          return false;
        },
      },
      {
        key: "quick-learner",
        title: "Quick Learner",
        description: "Completed 3 lessons in one day",
        check: async () => {
          const response = await fetch("/api/user/lessons", {
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            const completedLessons = data.completedLessons || [];
            if (completedLessons.length < 3) return false;

            // Check if 3+ lessons completed on same day
            const lessonsByDay = new Map<string, number>();
            completedLessons.forEach((lesson: { completedAt: Date | null }) => {
              if (lesson.completedAt) {
                const dayKey = new Date(lesson.completedAt)
                  .toISOString()
                  .split("T")[0];
                lessonsByDay.set(dayKey, (lessonsByDay.get(dayKey) || 0) + 1);
              }
            });
            return Array.from(lessonsByDay.values()).some(
              (count) => count >= 3
            );
          }
          return false;
        },
      },
    ];

    // Check achievements in order, return the first one that should be awarded
    for (const achievement of lessonAchievements) {
      if (!unlockedKeys.has(achievement.key)) {
        const shouldAward = await achievement.check();
        if (shouldAward) {
          // Award this achievement
          const response = await fetch("/api/user/achievements/award", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ achievementKey: achievement.key }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.awarded) {
              // Refresh achievements in store
              await useUserStore.getState().fetchAchievements();

              // Show notification
              this.showAchievementNotification(
                achievement.title,
                achievement.description
              );

              return achievement.key;
            }
          }
          break; // Only award one achievement per call
        }
      }
    }

    return null;
  }

  // Check for a specific simulation achievement and award it if eligible
  static async checkAndAwardSimulationAchievement(): Promise<string | null> {
    const { isAuthenticated } = useUserStore.getState();

    if (!isAuthenticated) return null;

    // Get current achievements to see what's already unlocked
    const unlockedKeys = this.getUnlockedAchievements();

    // Get user profile data from store
    const { monthlyIncome, monthlyExpenses } = useUserProfileStore.getState();

    // Check simulation-based achievements in priority order
    const simulationAchievements = [
      {
        key: "first-simulation",
        title: "First Simulation",
        description: "Finished your first investment simulation",
        check: () => {
          // Check if user has any profile data
          return monthlyIncome > 0 || monthlyExpenses > 0;
        },
      },
      {
        key: "smart-investor",
        title: "Smart Investor",
        description: "Achieved positive returns in a simulation",
        check: () => {
          // Check if user has positive cash flow
          return (
            monthlyIncome > 0 &&
            monthlyExpenses > 0 &&
            monthlyIncome > monthlyExpenses
          );
        },
      },
    ];

    // Check achievements in order, return the first one that should be awarded
    for (const achievement of simulationAchievements) {
      if (!unlockedKeys.has(achievement.key)) {
        const shouldAward = achievement.check();
        if (shouldAward) {
          // Award this achievement
          const response = await fetch("/api/user/achievements/award", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ achievementKey: achievement.key }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.awarded) {
              // Refresh achievements in store
              await useUserStore.getState().fetchAchievements();

              // Show notification
              this.showAchievementNotification(
                achievement.title,
                achievement.description
              );

              return achievement.key;
            }
          }
          break; // Only award one achievement per call
        }
      }
    }

    return null;
  }

  // Check for time-based achievement and award it if eligible
  static async checkAndAwardTimeBasedAchievement(): Promise<string | null> {
    const { isAuthenticated, user } = useUserStore.getState();

    if (!isAuthenticated || !user) return null;

    // Get current achievements to see what's already unlocked
    const unlockedKeys = this.getUnlockedAchievements();

    // Check if consistency achievement is already unlocked
    if (unlockedKeys.has("consistency-is-key")) {
      return null;
    }

    // Get user data to check registration date
    try {
      const response = await fetch("/api/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const userCreatedAt = new Date(data.user.createdAt);
        const now = new Date();
        const daysSinceRegistration =
          (now.getTime() - userCreatedAt.getTime()) / (1000 * 60 * 60 * 24);

        if (daysSinceRegistration >= 5) {
          // Award consistency achievement
          const awardResponse = await fetch("/api/user/achievements/award", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ achievementKey: "consistency-is-key" }),
          });

          if (awardResponse.ok) {
            const awardData = await awardResponse.json();
            if (awardData.awarded) {
              // Refresh achievements in store
              await useUserStore.getState().fetchAchievements();

              // Show notification
              this.showAchievementNotification(
                "Consistency is Key",
                "Learning for 5+ days since registration"
              );

              return "consistency-is-key";
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to check time-based achievement:", error);
    }

    return null;
  }

  static async checkSimulationAchievementsPublic(): Promise<void> {
    const checks = this.checkSimulationAchievements();

    for (const check of checks) {
      if (check.shouldCheck) {
        const wasAwarded = await this.triggerAchievementEvaluation(
          check.achievementKey
        );
        if (wasAwarded) {
          this.showAchievementNotification(check.title, check.description);
        }
      }
    }
  }

  static async checkTimeBasedAchievementsPublic(): Promise<void> {
    const checks = this.checkTimeBasedAchievements();

    for (const check of checks) {
      if (check.shouldCheck) {
        const wasAwarded = await this.triggerAchievementEvaluation(
          check.achievementKey
        );
        if (wasAwarded) {
          this.showAchievementNotification(check.title, check.description);
        }
      }
    }
  }

  // Utility method to check if a specific achievement is unlocked
  static isAchievementUnlocked(achievementKey: string): boolean {
    const unlockedKeys = this.getUnlockedAchievements();
    return unlockedKeys.has(achievementKey);
  }

  // Get achievement progress (for UI display)
  static getAchievementProgress(): {
    total: number;
    unlocked: number;
    percentage: number;
  } {
    const { achievements } = useUserStore.getState();
    const unlocked = achievements.filter((a) => a.unlocked).length;
    const total = achievements.length;

    return {
      total,
      unlocked,
      percentage: total > 0 ? Math.round((unlocked / total) * 100) : 0,
    };
  }
}

// Convenience hooks for React components
export function useAchievementChecker() {
  return {
    checkAllAchievements:
      AchievementChecker.checkAllAchievements.bind(AchievementChecker),
    checkAndAwardLessonAchievement:
      AchievementChecker.checkAndAwardLessonAchievement.bind(
        AchievementChecker
      ),
    checkAndAwardSimulationAchievement:
      AchievementChecker.checkAndAwardSimulationAchievement.bind(
        AchievementChecker
      ),
    checkAndAwardTimeBasedAchievement:
      AchievementChecker.checkAndAwardTimeBasedAchievement.bind(
        AchievementChecker
      ),
    isAchievementUnlocked:
      AchievementChecker.isAchievementUnlocked.bind(AchievementChecker),
    getAchievementProgress:
      AchievementChecker.getAchievementProgress.bind(AchievementChecker),
  };
}
