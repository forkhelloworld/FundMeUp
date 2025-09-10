"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { fadeInLeft, fadeInRight, scaleIn } from "@/constants/animations";
import { useState } from "react";
import { fiCalculatorSchema } from "@/lib/validationSchemes";
import { toast } from "sonner";

export function FICalculator({
  onCurrentAgeChange,
  onViewportEnter,
}: {
  onCurrentAgeChange?: (age: number) => void;
  onViewportEnter?: () => void;
}) {
  const [currentAge, setCurrentAge] = useState(25);
  const [selectedFIAge, setSelectedFIAge] = useState(50);
  const [currentNetWorth, setCurrentNetWorth] = useState(10000);
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(4000);
  const [savingsRate, setSavingsRate] = useState(20);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [showFICalculation, setShowFICalculation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAll = () => {
    const result = fiCalculatorSchema.safeParse({
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

  const annualExpenses = monthlyExpenses * 12;
  const fiNumber = annualExpenses * 25;
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

  const fiGap = Math.max(0, fiNumber - totalFutureValue);
  const denom =
    monthlyReturn === 0
      ? totalMonths
      : (Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn;
  const additionalMonthlySavingsNeeded = fiGap > 0 ? fiGap / denom : 0;

  if (!onCurrentAgeChange) {
    onCurrentAgeChange = (age: number) => {
      setCurrentAge(age);
    };
  }

  return (
    <motion.div
      {...(onViewportEnter ? { onViewportEnter } : {})}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <motion.div
        {...fadeInLeft}
        className="bg-slate-800 p-6 rounded-lg border border-slate-700"
      >
        <h3 className="text-white font-semibold mb-4">Your Financial Plan</h3>

        <div className="space-y-4">
          <div>
            <label className="text-gray-300 block mb-2">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => {
                e.preventDefault();
                onCurrentAgeChange(Number(e.target.value));
                validateAll();
              }}
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
            <label className="text-gray-300 block mb-2">Target FI Age</label>
            <input
              type="number"
              value={selectedFIAge}
              onChange={(e) => {
                setSelectedFIAge(Number(e.target.value));
                validateAll();
              }}
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
              Current Net Worth
            </label>
            <input
              type="number"
              value={currentNetWorth}
              onChange={(e) => {
                setCurrentNetWorth(Number(e.target.value));
                validateAll();
              }}
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
            <label className="text-gray-300 block mb-2">Monthly Income</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => {
                setMonthlyIncome(Number(e.target.value));
                validateAll();
              }}
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
            <label className="text-gray-300 block mb-2">Monthly Expenses</label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => {
                setMonthlyExpenses(Number(e.target.value));
                validateAll();
              }}
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
              Expected Annual Return (%)
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
              Current Savings Rate: {savingsRate}%
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
          onClick={() => {
            if (validateAll()) {
              setShowFICalculation(true);
            } else {
              setShowFICalculation(false);
              toast.error("Please correct the highlighted fields", {
                description:
                  "Some inputs are invalid. Review errors and try again.",
              });
            }
          }}
          className="w-full bg-green-600 hover:bg-green-700 mt-6"
        >
          Calculate My Path to FI
        </Button>
      </motion.div>

      <motion.div
        {...fadeInRight}
        className="bg-slate-800 p-6 rounded-lg border border-slate-700"
      >
        <h3 className="text-white font-semibold mb-4">Your FI Analysis</h3>

        {showFICalculation && (
          <motion.div {...scaleIn} className="space-y-4">
            <div className="bg-blue-900/30 p-4 rounded-lg">
              <h4 className="text-blue-300 font-semibold mb-2">
                Your FI Number
              </h4>
              <p className="text-2xl font-bold text-blue-200">
                ${fiNumber.toLocaleString()}
              </p>
              <p className="text-blue-300 text-sm">
                Based on ${annualExpenses.toLocaleString()} annual expenses
              </p>
            </div>

            <div className="bg-green-900/30 p-4 rounded-lg">
              <h4 className="text-green-300 font-semibold mb-2">
                Current Progress
              </h4>
              <div className="mb-2">
                <Progress
                  value={Math.min(100, (currentNetWorth / fiNumber) * 100)}
                  className="mb-2"
                />
              </div>
              <p className="text-green-200">
                ${currentNetWorth.toLocaleString()} / $
                {fiNumber.toLocaleString()}
              </p>
              <p className="text-green-300 text-sm">
                {((currentNetWorth / fiNumber) * 100).toFixed(1)}% to FI
              </p>
            </div>

            <div className="bg-purple-900/30 p-4 rounded-lg">
              <h4 className="text-purple-300 font-semibold mb-2">
                Projected at Age {selectedFIAge}
              </h4>
              <p className="text-2xl font-bold text-purple-200">
                ${Math.round(totalFutureValue).toLocaleString()}
              </p>
              <p className="text-purple-300 text-sm">
                Monthly savings: ${monthlySavings.toLocaleString()}
              </p>
            </div>

            {fiGap > 0 ? (
              <div className="bg-red-900/30 p-4 rounded-lg">
                <h4 className="text-red-300 font-semibold mb-2">
                  Gap Analysis
                </h4>
                <p className="text-red-200 mb-2">
                  Shortfall: ${Math.round(fiGap).toLocaleString()}
                </p>
                <p className="text-red-300 text-sm">
                  Need additional $
                  {Math.round(additionalMonthlySavingsNeeded).toLocaleString()}
                  /month
                </p>
              </div>
            ) : (
              <div className="bg-green-900/30 p-4 rounded-lg">
                <h4 className="text-green-300 font-semibold mb-2">
                  🎉 Congratulations!
                </h4>
                <p className="text-green-200">
                  You&apos;re on track to achieve FI by age {selectedFIAge}!
                </p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
