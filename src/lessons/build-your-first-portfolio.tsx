"use client";
import { Card } from "@/components/ui/card";
import { LessonHero } from "@/components/lessons/LessonHero";
import { LessonSection } from "@/components/lessons/LessonSection";
import { KeyTakeaways } from "@/components/lessons/KeyTakeaways";
import { NextStepsCard } from "@/components/lessons/NextStepsCard";
import { PortfolioCalculator } from "@/components/lessons/PortfolioCalculator";
import {
  bounceIn,
  fadeInLeft,
  fadeInUp,
  slideInFromBottom,
} from "@/constants/animations";
import { useLessonState } from "@/hooks/useLessonState";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function DiversifiedPortfolioPage() {
  const { actions } = useLessonState();
  const t = useTranslations("lessons.buildPortfolio");

  // Progress tracking
  const handleProgress = (section: number) => {
    actions.updateProgress(section, 9);
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

      {/* How to Choose ETFs */}
      <LessonSection
        title={t("sections.howToChooseETF.title")}
        animationVariant={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
        }}
        onViewportEnter={() => handleProgress(2)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          {t("sections.howToChooseETF.content")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {t.raw("sections.howToChooseETF.criteria").map(
            (
              criterion: {
                title: string;
                icon: string;
                description: string;
                details: string[];
              },
              index: number
            ) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-blue-900/20 border-blue-700 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{criterion.icon}</span>
                    <h3 className="text-xl font-semibold text-blue-300">
                      {criterion.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-4">{criterion.description}</p>
                  <ul className="space-y-2">
                    {criterion.details.map((detail: string, i: number) => (
                      <li
                        key={i}
                        className="text-gray-300 text-sm flex items-start gap-2"
                      >
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )
          )}
        </div>

        <Card className="bg-green-900/30 border-green-700 p-6">
          <h3 className="text-lg font-semibold text-green-300 mb-3">
            {t("sections.howToChooseETF.types.title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t
              .raw("sections.howToChooseETF.types.items")
              .map(
                (
                  type: { name: string; description: string },
                  index: number
                ) => (
                  <div key={index} className="bg-green-900/20 p-4 rounded">
                    <h4 className="font-semibold text-green-200 mb-2">
                      {type.name}
                    </h4>
                    <p className="text-gray-300 text-sm">{type.description}</p>
                  </div>
                )
              )}
          </div>
        </Card>
      </LessonSection>

      {/* How to Choose OVDP */}
      <LessonSection
        title={t("sections.howToChooseOVDP.title")}
        animationVariant={fadeInLeft}
        onViewportEnter={() => handleProgress(3)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          {t("sections.howToChooseOVDP.content")}
        </p>

        <div className="space-y-6 mb-6">
          {t.raw("sections.howToChooseOVDP.factors").map(
            (
              factor: {
                title: string;
                icon: string;
                description: string;
                tips: string[];
              },
              index: number
            ) => (
              <motion.div
                key={index}
                {...fadeInLeft}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-yellow-900/20 border-yellow-700 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{factor.icon}</span>
                    <h3 className="text-xl font-semibold text-yellow-300">
                      {factor.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-4">{factor.description}</p>
                  <div className="bg-yellow-900/30 p-4 rounded">
                    <h4 className="font-semibold text-yellow-200 mb-2">
                      {t("sections.howToChooseOVDP.whatToLookFor")}:
                    </h4>
                    <ul className="space-y-1">
                      {factor.tips.map((tip: string, i: number) => (
                        <li key={i} className="text-gray-300 text-sm">
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            )
          )}
        </div>

        <Card className="bg-blue-900/30 border-blue-700 p-6">
          <p className="text-blue-200 text-center">
            {t("sections.howToChooseOVDP.importantNote")}
          </p>
        </Card>
      </LessonSection>

      {/* Why Diversification Matters */}
      <LessonSection
        title={t("sections.diversificationMatters.title")}
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(3)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              {t("sections.diversificationMatters.concentrationProblem.title")}
            </h3>
            <div className="space-y-3 text-gray-300">
              {t
                .raw(
                  "sections.diversificationMatters.concentrationProblem.items"
                )
                .map((item: string, index: number) => (
                  <p key={index}>• {item}</p>
                ))}
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-green-300 mb-4">
              {t("sections.diversificationMatters.diversificationPower.title")}
            </h3>
            <div className="space-y-3 text-gray-300">
              {t
                .raw(
                  "sections.diversificationMatters.diversificationPower.items"
                )
                .map((item: string, index: number) => (
                  <p key={index}>• {item}</p>
                ))}
            </div>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700 p-6">
          <h3 className="text-xl font-semibold text-center mb-4">
            {t("sections.diversificationMatters.historicalEvidence.title")}
          </h3>
          <p className="text-center text-gray-300">
            {t("sections.diversificationMatters.historicalEvidence.content")}
          </p>
        </Card>
      </LessonSection>

      {/* Building Portfolio by Risk Profile */}
      <LessonSection
        title={t("sections.riskBasedPortfolio.title")}
        animationVariant={fadeInLeft}
        onViewportEnter={() => handleProgress(4)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          {t("sections.riskBasedPortfolio.content")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {t.raw("sections.riskBasedPortfolio.profiles").map(
            (
              profile: {
                name: string;
                color: string;
                icon: string;
                description: string;
                allocation: {
                  stocks: string;
                  bonds: string;
                  cash?: string;
                };
                characteristics: string[];
                bestFor: string;
              },
              index: number
            ) => {
              const colorClasses: Record<
                string,
                { card: string; title: string; bg: string }
              > = {
                green: {
                  card: "bg-green-900/20 border-green-700",
                  title: "text-green-300",
                  bg: "bg-green-900/30",
                },
                yellow: {
                  card: "bg-yellow-900/20 border-yellow-700",
                  title: "text-yellow-300",
                  bg: "bg-yellow-900/30",
                },
                red: {
                  card: "bg-red-900/20 border-red-700",
                  title: "text-red-300",
                  bg: "bg-red-900/30",
                },
              };
              const colors = colorClasses[profile.color] || colorClasses.yellow;

              return (
                <motion.div
                  key={index}
                  {...fadeInLeft}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`${colors.card} p-6`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{profile.icon}</span>
                      <h3 className={`text-xl font-semibold ${colors.title}`}>
                        {profile.name}
                      </h3>
                    </div>
                    <p className="text-gray-300 mb-4 text-sm">
                      {profile.description}
                    </p>

                    <div className={`${colors.bg} p-4 rounded mb-4`}>
                      <h4 className={`font-semibold ${colors.title} mb-2`}>
                        {t("sections.riskBasedPortfolio.allocation")}:
                      </h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>
                          • {t("sections.riskBasedPortfolio.stocks")}:{" "}
                          {profile.allocation.stocks}
                        </li>
                        <li>
                          • {t("sections.riskBasedPortfolio.bonds")}:{" "}
                          {profile.allocation.bonds}
                        </li>
                        {profile.allocation.cash && (
                          <li>
                            • {t("sections.riskBasedPortfolio.cash")}:{" "}
                            {profile.allocation.cash}
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4
                        className={`font-semibold ${colors.title} mb-2 text-sm`}
                      >
                        {t("sections.riskBasedPortfolio.characteristics")}:
                      </h4>
                      <ul className="space-y-1">
                        {profile.characteristics.map(
                          (char: string, i: number) => (
                            <li key={i} className="text-gray-300 text-sm">
                              • {char}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="border-t border-gray-700 pt-3 mt-4">
                      <p className="text-gray-400 text-xs">
                        <strong>
                          {t("sections.riskBasedPortfolio.bestFor")}:
                        </strong>{" "}
                        {profile.bestFor}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            }
          )}
        </div>

        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700 p-6">
          <h3 className="text-lg font-semibold text-center mb-3">
            {t("sections.riskBasedPortfolio.formula.title")}
          </h3>
          <p className="text-gray-300 text-center mb-4">
            {t("sections.riskBasedPortfolio.formula.description")}
          </p>
          <div className="bg-blue-900/40 p-4 rounded">
            <p className="text-blue-200 font-mono text-center">
              {t("sections.riskBasedPortfolio.formula.rule")}
            </p>
          </div>
        </Card>
      </LessonSection>

      {/* Portfolio Calculator */}
      <LessonSection
        title={t("sections.calculator.title")}
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(5)}
      >
        <PortfolioCalculator />
      </LessonSection>

      {/* Implementation Steps */}
      <LessonSection
        title={t("sections.implementationSteps.title")}
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(6)}
      >
        <div className="space-y-6">
          {t
            .raw("sections.implementationSteps.steps")
            .map(
              (
                step: { step: string; title: string; content: string },
                index: number
              ) => (
                <Card
                  key={index}
                  className={`bg-blue-900/20 border-blue-700 p-6`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold`}
                    >
                      {step.step}
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-semibold text-blue-300 mb-2`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-300">{step.content}</p>
                    </div>
                  </div>
                </Card>
              )
            )}
        </div>
        {t("sections.implementationSteps.importantNote") &&
          t("sections.implementationSteps.importantNote").trim() !== "" && (
            <Card className="bg-yellow-900/30 border-yellow-700 p-6 mt-6">
              <p className="text-yellow-200 font-semibold text-center">
                {t("sections.implementationSteps.importantNote")}
              </p>
            </Card>
          )}
      </LessonSection>

      {/* Common Mistakes */}
      <LessonSection
        title={t("sections.commonMistakes.title")}
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(7)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t
            .raw("sections.commonMistakes.mistakes")
            .map(
              (
                item: { icon: string; mistake: string; solution: string },
                i: number
              ) => (
                <Card key={i} className="bg-red-900/20 border-red-700 p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-red-300 mb-2">
                        {item.mistake}
                      </h3>
                      <p className="text-gray-300 text-sm">{item.solution}</p>
                    </div>
                  </div>
                </Card>
              )
            )}
        </div>
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
        animationVariant={bounceIn}
        onViewportEnter={() => handleProgress(9)}
        title={t("sections.nextSteps.title")}
        description={t("sections.nextSteps.description")}
        progressValue={100}
        lessonLabel={t("sections.nextSteps.lessonLabel")}
        completeMessage={t("sections.nextSteps.completeMessage")}
      />
    </div>
  );
}
