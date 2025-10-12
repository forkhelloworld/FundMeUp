"use client";
import { useState } from "react";
import { Card } from "../ui/card";
import { useUserProfileStore } from "@/lib/userProfile-store";
import { useTranslations } from "next-intl";

const allocations = {
  conservative: { stocks: 40, bonds: 60, domestic: 70, international: 30 },
  moderate: { stocks: 60, bonds: 40, domestic: 70, international: 30 },
  aggressive: { stocks: 80, bonds: 20, domestic: 65, international: 35 },
} as const;

export function PortfolioCalculator() {
  const t = useTranslations(
    "lessons.calculators.portfolioCalculator.personalAllocation"
  );
  const { currentAge, monthlyIncome, monthlyExpenses, setUserProfileData } =
    useUserProfileStore();
  const monthlyInvestment = monthlyIncome - monthlyExpenses;
  const [timeHorizon, setTimeHorizon] = useState(20);
  const [riskTolerance, setRiskTolerance] = useState("moderate");
  const currentAlloc = allocations[riskTolerance as keyof typeof allocations];

  const handleAgeChange = (newAge: number) => {
    setUserProfileData({
      ...useUserProfileStore.getState(),
      currentAge: newAge,
    });
  };

  const handleMonthlyInvestmentChange = (newInvestment: number) => {
    const newMonthlyIncome = newInvestment + monthlyExpenses;
    setUserProfileData({
      ...useUserProfileStore.getState(),
      monthlyIncome: newMonthlyIncome,
    });
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">{t("title")}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">
            {t("profile.title")}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("profile.age", { age: currentAge })}
              </label>
              <input
                type="range"
                min="18"
                max="65"
                value={currentAge}
                onChange={(e) => handleAgeChange(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("profile.yearsToRetirement", { years: timeHorizon })}
              </label>
              <input
                type="range"
                min="5"
                max="45"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("profile.riskTolerance")}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["conservative", "moderate", "aggressive"].map((risk) => (
                  <button
                    key={risk}
                    onClick={() => setRiskTolerance(risk)}
                    className={`p-2 rounded text-sm transition-all ${
                      riskTolerance === risk
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                  >
                    {t(`profile.riskToleranceOptions.${risk}`)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("profile.monthlyInvestment")}
              </label>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) =>
                  handleMonthlyInvestmentChange(Number(e.target.value))
                }
                className="w-full p-2 bg-slate-900 border border-slate-600 rounded text-white"
                placeholder="500"
              />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-green-900/30 border-blue-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">
            {t("recommendedPortfolio.title")}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-900/40 p-4 rounded-lg text-center">
                <p className="text-blue-300 text-sm">
                  {t("recommendedPortfolio.itot")}
                </p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    (currentAlloc.stocks * currentAlloc.domestic) / 100
                  )}
                  %
                </p>
              </div>
              <div className="bg-green-900/40 p-4 rounded-lg text-center">
                <p className="text-green-300 text-sm">
                  {t("recommendedPortfolio.vxus")}
                </p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    (currentAlloc.stocks * currentAlloc.international) / 100
                  )}
                  %
                </p>
              </div>
              <div className="bg-yellow-900/40 p-4 rounded-lg text-center">
                <p className="text-yellow-300 text-sm">
                  {t("recommendedPortfolio.agg")}
                </p>
                <p className="text-2xl font-bold">
                  {Math.round(currentAlloc.bonds * 0.8)}%
                </p>
              </div>
              <div className="bg-purple-900/40 p-4 rounded-lg text-center">
                <p className="text-purple-300 text-sm">
                  {t("recommendedPortfolio.bndx")}
                </p>
                <p className="text-2xl font-bold">
                  {Math.round(currentAlloc.bonds * 0.2)}%
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">
                {t("recommendedPortfolio.monthlyBreakdown")}
              </h4>
              <div className="text-sm space-y-1 text-gray-300">
                <p>
                  ITOT: $
                  {Math.round(
                    (monthlyInvestment *
                      currentAlloc.stocks *
                      currentAlloc.domestic) /
                      10000
                  )}
                </p>
                <p>
                  VXUS: $
                  {Math.round(
                    (monthlyInvestment *
                      currentAlloc.stocks *
                      currentAlloc.international) /
                      10000
                  )}
                </p>
                <p>
                  AGG: $
                  {Math.round(
                    (monthlyInvestment * currentAlloc.bonds * 0.8) / 100
                  )}
                </p>
                <p>
                  BNDX: $
                  {Math.round(
                    (monthlyInvestment * currentAlloc.bonds * 0.2) / 100
                  )}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
