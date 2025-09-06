"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LessonHeroProps {
  title: ReactNode;
  subtitle?: string;
  description?: string;
  animationVariant?: React.ComponentProps<typeof motion.div>;
  onViewportEnter?: () => void;
}

export function LessonHero({
  title,
  subtitle,
  description,
  animationVariant,
  onViewportEnter,
}: LessonHeroProps) {
  return (
    <motion.div
      {...animationVariant}
      className="text-center max-w-5xl mb-12"
      onViewportEnter={onViewportEnter}
    >
      <h1 className="text-5xl font-bold mb-6">{title}</h1>
      {subtitle && (
        <p className="text-gray-300 text-xl leading-relaxed">{subtitle}</p>
      )}
      {description && (
        <p className="text-gray-400 text-lg mt-4">{description}</p>
      )}
    </motion.div>
  );
}
