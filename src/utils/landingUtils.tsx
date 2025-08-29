import {
  FaChartPie,
  FaUserCheck,
  FaTrophy,
  FaCoins,
  FaUserFriends,
  FaRocket,
} from "react-icons/fa";
import type { Feature, HowItWorksStep } from "@/types/landing";
import { FEATURES, HOW_IT_WORKS_STEPS } from "@/constants/landing";

/**
 * Maps feature data to include React icons
 * @returns Array of features with icons
 */
export const getFeaturesWithIcons = (): Feature[] => {
  const iconMap = {
    "intro-lessons": (
      <FaChartPie className="text-emerald-400 text-3xl" />
    ),
    "progress-tracking": <FaCoins className="text-cyan-400 text-3xl" />,
    "goal-setting": <FaUserFriends className="text-purple-400 text-3xl" />,
    "ai-assistant": <FaTrophy className="text-yellow-400 text-3xl" />,
  };

  return FEATURES.map((feature) => ({
    ...feature,
    icon: iconMap[feature.id as keyof typeof iconMap],
  }));
};

/**
 * Maps how it works steps to include React icons
 * @returns Array of steps with icons
 */
export const getHowItWorksStepsWithIcons = (): HowItWorksStep[] => {
  const iconMap = {
    simulate: <FaUserCheck className="text-emerald-400 text-4xl" />,
    learn: <FaRocket className="text-cyan-400 text-4xl" />,
    progress: <FaTrophy className="text-purple-400 text-4xl" />,
  };

  return HOW_IT_WORKS_STEPS.map((step) => ({
    ...step,
    icon: iconMap[step.id as keyof typeof iconMap],
  }));
};

/**
 * Calculates the current year for copyright
 * @returns Current year as string
 */
export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};
