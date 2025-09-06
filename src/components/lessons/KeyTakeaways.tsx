import { motion } from "framer-motion";

interface KeyTakeawaysProps {
  items: string[];
  animationVariant?: React.ComponentProps<typeof motion.div>;
  onViewportEnter?: () => void;
}

export function KeyTakeaways({
  items,
  animationVariant,
  onViewportEnter,
}: KeyTakeawaysProps) {
  return (
    <motion.div
      {...animationVariant}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      onViewportEnter={onViewportEnter}
    >
      {items.map((takeaway, index) => (
        <motion.div
          key={index}
          {...animationVariant}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3"
        >
          <span className="text-green-400 text-lg">✓</span>
          <p className="text-gray-300 text-sm">{takeaway}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
