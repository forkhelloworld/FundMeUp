import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface LessonSectionProps {
  title: string;
  icon?: string;
  children: ReactNode;
  animationVariant?: React.ComponentProps<typeof motion.div>;
  className?: string;
  onViewportEnter?: () => void;
}

export function LessonSection({
  title,
  icon,
  children,
  animationVariant,
  className = "",
  onViewportEnter,
}: LessonSectionProps) {
  return (
    <motion.div
      {...animationVariant}
      className={`max-w-5xl mb-12 w-full ${className}`}
      onViewportEnter={onViewportEnter}
    >
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            {icon && <span>{icon}</span>}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">{children}</CardContent>
      </Card>
    </motion.div>
  );
}
