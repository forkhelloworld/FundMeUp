"use client";
import { useState } from "react";
import { Card } from "../ui/card";

const allocations = {
  conservative: { stocks: 40, bonds: 60, domestic: 70, international: 30 },
  moderate: { stocks: 60, bonds: 40, domestic: 70, international: 30 },
  aggressive: { stocks: 80, bonds: 20, domestic: 65, international: 35 },
} as const;

export function PortfolioCalculator() {
  const [age, setAge] = useState(30);
  const [timeHorizon, setTimeHorizon] = useState(20);
  const [riskTolerance, setRiskTolerance] = useState("moderate");
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const currentAlloc = allocations[riskTolerance as keyof typeof allocations];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        🧮 Build Your Personal Allocation
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Your Profile
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Age: {age}
              </label>
              <input
                type="range"
                min="18"
                max="65"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Years to Retirement: {timeHorizon}
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
                Risk Tolerance
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
                    {risk.charAt(0).toUpperCase() + risk.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Monthly Investment
              </label>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full p-2 bg-slate-900 border border-slate-600 rounded text-white"
                placeholder="500"
              />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-green-900/30 border-blue-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Your Recommended Portfolio
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-900/40 p-4 rounded-lg text-center">
                <p className="text-blue-300 text-sm">ITOT (US Stocks)</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    (currentAlloc.stocks * currentAlloc.domestic) / 100
                  )}
                  %
                </p>
              </div>
              <div className="bg-green-900/40 p-4 rounded-lg text-center">
                <p className="text-green-300 text-sm">VXUS (Intl Stocks)</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    (currentAlloc.stocks * currentAlloc.international) / 100
                  )}
                  %
                </p>
              </div>
              <div className="bg-yellow-900/40 p-4 rounded-lg text-center">
                <p className="text-yellow-300 text-sm">AGG (US Bonds)</p>
                <p className="text-2xl font-bold">
                  {Math.round(currentAlloc.bonds * 0.8)}%
                </p>
              </div>
              <div className="bg-purple-900/40 p-4 rounded-lg text-center">
                <p className="text-purple-300 text-sm">BNDX (Intl Bonds)</p>
                <p className="text-2xl font-bold">
                  {Math.round(currentAlloc.bonds * 0.2)}%
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">
                Monthly Investment Breakdown
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
