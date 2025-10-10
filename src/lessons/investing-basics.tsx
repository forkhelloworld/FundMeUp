"use client";
import { useState } from "react";
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
  rotateIn,
  scaleIn,
  slideInFromBottom,
} from "@/constants/animations";
import { useLessonState } from "@/hooks/useLessonState";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function InvestingBasicsPage() {
  const t = useTranslations("lessons.investingBasics");
  const commonT = useTranslations("common");
  const { state, actions } = useLessonState();

  // Local state for form data
  const [formData, setFormData] = useState({
    riskTolerance: "moderate",
    currentAge: 25,
    timeHorizon: 20,
    currentNetWorth: 0,
    monthlyContribution: 0,
  });

  // Validation state
  const [validationErrors, setValidationErrors] = useState<{
    currentAge?: string;
    currentNetWorth?: string;
    monthlyContribution?: string;
  }>({});

  // Validation functions
  const validateField = (field: string, value: number) => {
    // Simple validation - can be enhanced later
    if (field === "currentAge" && (value < 18 || value > 100)) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: "Age must be between 18 and 100",
      }));
      return false;
    }
    if (field === "currentNetWorth" && value < 0) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: "Net worth cannot be negative",
      }));
      return false;
    }
    if (field === "monthlyContribution" && value < 0) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: "Monthly contribution cannot be negative",
      }));
      return false;
    }
    setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    return true;
  };

  const validateAllFields = () => {
    const isValid =
      validateField("currentAge", formData.currentAge) &&
      validateField("currentNetWorth", formData.currentNetWorth) &&
      validateField("monthlyContribution", formData.monthlyContribution);
    return isValid;
  };

  // Input handlers with validation
  const handleAgeChange = (value: number) => {
    setFormData((prev) => ({ ...prev, currentAge: value }));
    validateField("currentAge", value);
  };

  const handleNetWorthChange = (value: number) => {
    setFormData((prev) => ({ ...prev, currentNetWorth: value }));
    validateField("currentNetWorth", value);
  };

  const handleContributionChange = (value: number) => {
    setFormData((prev) => ({ ...prev, monthlyContribution: value }));
    validateField("monthlyContribution", value);
  };

  const handleCalculateAllocation = () => {
    if (validateAllFields()) {
      actions.toggleVisibility("showAllocationResult");
    }
  };

  // Calculations
  const stockPercentage = Math.max(20, Math.min(90, 110 - formData.currentAge));
  const bondPercentage = 100 - stockPercentage;
  const dcaExample = {
    month1: { price: 100, shares: state.dcaAmount / 100 },
    month2: { price: 80, shares: state.dcaAmount / 80 },
    month3: { price: 120, shares: state.dcaAmount / 120 },
    month4: { price: 90, shares: state.dcaAmount / 90 },
  };
  const totalShares = Object.values(dcaExample).reduce(
    (sum, month) => sum + month.shares,
    0
  );
  const totalInvested = state.dcaAmount * 4;
  const averagePrice = totalInvested / totalShares;

  // Progress tracking
  const handleProgress = (section: number) => {
    actions.updateProgress(section, 11);
  };

  // Event handlers
  const handleRiskQuiz = () => {
    let score = 0;
    if (formData.currentAge < 30) score += 3;
    else if (formData.currentAge < 50) score += 2;
    else score += 1;

    if (formData.timeHorizon > 20) score += 3;
    else if (formData.timeHorizon > 10) score += 2;
    else score += 1;

    if (formData.riskTolerance === "aggressive") score += 3;
    else if (formData.riskTolerance === "moderate") score += 2;
    else score += 1;

    if (score >= 8)
      actions.updateInput(
        "riskProfile",
        t("sections.riskQuiz.riskToleranceOptions.aggressive")
      );
    else if (score >= 5)
      actions.updateInput(
        "riskProfile",
        t("sections.riskQuiz.riskToleranceOptions.moderate")
      );
    else
      actions.updateInput(
        "riskProfile",
        t("sections.riskQuiz.riskToleranceOptions.conservative")
      );

    actions.toggleVisibility("showRiskResult");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center px-6 py-12">
      {/* Hero Section */}
      <LessonHero
        animationVariant={bounceIn}
        onViewportEnter={() => handleProgress(1)}
        title={
          <>
            📈 <span className="text-green-400">{t("title")}</span>
          </>
        }
        subtitle={t("subtitle")}
        description={t("description")}
      />

      {/* From Goals to Action */}
      <LessonSection
        title={t("sections.goalsToAction.title")}
        animationVariant={fadeInLeft}
        onViewportEnter={() => handleProgress(2)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          {t("sections.goalsToAction.content")}
        </p>

        <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
          <p className="text-green-200 font-semibold text-center">
            {t("sections.goalsToAction.highlight")}
          </p>
        </div>
      </LessonSection>

      {/* Investment Universe */}
      <LessonSection
        title={t("sections.investmentUniverse.title")}
        animationVariant={fadeInRight}
        onViewportEnter={() => handleProgress(3)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              icon: "🏢",
              title: t("sections.investmentUniverse.stocks.title"),
              color: "blue",
              what: t("sections.investmentUniverse.stocks.what"),
              how: t("sections.investmentUniverse.stocks.how"),
              risk: t("sections.investmentUniverse.stocks.risk"),
              time: t("sections.investmentUniverse.stocks.time"),
              example: t("sections.investmentUniverse.stocks.example"),
            },
            {
              icon: "🏛️",
              title: t("sections.investmentUniverse.bonds.title"),
              color: "green",
              what: t("sections.investmentUniverse.bonds.what"),
              how: t("sections.investmentUniverse.bonds.how"),
              risk: t("sections.investmentUniverse.bonds.risk"),
              time: t("sections.investmentUniverse.bonds.time"),
              example: t("sections.investmentUniverse.bonds.example"),
            },
            {
              icon: "🧺",
              title: t("sections.investmentUniverse.mutualFunds.title"),
              color: "purple",
              what: t("sections.investmentUniverse.mutualFunds.what"),
              how: t("sections.investmentUniverse.mutualFunds.how"),
              risk: t("sections.investmentUniverse.mutualFunds.risk"),
              time: t("sections.investmentUniverse.mutualFunds.time"),
              example: t("sections.investmentUniverse.mutualFunds.example"),
            },
            {
              icon: "📦",
              title: t("sections.investmentUniverse.etfs.title"),
              color: "orange",
              what: t("sections.investmentUniverse.etfs.what"),
              how: t("sections.investmentUniverse.etfs.how"),
              risk: t("sections.investmentUniverse.etfs.risk"),
              time: t("sections.investmentUniverse.etfs.time"),
              example: t("sections.investmentUniverse.etfs.example"),
            },
          ].map((investment, index) => (
            <motion.div
              key={index}
              {...scaleIn}
              transition={{ delay: index * 0.1 }}
              className={`bg-${investment.color}-900/20 p-4 rounded-lg border border-${investment.color}-700`}
            >
              <h3
                className={`text-${investment.color}-300 font-semibold mb-3 flex items-center gap-2`}
              >
                {investment.icon} {investment.title}
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                <strong>{commonT("whatItIs")}:</strong> {investment.what}
              </p>
              <p className="text-gray-300 text-sm mb-3">
                <strong>{commonT("howYouMakeMoney")}:</strong> {investment.how}
              </p>
              <p className="text-gray-300 text-sm mb-3">
                <strong>{commonT("riskLevel")}:</strong> {investment.risk}
              </p>
              <p className="text-gray-300 text-sm mb-3">
                <strong>{commonT("timeHorizon")}:</strong> {investment.time}
              </p>
              <div className={`bg-${investment.color}-900/40 p-3 rounded-lg`}>
                <p className={`text-${investment.color}-200 text-sm`}>
                  <strong>{commonT("example")}:</strong> {investment.example}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </LessonSection>

      {/* Risk vs Return */}
      <LessonSection
        title={t("sections.riskReturn.title")}
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(4)}
      >
        <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-700 mb-6">
          <p className="text-yellow-200 font-semibold text-center">
            {t("sections.riskReturn.fundamentalTruth")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {t
            .raw("sections.riskReturn.riskLevels")
            .map(
              (
                level: { risk: string; examples: string[]; color: string },
                index: number
              ) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-${level.color}-900/20 p-4 rounded-lg border border-${level.color}-700`}
                >
                  <h4 className={`text-${level.color}-300 font-semibold mb-3`}>
                    {level.risk}
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {level.examples.map((example: string, i: number) => (
                      <li key={i}>• {example}</li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}
        </div>

        <motion.div
          {...fadeInLeft}
          className="bg-blue-900/20 p-4 rounded-lg border border-blue-700"
        >
          <h4 className="text-blue-300 font-semibold mb-3">
            {t("sections.riskReturn.personalRiskTolerance.title")}
          </h4>
          <p className="text-gray-300 text-sm mb-3">
            {t("sections.riskReturn.personalRiskTolerance.askYourself")}
          </p>
          <ol className="text-gray-300 text-sm space-y-2">
            {t
              .raw("sections.riskReturn.personalRiskTolerance.questions")
              .map((question: string, index: number) => (
                <li key={index}>
                  {index + 1}. <strong>{question}</strong>
                </li>
              ))}
          </ol>
        </motion.div>
      </LessonSection>

      {/* Risk Tolerance Quiz */}
      <LessonSection
        title={t("sections.riskQuiz.title")}
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(5)}
      >
        <div className="space-y-6">
          <div>
            <label className="text-white font-semibold">
              {t("sections.riskQuiz.ageQuestion")}
            </label>
            <input
              type="number"
              value={formData.currentAge}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  currentAge: Number(e.target.value),
                }))
              }
              className="w-full bg-slate-800 border-slate-700 text-white mt-2 p-2 rounded border"
            />
          </div>

          <div>
            <label className="text-white font-semibold">
              {t("sections.riskQuiz.timeHorizonQuestion")}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              {t
                .raw("sections.riskQuiz.timeHorizonOptions")
                .map((option: { value: string; label: string }) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        timeHorizon: Number(option.value),
                      }))
                    }
                    className={`p-3 rounded-lg border transition-colors ${
                      formData.timeHorizon === Number(option.value)
                        ? "border-green-500 bg-green-900/30"
                        : "border-slate-700 bg-slate-800 hover:bg-slate-700"
                    }`}
                  >
                    <span className="text-gray-300">{option.label}</span>
                  </button>
                ))}
            </div>
          </div>

          <div>
            <label className="text-white font-semibold">
              {t("sections.riskQuiz.riskToleranceQuestion")}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              {t
                .raw("sections.riskQuiz.riskToleranceOptions")
                .map((option: { value: string; label: string }) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        riskTolerance: option.value,
                      }))
                    }
                    className={`p-3 rounded-lg border transition-colors ${
                      formData.riskTolerance === option.value
                        ? "border-green-500 bg-green-900/30"
                        : "border-slate-700 bg-slate-800 hover:bg-slate-700"
                    }`}
                  >
                    <span className="text-gray-300">{option.label}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>

        <Button
          onClick={handleRiskQuiz}
          className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
        >
          {t("sections.riskQuiz.calculateButton")}
        </Button>

        {state.showRiskResult && (
          <motion.div
            {...scaleIn}
            className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-700"
          >
            <p className="text-blue-200 text-center mb-2">
              <strong>
                {t("sections.riskQuiz.resultPrefix")} {state.riskProfile}
              </strong>
            </p>
            <p className="text-blue-300 text-sm text-center">
              {t("sections.riskQuiz.resultSuffix", {
                age: formData.currentAge,
                timeHorizon: formData.timeHorizon,
                riskTolerance: formData.riskTolerance,
              })}
            </p>
          </motion.div>
        )}
      </LessonSection>

      {/* Asset Allocation Calculator */}
      <LessonSection
        title={t("sections.assetAllocation.title")}
        animationVariant={fadeInRight}
        onViewportEnter={() => handleProgress(6)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            {...fadeInLeft}
            className="bg-green-900/20 p-4 rounded-lg border border-green-700"
          >
            <h3 className="text-green-300 font-semibold mb-4">
              {t("sections.assetAllocation.profileTitle")}
            </h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="calcAge" className="text-green-200">
                  {t("sections.assetAllocation.ageLabel")}
                </label>
                <input
                  id="calcAge"
                  type="number"
                  value={formData.currentAge || ""}
                  onChange={(e) => handleAgeChange(Number(e.target.value))}
                  className={`w-full bg-slate-800 text-white p-2 rounded border ${
                    validationErrors.currentAge
                      ? "border-red-500"
                      : "border-slate-700"
                  }`}
                />
                {validationErrors.currentAge && (
                  <p className="text-red-400 text-sm mt-1">
                    {validationErrors.currentAge}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="calcSavings" className="text-green-200">
                  {t("sections.assetAllocation.savingsLabel")}
                </label>
                <input
                  id="calcSavings"
                  type="number"
                  value={formData.currentNetWorth || ""}
                  onChange={(e) => handleNetWorthChange(Number(e.target.value))}
                  className={`w-full bg-slate-800 text-white p-2 rounded border ${
                    validationErrors.currentNetWorth
                      ? "border-red-500"
                      : "border-slate-700"
                  }`}
                />
                {validationErrors.currentNetWorth && (
                  <p className="text-red-400 text-sm mt-1">
                    {validationErrors.currentNetWorth}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="calcContribution" className="text-green-200">
                  {t("sections.assetAllocation.contributionLabel")}
                </label>
                <input
                  id="calcContribution"
                  type="number"
                  value={formData.monthlyContribution || ""}
                  onChange={(e) =>
                    handleContributionChange(Number(e.target.value))
                  }
                  className={`w-full bg-slate-800 text-white p-2 rounded border ${
                    validationErrors.monthlyContribution
                      ? "border-red-500"
                      : "border-slate-700"
                  }`}
                />
                {validationErrors.monthlyContribution && (
                  <p className="text-red-400 text-sm mt-1">
                    {validationErrors.monthlyContribution}
                  </p>
                )}
              </div>
            </div>
            <Button
              onClick={handleCalculateAllocation}
              className="w-full bg-green-600 hover:bg-green-700 mt-4"
            >
              {t("sections.assetAllocation.calculateButton")}
            </Button>
          </motion.div>

          {state.showAllocationResult && (
            <motion.div
              {...fadeInRight}
              className="bg-blue-900/20 p-4 rounded-lg border border-blue-700"
            >
              <h3 className="text-blue-300 font-semibold mb-4">
                {t("sections.assetAllocation.recommendedTitle")}
              </h3>
              <div className="space-y-4">
                {[
                  {
                    name: t("sections.assetAllocation.stocksLabel"),
                    percentage: stockPercentage,
                    color: "blue",
                  },
                  {
                    name: t("sections.assetAllocation.bondsLabel"),
                    percentage: bondPercentage,
                    color: "green",
                  },
                ].map((asset, index) => (
                  <div
                    key={index}
                    className={`bg-${asset.color}-900/40 p-3 rounded-lg`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-${asset.color}-200`}>
                        {asset.name}
                      </span>
                      <span className={`text-${asset.color}-300 font-bold`}>
                        {asset.percentage}%
                      </span>
                    </div>
                    <div
                      className={`w-full bg-${asset.color}-900/60 rounded-full h-2 mt-2`}
                    >
                      <div
                        className={`bg-${asset.color}-400 h-2 rounded-full`}
                        style={{ width: `${asset.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}

                <div className="bg-yellow-900/40 p-3 rounded-lg">
                  <p className="text-yellow-200 text-sm">
                    <strong>{t("sections.assetAllocation.formula")}</strong>
                  </p>
                  <p className="text-yellow-200 text-sm">
                    <strong>
                      {t("sections.assetAllocation.yourAge", {
                        age: formData.currentAge,
                        stockPercentage: 110 - formData.currentAge,
                        bondPercentage: 100 - (110 - formData.currentAge),
                      })}
                    </strong>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </LessonSection>

      {/* Dollar-Cost Averaging Simulator */}
      <LessonSection
        title={t("sections.dcaSimulator.title")}
        animationVariant={rotateIn}
        onViewportEnter={() => handleProgress(7)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          <strong>{t("sections.dcaSimulator.description")}</strong>
        </p>

        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700 mb-6">
          <h4 className="text-purple-300 font-semibold mb-3">
            {t("sections.dcaSimulator.simulatorTitle")}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              {
                id: "dcaAmount",
                label: t("sections.dcaSimulator.monthlyAmountLabel"),
                key: "dcaAmount" as keyof typeof state,
              },
              {
                id: "dcaMonths",
                label: t("sections.dcaSimulator.monthsLabel"),
                key: "dcaMonths" as keyof typeof state,
              },
            ].map((input) => (
              <div key={input.id}>
                <label htmlFor={input.id} className="text-purple-200">
                  {input.label}
                </label>
                <input
                  id={input.id}
                  type="number"
                  value={state[input.key] as number}
                  onChange={(e) =>
                    actions.updateInput(input.key, Number(e.target.value))
                  }
                  className="w-full bg-slate-800 border-slate-700 text-white p-2 rounded border"
                />
              </div>
            ))}
          </div>
          <Button
            onClick={() => actions.toggleVisibility("showDcaResult")}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {t("sections.dcaSimulator.runSimulationButton")}
          </Button>
        </div>

        {state.showDcaResult && (
          <motion.div {...scaleIn} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(dcaExample).map(([month, data]) => (
                <div
                  key={month}
                  className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-center"
                >
                  <p className="text-gray-400 text-sm">{month}</p>
                  <p className="text-white font-semibold">${data.price}</p>
                  <p className="text-green-400 text-sm">
                    {data.shares.toFixed(1)} shares
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                {[
                  {
                    label: t("sections.dcaSimulator.totalSharesLabel"),
                    value: totalShares.toFixed(1),
                  },
                  {
                    label: t("sections.dcaSimulator.totalInvestedLabel"),
                    value: `${totalInvested.toLocaleString()}`,
                  },
                  {
                    label: t("sections.dcaSimulator.averagePriceLabel"),
                    value: `${averagePrice.toFixed(2)}`,
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <p className="text-green-300 text-sm">{item.label}</p>
                    <p className="text-green-400 font-bold text-xl">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
              <p className="text-blue-200 text-center">
                <strong>{t("sections.dcaSimulator.whyDcaWorks")}</strong>
              </p>
            </div>
          </motion.div>
        )}
      </LessonSection>

      {/* Investment Strategy Builder */}
      <LessonSection
        title={t("sections.strategyBuilder.title")}
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(8)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {t.raw("sections.strategyBuilder.options").map(
            (
              option: {
                title: string;
                description: string;
                icon: string;
                color: string;
                items: string[];
                bestFor: string;
              },
              index: number
            ) => (
              <motion.div
                key={index}
                {...scaleIn}
                transition={{ delay: index * 0.2 }}
                className={`bg-${option.color}-900/20 p-4 rounded-lg border border-${option.color}-700`}
              >
                <h4 className={`text-${option.color}-300 font-semibold mb-3`}>
                  {option.title}
                </h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  {option.items.map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
                <div
                  className={`bg-${option.color}-900/40 p-3 rounded-lg mt-3`}
                >
                  <p className={`text-${option.color}-200 text-sm`}>
                    <strong>{t("sections.strategyBuilder.bestFor")}:</strong>{" "}
                    {option.bestFor}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </LessonSection>

      {/* Common Mistakes */}
      <LessonSection
        title={t("sections.commonMistakes.title")}
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(9)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.raw("sections.commonMistakes.mistakes").map(
            (
              item: {
                mistake: string;
                solution: string;
                icon: string;
                problem: string;
              },
              index: number
            ) => (
              <motion.div
                key={index}
                {...fadeInLeft}
                transition={{ delay: index * 0.1 }}
                className="bg-red-900/20 p-4 rounded-lg border border-red-700"
              >
                <h4 className="text-red-300 font-semibold mb-3">
                  {t("sections.commonMistakes.mistakeNumber", {
                    number: index + 1,
                  })}
                  : {item.mistake}
                </h4>
                <div className="space-y-2">
                  <p className="text-red-200 text-sm">
                    <strong>{t("sections.commonMistakes.problem")}:</strong>{" "}
                    {item.problem}
                  </p>
                  <p className="text-green-200 text-sm">
                    <strong>{t("sections.commonMistakes.solution")}:</strong>{" "}
                    {item.solution}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </LessonSection>

      {/* Knowledge Check Quiz */}
      <LessonSection
        title={t("sections.quiz.title")}
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(10)}
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
        onViewportEnter={() => handleProgress(11)}
      >
        <KeyTakeaways
          animationVariant={fadeInLeft}
          onViewportEnter={() => {}}
          items={t.raw("sections.keyTakeaways.items")}
        />
      </LessonSection>

      {/* Next Steps */}
      <NextStepsCard
        animationVariant={bounceIn}
        onViewportEnter={() => handleProgress(12)}
        title={t("sections.nextSteps.title")}
        description={t("sections.nextSteps.description")}
        progressValue={75}
        lessonLabel={t("sections.nextSteps.lessonLabel")}
        completeMessage={t("sections.nextSteps.completeMessage")}
      />
    </div>
  );
}
