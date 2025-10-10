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
  fadeInRight,
  fadeInUp,
  slideInFromBottom,
} from "@/constants/animations";
import { useLessonState } from "@/hooks/useLessonState";
import { useTranslations } from "next-intl";

export default function DiversifiedPortfolioPage() {
  const { actions } = useLessonState();
  const t = useTranslations("lessons.buildPortfolio");

  // Progress tracking
  const handleProgress = (section: number) => {
    actions.updateProgress(section, 8);
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

      {/* Why Diversification Matters */}
      <LessonSection
        title={t("sections.diversificationMatters.title")}
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(2)}
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

      {/* The Four-Fund Foundation */}
      <LessonSection
        title={t("sections.fourFundFoundation.title")}
        animationVariant={fadeInLeft}
        onViewportEnter={() => handleProgress(3)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Domestic Stocks */}
          <Card className="bg-blue-900/20 border-blue-700 p-6 hover:bg-blue-900/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-blue-300">
                {t("sections.fourFundFoundation.domesticStocks.title")}
              </h3>
              <span className="text-2xl font-bold text-blue-400">
                {t("sections.fourFundFoundation.domesticStocks.percentage")}
              </span>
            </div>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>
                <strong>What it holds:</strong>{" "}
                {t("sections.fourFundFoundation.domesticStocks.whatItHolds")}
              </p>
              <p>
                <strong>Why this fund:</strong>{" "}
                {t("sections.fourFundFoundation.domesticStocks.whyThisFund")}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                {t("sections.fourFundFoundation.domesticStocks.role")}
              </p>
              <div className="bg-blue-900/40 p-3 rounded mt-4">
                <p className="text-blue-200">
                  <strong>Alternatives:</strong>
                </p>
                {t
                  .raw(
                    "sections.fourFundFoundation.domesticStocks.alternatives"
                  )
                  .map((alt: string, index: number) => (
                    <p key={index}>• {alt}</p>
                  ))}
              </div>
            </div>
          </Card>

          {/* International Stocks */}
          <Card className="bg-green-900/20 border-green-700 p-6 hover:bg-green-900/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-green-300">
                {t("sections.fourFundFoundation.internationalStocks.title")}
              </h3>
              <span className="text-2xl font-bold text-green-400">
                {t(
                  "sections.fourFundFoundation.internationalStocks.percentage"
                )}
              </span>
            </div>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>
                <strong>What it holds:</strong>{" "}
                {t(
                  "sections.fourFundFoundation.internationalStocks.whatItHolds"
                )}
              </p>
              <p>
                <strong>Why this fund:</strong>{" "}
                {t(
                  "sections.fourFundFoundation.internationalStocks.whyThisFund"
                )}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                {t("sections.fourFundFoundation.internationalStocks.role")}
              </p>
              <div className="bg-green-900/40 p-3 rounded mt-4">
                <p className="text-green-200">
                  <strong>Alternatives:</strong>
                </p>
                {t
                  .raw(
                    "sections.fourFundFoundation.internationalStocks.alternatives"
                  )
                  .map((alt: string, index: number) => (
                    <p key={index}>• {alt}</p>
                  ))}
              </div>
            </div>
          </Card>

          {/* US Bonds */}
          <Card className="bg-yellow-900/20 border-yellow-700 p-6 hover:bg-yellow-900/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-yellow-300">
                {t("sections.fourFundFoundation.domesticBonds.title")}
              </h3>
              <span className="text-2xl font-bold text-yellow-400">
                {t("sections.fourFundFoundation.domesticBonds.percentage")}
              </span>
            </div>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>
                <strong>What it holds:</strong>{" "}
                {t("sections.fourFundFoundation.domesticBonds.whatItHolds")}
              </p>
              <p>
                <strong>Why this fund:</strong>{" "}
                {t("sections.fourFundFoundation.domesticBonds.whyThisFund")}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                {t("sections.fourFundFoundation.domesticBonds.role")}
              </p>
              <div className="bg-yellow-900/40 p-3 rounded mt-4">
                <p className="text-yellow-200">
                  <strong>Alternatives:</strong>
                </p>
                {t
                  .raw("sections.fourFundFoundation.domesticBonds.alternatives")
                  .map((alt: string, index: number) => (
                    <p key={index}>• {alt}</p>
                  ))}
              </div>
            </div>
          </Card>

          {/* International Bonds */}
          <Card className="bg-purple-900/20 border-purple-700 p-6 hover:bg-purple-900/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-purple-300">
                {t("sections.fourFundFoundation.internationalBonds.title")}
              </h3>
              <span className="text-2xl font-bold text-purple-400">
                {t("sections.fourFundFoundation.internationalBonds.percentage")}
              </span>
            </div>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>
                <strong>What it holds:</strong>{" "}
                {t(
                  "sections.fourFundFoundation.internationalBonds.whatItHolds"
                )}
              </p>
              <p>
                <strong>Why this fund:</strong>{" "}
                {t(
                  "sections.fourFundFoundation.internationalBonds.whyThisFund"
                )}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                {t("sections.fourFundFoundation.internationalBonds.role")}
              </p>
              <div className="bg-purple-900/40 p-3 rounded mt-4">
                <p className="text-purple-200">
                  <strong>Alternatives:</strong>
                </p>
                {t
                  .raw(
                    "sections.fourFundFoundation.internationalBonds.alternatives"
                  )
                  .map((alt: string, index: number) => (
                    <p key={index}>• {alt}</p>
                  ))}
              </div>
            </div>
          </Card>
        </div>
      </LessonSection>

      {/* Portfolio Calculator */}
      <LessonSection
        title={t("sections.calculator.title")}
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(4)}
      >
        <PortfolioCalculator />
      </LessonSection>

      {/* Alternative Approaches */}
      <LessonSection
        title={t("sections.alternativeApproaches.title")}
        animationVariant={fadeInRight}
        onViewportEnter={() => handleProgress(5)}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">
              {t("sections.alternativeApproaches.threeFund.title")}
            </h3>
            <div className="text-sm text-gray-300 space-y-2 mb-4">
              <p>
                • {t("sections.alternativeApproaches.threeFund.description")}
              </p>
              <p>
                • {t("sections.alternativeApproaches.threeFund.allocation")}
              </p>
              {t
                .raw("sections.alternativeApproaches.threeFund.benefits")
                .map((benefit: string, index: number) => (
                  <p key={index}>• {benefit}</p>
                ))}
            </div>
            <div className="text-xs text-gray-400 bg-slate-700 p-2 rounded">
              {t("sections.alternativeApproaches.threeFund.bestFor")}
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-green-300 mb-3">
              {t("sections.alternativeApproaches.growthFocused.title")}
            </h3>
            <div className="text-sm text-gray-300 space-y-2 mb-4">
              <p>
                •{" "}
                {t("sections.alternativeApproaches.growthFocused.description")}
              </p>
              <p>
                • {t("sections.alternativeApproaches.growthFocused.allocation")}
              </p>
              {t
                .raw("sections.alternativeApproaches.growthFocused.benefits")
                .map((benefit: string, index: number) => (
                  <p key={index}>• {benefit}</p>
                ))}
            </div>
            <div className="text-xs text-gray-400 bg-slate-700 p-2 rounded">
              {t("sections.alternativeApproaches.growthFocused.bestFor")}
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">
              {t("sections.alternativeApproaches.targetDate.title")}
            </h3>
            <div className="text-sm text-gray-300 space-y-2 mb-4">
              <p>
                • {t("sections.alternativeApproaches.targetDate.description")}
              </p>
              <p>
                • {t("sections.alternativeApproaches.targetDate.allocation")}
              </p>
              {t
                .raw("sections.alternativeApproaches.targetDate.benefits")
                .map((benefit: string, index: number) => (
                  <p key={index}>• {benefit}</p>
                ))}
            </div>
            <div className="text-xs text-gray-400 bg-slate-700 p-2 rounded">
              {t("sections.alternativeApproaches.targetDate.bestFor")}
            </div>
          </Card>
        </div>
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
