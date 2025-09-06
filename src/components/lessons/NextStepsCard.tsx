import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NextStepsCardProps {
  title?: string;
  description: string;
  progressValue: number;
  lessonLabel: string;
  completeMessage?: string;
  animationVariant?: React.ComponentProps<typeof motion.div>;
  onViewportEnter?: () => void;
}

export function NextStepsCard({
  title = "🚀 What's Next?",
  description,
  progressValue,
  lessonLabel,
  completeMessage,
  animationVariant,
  onViewportEnter,
}: NextStepsCardProps) {
  return (
    <motion.div
      {...animationVariant}
      className="w-full max-w-5xl text-center"
      onViewportEnter={onViewportEnter}
    >
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-xl font-semibold text-green-400 mb-4">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>

        <Progress value={progressValue} className="mb-4" />
        <p className="text-sm text-gray-400 mb-6">{lessonLabel}</p>

        {completeMessage && (
          <motion.p className="text-green-400 text-sm mt-4">
            {completeMessage}
          </motion.p>
        )}
      </Card>
    </motion.div>
  );
}
