"use client";
import { LessonSection } from "@/components/lessons/LessonSection";
import { Quiz } from "@/components/lessons/Quiz";
import { LessonHero } from "@/components/lessons/LessonHero";
import { KeyTakeaways } from "@/components/lessons/KeyTakeaways";
import { NextStepsCard } from "@/components/lessons/NextStepsCard";
import { Button } from "@/components/ui/button";
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

export default function LessonPage() {
  const t = useTranslations("lessons.whyYouShouldInvest");
  const { state, actions } = useLessonState();

  // Progress tracking
  const handleProgress = (section: number) => {
    actions.updateProgress(section, 9);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center px-4 py-8 md:px-6 md:py-12">
      {/* Hero Section */}
      <LessonHero
        animationVariant={bounceIn}
        onViewportEnter={() => handleProgress(1)}
        title={<>{t("title")}</>}
        subtitle={t("subtitle")}
        description={t("description")}
      />

      {/* Reality Check Section */}
      <LessonSection
        title={t("sections.realityCheck.title")}
        animationVariant={fadeInLeft}
        onViewportEnter={() => handleProgress(2)}
      >
        <p className="text-gray-300 leading-relaxed mb-4 md:mb-6">
          {t("sections.realityCheck.content")}
        </p>

        {!state.showRealityCheck ? (
          <Button
            onClick={() => actions.toggleVisibility("showRealityCheck")}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm md:text-base leading-snug whitespace-normal break-words px-3 py-3"
          >
            {t("sections.realityCheck.button")}
          </Button>
        ) : (
          <motion.div {...scaleIn} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                <p className="text-blue-300 text-sm">
                  {t("sections.realityCheck.savingsAccount")}
                </p>
                <p className="text-2xl font-bold text-blue-400">$11,049</p>
              </div>
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
                <p className="text-green-300 text-sm">
                  {t("sections.realityCheck.friendInvestment")}
                </p>
                <p className="text-2xl font-bold text-green-400">$38,697</p>
              </div>
              <div className="bg-red-900/30 p-4 rounded-lg border border-red-700">
                <p className="text-red-300 text-sm">
                  {t("sections.realityCheck.moneyLeft")}
                </p>
                <p className="text-2xl font-bold text-red-400">$27,648</p>
              </div>
            </div>
            <p className="text-gray-300 text-center text-sm md:text-base">
              {t("sections.realityCheck.conclusion")}
            </p>
          </motion.div>
        )}
      </LessonSection>

      {/* Inflation Section */}
      <LessonSection
        title={t("sections.inflation.title")}
        animationVariant={fadeInRight}
        onViewportEnter={() => handleProgress(3)}
      >
        <p className="text-gray-300 leading-relaxed mb-4 md:mb-6">
          {t("sections.inflation.content")}
        </p>

        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-red-200 text-sm md:text-base">
            {t("sections.inflation.example")}
          </p>
          <p className="text-red-300 mt-2 text-sm md:text-base">
            {t("sections.inflation.conclusion")}
          </p>
        </div>

        <div className="bg-red-900/30 p-4 rounded-lg border border-red-700 mt-4 md:mt-6">
          <p className="text-red-200 font-semibold text-center text-sm md:text-base">
            {t("sections.inflation.warning")}
          </p>
        </div>
      </LessonSection>

      {/* Three Pillars Section */}
      <LessonSection
        title={t("sections.threePillars.title")}
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(4)}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {t
            .raw("sections.threePillars.pillars")
            .map(
              (
                pillar: { title: string; description: string; color: string },
                index: number
              ) => (
                <motion.div
                  key={index}
                  {...(index === 0
                    ? fadeInLeft
                    : index === 1
                    ? fadeInUp
                    : fadeInRight)}
                  className={`bg-${pillar.color}-900/20 p-4 md:p-6 rounded-lg border border-${pillar.color}-800`}
                >
                  <h3
                    className={`text-lg md:text-xl font-semibold text-${pillar.color}-300 mb-2 md:mb-3`}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base">
                    {pillar.description}
                  </p>
                </motion.div>
              )
            )}
        </div>
      </LessonSection>

      {/* Myths Section */}
      <LessonSection
        title={t("sections.myths.title")}
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(5)}
      >
        <div className="space-y-4 md:space-y-6">
          {t
            .raw("sections.myths.items")
            .map((item: { myth: string; reality: string }, index: number) => (
              <motion.div
                key={index}
                {...fadeInLeft}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-red-500 pl-4"
              >
                <p className="text-red-300 font-semibold text-sm md:text-base">
                  Myth: &ldquo;{item.myth}&rdquo;
                </p>
                <p className="text-gray-300 text-sm md:text-base mt-2">
                  Reality: {item.reality}
                </p>
              </motion.div>
            ))}
        </div>
      </LessonSection>

      {/* Early Start Overview */}
      <LessonSection
        title={t("sections.earlyStart.title")}
        animationVariant={fadeInRight}
        onViewportEnter={() => handleProgress(6)}
      >
        <div className="space-y-4">
          <motion.div
            {...fadeInUp}
            className="bg-blue-900/20 border border-blue-800 rounded-lg p-4"
          >
            <p className="text-blue-200 text-sm md:text-base">
              {t("sections.earlyStart.description")}
            </p>
          </motion.div>

          {t
            .raw("sections.earlyStart.scenarios")
            .map(
              (
                scenario: {
                  title: string;
                  color: string;
                  details: Array<string>;
                },
                index: number
              ) => (
                <motion.div
                  key={index}
                  {...fadeInLeft}
                  transition={{ delay: index * 0.2 }}
                  className={`bg-${scenario.color}-900/20 p-4 rounded-lg border border-${scenario.color}-700`}
                >
                  <h4 className={`text-${scenario.color}-300 font-semibold`}>
                    {scenario.title}:
                  </h4>
                  <ul className="text-gray-300 text-sm md:text-base mt-2 space-y-1">
                    {scenario.details.map((detail: string, i: number) => (
                      <li key={i}>• {detail}</li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}

          <motion.div
            {...fadeInUp}
            className="bg-blue-900/30 p-4 rounded-lg border border-blue-700"
          >
            <p className="text-blue-200 text-center font-semibold text-sm md:text-base">
              {t("sections.earlyStart.conclusion")}
            </p>
          </motion.div>
        </div>
      </LessonSection>

      {/* Knowledge Check Quiz */}
      <LessonSection
        title={t("sections.quiz.title")}
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(7)}
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

      {/* Key Takeaways */}
      <LessonSection
        title={t("sections.keyTakeaways.title")}
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(8)}
      >
        <KeyTakeaways
          animationVariant={fadeInLeft}
          items={t.raw("sections.keyTakeaways.items")}
        />
      </LessonSection>

      {/* Next Steps */}
      <NextStepsCard
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(9)}
        title={t("sections.nextSteps.title")}
        description={t("sections.nextSteps.description")}
        progressValue={25}
        lessonLabel={t("sections.nextSteps.lessonLabel")}
        completeMessage={t("sections.nextSteps.completeMessage")}
      />
    </div>
  );
}
