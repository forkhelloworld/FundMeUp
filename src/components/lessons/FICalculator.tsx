"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { fadeInLeft, fadeInRight, scaleIn } from "@/constants/animations";
import { useUserProfileStore } from "@/lib/userProfile-store";
import { createLocalizedFiCalculatorSchema } from "@/lib/validationSchemes";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAchievementChecker } from "@/lib/achievement-checker";
import { useTranslations } from "next-intl";

export function FICalculator({
  onViewportEnter,
}: {
  onViewportEnter?: () => void;
}) {
  const t = useTranslations("lessons.calculators.fiCalculator");
  const tErrors = useTranslations("lessons.errors");
  const tValidation = useTranslations(
    "lessons.calculators.fiCalculator.validation"
  );

  const {
    currentAge,
    selectedFIAge,
    currentNetWorth,
    monthlyIncome,
    monthlyExpenses,
    setUserProfileData,
  } = useUserProfileStore();

  const [savingsRate, setSavingsRate] = useState(20);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [showFICalculation, setShowFICalculation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calcResult, setCalcResult] = useState<{
    annualExpenses: number;
    fiNumber: number;
    monthlySavings: number;
    totalFutureValue: number;
    fiGap: number;
    additionalMonthlySavingsNeeded: number;
    progressPct: number;
    currentNetWorth: number;
    selectedFIAge: number;
    hasExpenses: boolean;
  } | null>(null);

  const schema = useMemo(
    () => createLocalizedFiCalculatorSchema((key) => tValidation(key)),
    [tValidation]
  );

  const {
    checkAndAwardSimulationAchievement,
    checkAndAwardTimeBasedAchievement,
  } = useAchievementChecker();

  const validateAll = () => {
    const result = schema.safeParse({
      currentAge,
      selectedFIAge,
      currentNetWorth,
      monthlyIncome,
      monthlyExpenses,
      savingsRate,
      expectedReturn,
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0] as string;
        if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      validateAll();
    }, 400);

    return () => clearTimeout(timer);
  }, [
    currentAge,
    selectedFIAge,
    currentNetWorth,
    monthlyIncome,
    monthlyExpenses,
    savingsRate,
    expectedReturn,
  ]);

  const annualExpenses = monthlyExpenses * 12;
  const computeResults = () => {
    const hasExpenses = annualExpenses > 0;
    const fiNumber = hasExpenses ? annualExpenses * 25 : 0;
    const monthlySavings = (monthlyIncome * savingsRate) / 100;
    const yearsToFI = selectedFIAge - currentAge;

    const monthlyReturn = expectedReturn / 100 / 12;
    const totalMonths = yearsToFI * 12;
    const futureValueFromCurrent =
      currentNetWorth * Math.pow(1 + expectedReturn / 100, yearsToFI);
    const growthFactor =
      monthlyReturn === 0
        ? totalMonths
        : (Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn;
    const futureValueFromSavings = monthlySavings * growthFactor;
    const totalFutureValue = futureValueFromCurrent + futureValueFromSavings;

    const fiGap = hasExpenses ? Math.max(0, fiNumber - totalFutureValue) : 0;
    const denom =
      monthlyReturn === 0
        ? totalMonths
        : (Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn;
    const additionalMonthlySavingsNeeded =
      hasExpenses && fiGap > 0 ? fiGap / denom : 0;
    const progressPct =
      hasExpenses && fiNumber > 0
        ? Math.min(100, (currentNetWorth / fiNumber) * 100)
        : 0;

    return {
      annualExpenses,
      fiNumber,
      monthlySavings,
      totalFutureValue,
      fiGap,
      additionalMonthlySavingsNeeded,
      progressPct,
      currentNetWorth,
      selectedFIAge,
      hasExpenses,
    };
  };

  const handleUserProfileDataChange = (field: string, value: number) => {
    setUserProfileData({
      ...useUserProfileStore.getState(),
      [field]: value,
    });
  };

  return (
    <motion.div
      {...(onViewportEnter ? { onViewportEnter } : {})}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <motion.div
        {...fadeInLeft}
        className="bg-slate-800 p-6 rounded-lg border border-slate-700"
      >
        <h3 className="text-white font-semibold mb-4">{t("title")}</h3>

        <div className="space-y-4">
          <div>
            <label className="text-gray-300 block mb-2">
              {t("currentAge")}
            </label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) =>
                handleUserProfileDataChange(
                  "currentAge",
                  Number(e.target.value)
                )
              }
              onFocus={(e) => e.target.select()}
              aria-invalid={Boolean(errors.currentAge) || undefined}
              aria-describedby={
                errors.currentAge ? "currentAge-error" : undefined
              }
              className={`w-full bg-slate-700 text-white p-3 rounded border ${
                errors.currentAge
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                  : "border-slate-600"
              }`}
            />
            {errors.currentAge && (
              <p id="currentAge-error" className="mt-1 text-xs text-red-400">
                {errors.currentAge}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-300 block mb-2">
              {t("retirementAge")}
            </label>
            <input
              type="number"
              value={selectedFIAge}
              onChange={(e) =>
                handleUserProfileDataChange(
                  "selectedFIAge",
                  Number(e.target.value)
                )
              }
              onFocus={(e) => e.target.select()}
              aria-invalid={Boolean(errors.selectedFIAge) || undefined}
              aria-describedby={
                errors.selectedFIAge ? "selectedFIAge-error" : undefined
              }
              className={`w-full bg-slate-700 text-white p-3 rounded border ${
                errors.selectedFIAge
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                  : "border-slate-600"
              }`}
            />
            {errors.selectedFIAge && (
              <p id="selectedFIAge-error" className="mt-1 text-xs text-red-400">
                {errors.selectedFIAge}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-300 block mb-2">
              {t("currentSavings")}
            </label>
            <input
              type="number"
              value={currentNetWorth}
              onChange={(e) =>
                handleUserProfileDataChange(
                  "currentNetWorth",
                  Number(e.target.value)
                )
              }
              onFocus={(e) => e.target.select()}
              aria-invalid={Boolean(errors.currentNetWorth) || undefined}
              aria-describedby={
                errors.currentNetWorth ? "currentNetWorth-error" : undefined
              }
              className={`w-full bg-slate-700 text-white p-3 rounded border ${
                errors.currentNetWorth
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                  : "border-slate-600"
              }`}
            />
            {errors.currentNetWorth && (
              <p
                id="currentNetWorth-error"
                className="mt-1 text-xs text-red-400"
              >
                {errors.currentNetWorth}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-300 block mb-2">
              {t("monthlyIncome")}
            </label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) =>
                handleUserProfileDataChange(
                  "monthlyIncome",
                  Number(e.target.value)
                )
              }
              onFocus={(e) => e.target.select()}
              aria-invalid={Boolean(errors.monthlyIncome) || undefined}
              aria-describedby={
                errors.monthlyIncome ? "monthlyIncome-error" : undefined
              }
              className={`w-full bg-slate-700 text-white p-3 rounded border ${
                errors.monthlyIncome
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                  : "border-slate-600"
              }`}
            />
            {errors.monthlyIncome && (
              <p id="monthlyIncome-error" className="mt-1 text-xs text-red-400">
                {errors.monthlyIncome}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-300 block mb-2">
              {t("monthlyExpenses")}
            </label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) =>
                handleUserProfileDataChange(
                  "monthlyExpenses",
                  Number(e.target.value)
                )
              }
              onFocus={(e) => e.target.select()}
              aria-invalid={Boolean(errors.monthlyExpenses) || undefined}
              aria-describedby={
                errors.monthlyExpenses ? "monthlyExpenses-error" : undefined
              }
              className={`w-full bg-slate-700 text-white p-3 rounded border ${
                errors.monthlyExpenses
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                  : "border-slate-600"
              }`}
            />
            {errors.monthlyExpenses && (
              <p
                id="monthlyExpenses-error"
                className="mt-1 text-xs text-red-400"
              >
                {errors.monthlyExpenses}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-300 block mb-2">
              {t("expectedReturn")}
            </label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => {
                setExpectedReturn(Number(e.target.value));
                validateAll();
              }}
              onFocus={(e) => e.target.select()}
              aria-invalid={Boolean(errors.expectedReturn) || undefined}
              aria-describedby={
                errors.expectedReturn ? "expectedReturn-error" : undefined
              }
              className={`w-full bg-slate-700 text-white p-3 rounded border ${
                errors.expectedReturn
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                  : "border-slate-600"
              }`}
            />
            {errors.expectedReturn && (
              <p
                id="expectedReturn-error"
                className="mt-1 text-xs text-red-400"
              >
                {errors.expectedReturn}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-300 block mb-2">
              {t("savingsRate")}: {savingsRate}%
            </label>
            <input
              type="range"
              min="0"
              max="80"
              value={savingsRate}
              onChange={(e) => {
                setSavingsRate(Number(e.target.value));
                validateAll();
              }}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span>40%</span>
              <span>80%</span>
            </div>
            {errors.savingsRate && (
              <p className="mt-1 text-xs text-red-400">{errors.savingsRate}</p>
            )}
          </div>
        </div>

        <Button
          onClick={async () => {
            if (validateAll()) {
              setCalcResult(computeResults());
              setShowFICalculation(true);

              // Check achievements after running simulation
              await checkAndAwardSimulationAchievement();
              await checkAndAwardTimeBasedAchievement();
            } else {
              setShowFICalculation(false);
              toast.error(tErrors("pleaseCorrectFields"), {
                description: tErrors("someInputsInvalid"),
              });
            }
          }}
          className="w-full bg-green-600 hover:bg-green-700 mt-6"
        >
          {t("calculate")}
        </Button>
      </motion.div>

      <motion.div
        {...fadeInRight}
        className="bg-slate-800 p-6 rounded-lg border border-slate-700"
      >
        <h3 className="text-white font-semibold mb-4">{t("results.title")}</h3>

        {showFICalculation && calcResult ? (
          !calcResult.hasExpenses ? (
            <p className="text-gray-400 text-sm">{t("results.noExpenses")}</p>
          ) : (
            <motion.div {...scaleIn} className="space-y-4">
              <div className="bg-blue-900/30 p-4 rounded-lg">
                <h4 className="text-blue-300 font-semibold mb-2">
                  {t("results.targetAmount")}
                </h4>
                <p className="text-2xl font-bold text-blue-200">
                  ${calcResult.fiNumber.toLocaleString()}
                </p>
                <p className="text-blue-300 text-sm">
                  {t("results.basedOnExpenses", {
                    amount: calcResult.annualExpenses.toLocaleString(),
                  })}
                </p>
              </div>

              <div className="bg-green-900/30 p-4 rounded-lg">
                <h4 className="text-green-300 font-semibold mb-2">
                  {t("results.currentProgress")}
                </h4>
                <div className="mb-2">
                  <Progress value={calcResult.progressPct} className="mb-2" />
                </div>
                <p className="text-green-200">
                  ${calcResult.currentNetWorth.toLocaleString()} / $
                  {calcResult.fiNumber.toLocaleString()}
                </p>
                <p className="text-green-300 text-sm">
                  {calcResult.progressPct.toFixed(1)}% to FI
                </p>
              </div>

              <div className="bg-purple-900/30 p-4 rounded-lg">
                <h4 className="text-purple-300 font-semibold mb-2">
                  {t("results.projectedAtAge", {
                    age: calcResult.selectedFIAge,
                  })}
                </h4>
                <p className="text-2xl font-bold text-purple-200">
                  ${Math.round(calcResult.totalFutureValue).toLocaleString()}
                </p>
                <p className="text-purple-300 text-sm">
                  {t("results.monthlySavingsAmount", {
                    amount: calcResult.monthlySavings.toLocaleString(),
                  })}
                </p>
              </div>

              {calcResult.fiGap > 0 ? (
                <div className="bg-red-900/30 p-4 rounded-lg">
                  <h4 className="text-red-300 font-semibold mb-2">
                    {t("results.gapAnalysis")}
                  </h4>
                  <p className="text-red-200 mb-2">
                    {t("results.shortfall", {
                      amount: Math.round(calcResult.fiGap).toLocaleString(),
                    })}
                  </p>
                  <p className="text-red-300 text-sm">
                    {t("results.additionalNeeded", {
                      amount: Math.round(
                        calcResult.additionalMonthlySavingsNeeded
                      ).toLocaleString(),
                    })}
                  </p>
                </div>
              ) : (
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <h4 className="text-green-300 font-semibold mb-2">
                    {t("results.congratulations")}
                  </h4>
                  <p className="text-green-200">
                    {t("results.onTrack", { age: calcResult.selectedFIAge })}
                  </p>
                </div>
              )}
            </motion.div>
          )
        ) : (
          <p className="text-gray-400 text-sm">{t("results.noData")}</p>
        )}
      </motion.div>
    </motion.div>
  );
}
