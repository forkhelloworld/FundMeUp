import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
  selectedAnswer?: string;
  onAnswerSelect: (answerId: string) => void;
  onCheckAnswer?: () => void;
  showResult?: boolean;
  correctAnswer?: string;
  explanation?: string;
  animationVariant?: React.ComponentProps<typeof motion.div>;
}

export function Quiz({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  onCheckAnswer,
  showResult,
  correctAnswer,
  explanation,
  animationVariant,
}: QuizProps) {
  return (
    <motion.div {...animationVariant} className="space-y-6">
      <h4 className="text-white font-semibold mb-3">{question}</h4>

      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswerSelect(option.id)}
            className={`w-full p-3 text-left rounded-lg border transition-colors ${
              selectedAnswer === option.id
                ? "border-green-500 bg-green-900/30"
                : "border-slate-700 bg-slate-800 hover:bg-slate-700"
            }`}
          >
            <span className="text-green-400 font-semibold mr-3">
              {option.id.toUpperCase()})
            </span>
            <span className="text-gray-300">{option.text}</span>
          </button>
        ))}
      </div>

      {selectedAnswer && onCheckAnswer && (
        <Button
          onClick={onCheckAnswer}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Check Answer
        </Button>
      )}

      {showResult && correctAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-4 p-4 bg-green-900/30 rounded-lg border border-green-700"
        >
          <p className="text-green-200 text-center mb-2">
            <strong>Correct Answer: {correctAnswer}</strong>
          </p>
          {explanation && (
            <p className="text-green-300 text-sm text-center">{explanation}</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
