"use client";
import { FICalculator } from "@/components/lessons/FICalculator";
import { LessonHero } from "@/components/lessons/LessonHero";
import { LessonSection } from "@/components/lessons/LessonSection";
import { KeyTakeaways } from "@/components/lessons/KeyTakeaways";
import { Quiz } from "@/components/lessons/Quiz";
import { NextStepsCard } from "@/components/lessons/NextStepsCard";
import {
  bounceIn,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  scaleIn,
  slideInFromBottom,
} from "@/constants/animations";
import { useLessonState } from "@/hooks/useLessonState";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function SetFinancialPlanPage() {
  const t = useTranslations("lessons.setFinancialGoal");
  const { state, actions } = useLessonState();

  // Progress tracking
  const handleProgress = (section: number) => {
    actions.updateProgress(section, 11);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center px-6 py-12">
      {/* Hero Section */}
      <LessonHero
        animationVariant={bounceIn}
        onViewportEnter={() => handleProgress(1)}
        title={<>{t("title")}</>}
        subtitle={t("subtitle")}
        description={t("description")}
      />

      {/* Ukraine Context Section - Only shows for Ukrainian locale */}
      <LessonSection
        title={t("sections.ukraineContext.title")}
        animationVariant={fadeInRight}
        onViewportEnter={() => handleProgress(2)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          {t("sections.ukraineContext.content")}
        </p>

        <div className="space-y-6">
          {t
            .raw("sections.ukraineContext.points")
            .map(
              (
                point: { title: string; description: string },
                index: number
              ) => (
                <motion.div
                  key={index}
                  {...fadeInLeft}
                  transition={{ delay: index * 0.1 }}
                  className="bg-blue-900/20 border border-blue-800 rounded-lg p-6"
                >
                  <h4 className="text-blue-300 font-semibold mb-3">
                    {point.title}
                  </h4>
                  <p className="text-gray-300">{point.description}</p>
                </motion.div>
              )
            )}
        </div>

        <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-700 mt-6">
          <p className="text-blue-200 font-semibold text-center">
            {t("sections.ukraineContext.conclusion")}
          </p>
        </div>
      </LessonSection>

      {/* Why a Financial Plan Matters */}
      <LessonSection
        title={t("sections.financialPlan.title")}
        animationVariant={fadeInLeft}
        onViewportEnter={() => handleProgress(3)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          {t("sections.financialPlan.content")}
        </p>

        <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-700 mb-6">
          <h3 className="text-blue-200 font-semibold text-center mb-4">
            {t("sections.financialPlan.definition")}
          </h3>
          <p className="text-blue-300 text-center">
            {t("sections.financialPlan.fiDefinition")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            {...fadeInLeft}
            className="bg-red-900/20 p-4 rounded-lg border border-red-700"
          >
            <h4 className="text-red-300 font-semibold mb-3">
              {t("sections.financialPlan.randomGoals.title")}
            </h4>
            <ul className="text-gray-300 text-sm space-y-2">
              {t
                .raw("sections.financialPlan.randomGoals.items")
                .map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeInRight}
            className="bg-green-900/20 p-4 rounded-lg border border-green-700"
          >
            <h4 className="text-green-300 font-semibold mb-3">
              {t("sections.financialPlan.strategicPlan.title")}
            </h4>
            <ul className="text-gray-300 text-sm space-y-2">
              {t
                .raw("sections.financialPlan.strategicPlan.items")
                .map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
            </ul>
          </motion.div>
        </div>
      </LessonSection>

      {/* The Financial Independence Framework */}
      <LessonSection
        title={t("sections.fiFramework.title")}
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(4)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          {t("sections.fiFramework.content")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            {...scaleIn}
            className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 text-center"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-blue-300 font-semibold mb-3">
              {t("sections.fiFramework.steps.0.title")}
            </h3>
            <p className="text-gray-300 text-sm">
              {t("sections.fiFramework.steps.0.formula")}
            </p>
            <p className="text-blue-200 text-xs mt-2">
              {t("sections.fiFramework.steps.0.note")}
            </p>
          </motion.div>

          <motion.div
            {...scaleIn}
            transition={{ delay: 0.1 }}
            className="bg-green-900/20 p-6 rounded-lg border border-green-700 text-center"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-green-300 font-semibold mb-3">
              {t("sections.fiFramework.steps.1.title")}
            </h3>
            <p className="text-gray-300 text-sm">
              {t("sections.fiFramework.steps.1.formula")}
            </p>
            <p className="text-green-200 text-xs mt-2">
              {t("sections.fiFramework.steps.1.note")}
            </p>
          </motion.div>

          <motion.div
            {...scaleIn}
            transition={{ delay: 0.2 }}
            className="bg-purple-900/20 p-6 rounded-lg border border-purple-700 text-center"
          >
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-purple-300 font-semibold mb-3">
              {t("sections.fiFramework.steps.2.title")}
            </h3>
            <p className="text-gray-300 text-sm">
              {t("sections.fiFramework.steps.2.formula")}
            </p>
            <p className="text-purple-200 text-xs mt-2">
              {t("sections.fiFramework.steps.2.note")}
            </p>
          </motion.div>
        </div>

        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-700">
          <h4 className="text-yellow-300 font-semibold mb-3">
            {t("sections.fiFramework.savingsRates.title")}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-yellow-200 font-bold">
                {t("sections.fiFramework.savingsRates.rates.0.rate")}
              </div>
              <div className="text-gray-300">
                {t("sections.fiFramework.savingsRates.rates.0.time")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-yellow-200 font-bold">
                {t("sections.fiFramework.savingsRates.rates.1.rate")}
              </div>
              <div className="text-gray-300">
                {t("sections.fiFramework.savingsRates.rates.1.time")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-yellow-200 font-bold">
                {t("sections.fiFramework.savingsRates.rates.2.rate")}
              </div>
              <div className="text-gray-300">
                {t("sections.fiFramework.savingsRates.rates.2.time")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-yellow-200 font-bold">
                {t("sections.fiFramework.savingsRates.rates.3.rate")}
              </div>
              <div className="text-gray-300">
                {t("sections.fiFramework.savingsRates.rates.3.time")}
              </div>
            </div>
          </div>
        </div>
      </LessonSection>

      {/* Financial Independence Calculator */}
      <LessonSection
        title={t("sections.fiCalculator.title")}
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(5)}
      >
        <p className="text-gray-300 mb-6">
          {t("sections.fiCalculator.content")}
        </p>

        <FICalculator onViewportEnter={() => handleProgress(5)} />
      </LessonSection>

      {/* Building Your Supporting Goals */}
      <LessonSection
        title={t("sections.supportingGoals.title")}
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(6)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          {t("sections.supportingGoals.content")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.raw("sections.supportingGoals.categories").map(
            (
              category: {
                title: string;
                description: string;
                icon: string;
                color: string;
                goals: Array<string>;
              },
              index: number
            ) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className={`bg-${
                  category.color || "blue"
                }-900/20 p-6 rounded-lg border border-${
                  category.color || "blue"
                }-700`}
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3
                    className={`text-${
                      category.color || "blue"
                    }-300 font-semibold`}
                  >
                    {category.title}
                  </h3>
                </div>
                <ul className="text-gray-300 text-sm space-y-2">
                  {category.goals.map((goal: string, goalIndex: number) => (
                    <li key={goalIndex} className="flex items-start gap-2">
                      <span
                        className={`text-${category.color || "blue"}-400 mt-1`}
                      >
                        •
                      </span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          )}
        </div>

        <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-700 mt-6">
          <h4 className="text-yellow-300 font-semibold mb-3 text-center">
            {t("sections.supportingGoals.fiFilter.title")}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {t
              .raw("sections.supportingGoals.fiFilter.questions")
              .map((question: string, index: number) => (
                <div key={index}>
                  <p className="text-yellow-200 font-medium">{question}</p>
                </div>
              ))}
          </div>
        </div>
      </LessonSection>

      {/* The FI Planning Process */}
      <LessonSection
        title={t("sections.planningProcess.title")}
        animationVariant={fadeInLeft}
        onViewportEnter={() => handleProgress(7)}
      >
        <p className="text-gray-300 mb-6">
          {t("sections.planningProcess.content")}
        </p>

        <div className="space-y-6">
          {t
            .raw("sections.planningProcess.phases")
            .map(
              (
                phase: { phase: string; color: string; tasks: Array<string> },
                index: number
              ) => (
                <motion.div
                  key={index}
                  {...fadeInLeft}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-${
                    phase.color || "blue"
                  }-900/20 p-6 rounded-lg border border-${
                    phase.color || "blue"
                  }-700`}
                >
                  <h3
                    className={`text-${
                      phase.color || "blue"
                    }-300 font-semibold mb-4`}
                  >
                    {phase.phase}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.tasks.map((task: string, taskIndex: number) => (
                      <div key={taskIndex} className="flex items-start gap-2">
                        <span
                          className={`text-${phase.color || "blue"}-400 mt-1`}
                        >
                          ✓
                        </span>
                        <span className="text-gray-300 text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            )}
        </div>
      </LessonSection>

      {/* Financial Plan Quiz */}
      <LessonSection
        title={t("sections.quiz.title")}
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(8)}
      >
        <Quiz
          question={t("sections.quiz.question")}
          options={t.raw("sections.quiz.options")}
          selectedAnswer={state.quizAnswer}
          onAnswerSelect={(answer) => actions.updateInput("quizAnswer", answer)}
          onCheckAnswer={() => actions.toggleVisibility("showQuizResult")}
          showResult={state.showQuizResult}
          correctAnswer={t("sections.quiz.correctAnswer")}
          explanation={t("sections.quiz.explanation")}
        />
      </LessonSection>

      {/* Implementation Checklist */}
      <LessonSection
        title={t("sections.implementationChecklist.title")}
        animationVariant={fadeInRight}
        onViewportEnter={() => handleProgress(9)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            {...fadeInLeft}
            className="bg-slate-800 p-6 rounded-lg border border-slate-700"
          >
            <h4 className="text-white font-semibold mb-4">
              {t("sections.implementationChecklist.thisWeek.title")}:
            </h4>
            <div className="space-y-3">
              {t
                .raw("sections.implementationChecklist.thisWeek.tasks")
                .map((task: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-gray-300 text-sm">{task}</span>
                  </div>
                ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeInRight}
            className="bg-slate-800 p-6 rounded-lg border border-slate-700"
          >
            <h4 className="text-white font-semibold mb-4">
              {t("sections.implementationChecklist.thisMonth.title")}:
            </h4>
            <div className="space-y-3">
              {t
                .raw("sections.implementationChecklist.thisMonth.tasks")
                .map((task: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-gray-300 text-sm">{task}</span>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </LessonSection>

      {/* Key Takeaways */}
      <LessonSection
        title={t("sections.keyTakeaways.title")}
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(10)}
      >
        <KeyTakeaways
          animationVariant={fadeInLeft}
          items={t.raw("sections.keyTakeaways.items")}
        />
      </LessonSection>

      {/* Next Steps */}
      <NextStepsCard
        animationVariant={bounceIn}
        onViewportEnter={() => handleProgress(11)}
        title={t("sections.nextSteps.title")}
        description={t("sections.nextSteps.description")}
        progressValue={50}
        lessonLabel={t("sections.nextSteps.lessonLabel")}
        completeMessage={t("sections.nextSteps.completeMessage")}
      />
    </div>
  );
}
