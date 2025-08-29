"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PortfolioCalculator } from "@/components/lessons/PortfolioCalculator";

export default function DiversifiedPortfolioPage() {
  // Dynamic allocation calculations
  const domesticStocks = 50;
  const internationalStocks = 20;
  const domesticBonds = 20;
  const internationalBonds = 10;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            🌍 Build a Diversified Portfolio
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-4">
            Master the Art of Global Diversification with Four Core Holdings
          </p>
          <p className="text-lg text-gray-400">
            ITOT • VXUS • AGG • BNDX — Your foundation for long-term wealth
          </p>
        </div>

        {/* Why Diversification Matters */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🎯 Why Diversification is Your Best Friend
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-slate-800/50 border-slate-700 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-blue-300 mb-4">
                The Problem with Concentration
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>• Putting all money in one stock = huge risk</p>
                <p>• Even Apple fell 76% in 2000-2002</p>
                <p>• Single countries can underperform for decades</p>
                <p>• Bonds and stocks often move opposite directions</p>
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-green-300 mb-4">
                The Power of Diversification
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>• Spreads risk across thousands of companies</p>
                <p>• Captures global economic growth</p>
                <p>• Smooths out volatility over time</p>
                <p>• Ensures you never miss the next big winner</p>
              </div>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700 p-6">
            <h3 className="text-xl font-semibold text-center mb-4">
              📊 Historical Evidence
            </h3>
            <p className="text-center text-gray-300">
              A globally diversified portfolio has never had a negative 20-year
              return in modern history, while individual stocks and sectors can
              go to zero.
            </p>
          </Card>
        </section>

        {/* The Four-Fund Foundation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🏗️ The Four-Fund Foundation
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Domestic Stocks */}
            <Card className="bg-blue-900/20 border-blue-700 p-6 hover:bg-blue-900/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-blue-300">
                  🇺🇸 ITOT - US Total Market
                </h3>
                <span className="text-2xl font-bold text-blue-400">
                  {domesticStocks}%
                </span>
              </div>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  <strong>What it holds:</strong> 3,000+ US companies (Apple,
                  Microsoft, Amazon, etc.)
                </p>
                <p>
                  <strong>Why this fund:</strong> Broadest US coverage,
                  ultra-low 0.03% fee
                </p>
                <p>
                  <strong>Role:</strong> Core holding for developed market
                  stability and growth
                </p>
                <div className="bg-blue-900/40 p-3 rounded mt-4">
                  <p className="text-blue-200">
                    <strong>Alternatives:</strong>
                  </p>
                  <p>
                    • VTI (Vanguard) - 0.03% fee, slightly different weighting
                  </p>
                  <p>• SWTSX (Schwab) - 0.03% fee, mutual fund version</p>
                </div>
              </div>
            </Card>

            {/* International Stocks */}
            <Card className="bg-green-900/20 border-green-700 p-6 hover:bg-green-900/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-green-300">
                  🌍 VXUS - International Stocks
                </h3>
                <span className="text-2xl font-bold text-green-400">
                  {internationalStocks}%
                </span>
              </div>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  <strong>What it holds:</strong> 7,000+ non-US companies
                  (Nestlé, Samsung, TSMC)
                </p>
                <p>
                  <strong>Why this fund:</strong> Developed + emerging markets,
                  0.08% fee
                </p>
                <p>
                  <strong>Role:</strong> Hedges against US-only risk, captures
                  global growth
                </p>
                <div className="bg-green-900/40 p-3 rounded mt-4">
                  <p className="text-green-200">
                    <strong>Alternatives:</strong>
                  </p>
                  <p>• FTIHX (Fidelity) - 0.06% fee, similar coverage</p>
                  <p>• SWISX (Schwab) - 0.06% fee, international focus</p>
                </div>
              </div>
            </Card>

            {/* US Bonds */}
            <Card className="bg-yellow-900/20 border-yellow-700 p-6 hover:bg-yellow-900/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-yellow-300">
                  🏛️ AGG - US Total Bond Market
                </h3>
                <span className="text-2xl font-bold text-yellow-400">
                  {domesticBonds}%
                </span>
              </div>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  <strong>What it holds:</strong> 10,000+ US government &
                  corporate bonds
                </p>
                <p>
                  <strong>Why this fund:</strong> Broad bond exposure, 0.03%
                  fee, high quality
                </p>
                <p>
                  <strong>Role:</strong> Stability during stock market crashes,
                  income generation
                </p>
                <div className="bg-yellow-900/40 p-3 rounded mt-4">
                  <p className="text-yellow-200">
                    <strong>Alternatives:</strong>
                  </p>
                  <p>• BND (Vanguard) - 0.03% fee, nearly identical holdings</p>
                  <p>• SWAGX (Schwab) - 0.04% fee, similar strategy</p>
                </div>
              </div>
            </Card>

            {/* International Bonds */}
            <Card className="bg-purple-900/20 border-purple-700 p-6 hover:bg-purple-900/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-purple-300">
                  🌐 BNDX - International Bonds
                </h3>
                <span className="text-2xl font-bold text-purple-400">
                  {internationalBonds}%
                </span>
              </div>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  <strong>What it holds:</strong> Government bonds from
                  developed countries
                </p>
                <p>
                  <strong>Why this fund:</strong> Currency diversification,
                  0.07% fee
                </p>
                <p>
                  <strong>Role:</strong> Hedges US dollar risk, international
                  stability
                </p>
                <div className="bg-purple-900/40 p-3 rounded mt-4">
                  <p className="text-purple-200">
                    <strong>Alternatives:</strong>
                  </p>
                  <p>• Skip it: Many experts suggest US bonds only</p>
                  <p>• VTEB (Vanguard Tax-Exempt) if in high tax bracket</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Portfolio Calculator */}
        <PortfolioCalculator />

        {/* Alternative Approaches */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            🎨 Alternative Portfolio Approaches
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                🎯 Three-Fund Portfolio
              </h3>
              <div className="text-sm text-gray-300 space-y-2 mb-4">
                <p>• Skip international bonds (BNDX)</p>
                <p>• 70% ITOT, 20% VXUS, 10% AGG</p>
                <p>• Simpler, still well-diversified</p>
                <p>• Most popular approach</p>
              </div>
              <div className="text-xs text-gray-400 bg-slate-700 p-2 rounded">
                Perfect for beginners who want simplicity
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-green-300 mb-3">
                🚀 Growth-Focused
              </h3>
              <div className="text-sm text-gray-300 space-y-2 mb-4">
                <p>• Add VUG (growth) or VTV (value)</p>
                <p>• Include VNQ (REITs) for real estate</p>
                <p>• Higher risk, higher potential return</p>
                <p>• More complex rebalancing</p>
              </div>
              <div className="text-xs text-gray-400 bg-slate-700 p-2 rounded">
                For investors wanting more control
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">
                🛡️ Target-Date Fund
              </h3>
              <div className="text-sm text-gray-300 space-y-2 mb-4">
                <p>• One fund does everything</p>
                <p>• Automatically rebalances</p>
                <p>• Becomes conservative with age</p>
                <p>• Slightly higher fees (0.10-0.15%)</p>
              </div>
              <div className="text-xs text-gray-400 bg-slate-700 p-2 rounded">
                Set-and-forget approach
              </div>
            </Card>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            📋 Step-by-Step Implementation
          </h2>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Choose Your Brokerage",
                content:
                  "Fidelity, Vanguard, or Schwab all offer commission-free ETF trades. Pick one and open a Roth IRA or taxable account.",
                color: "blue",
              },
              {
                step: 2,
                title: "Fund Your Account",
                content:
                  "Set up automatic monthly transfers from your bank. Start with whatever you can afford - even $50/month builds wealth over time.",
                color: "green",
              },
              {
                step: 3,
                title: "Buy Your First Shares",
                content:
                  "Purchase ITOT, VXUS, AGG, and BNDX according to your target allocation. Many brokers offer fractional shares.",
                color: "yellow",
              },
              {
                step: 4,
                title: "Automate Everything",
                content:
                  "Set up automatic investing to buy these four funds monthly. This removes emotion and timing mistakes from the equation.",
                color: "purple",
              },
              {
                step: 5,
                title: "Rebalance Annually",
                content:
                  "Once per year, check if any fund is more than 5% off target. Sell the overweight, buy the underweight.",
                color: "red",
              },
            ].map((step) => (
              <Card
                key={step.step}
                className={`bg-${step.color}-900/20 border-${step.color}-700 p-6`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`bg-${step.color}-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold`}
                  >
                    {step.step}
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold text-${step.color}-300 mb-2`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-300">{step.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            ⚠️ Common Beginner Mistakes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                mistake: "Trying to Time the Market",
                solution:
                  "Invest consistently regardless of market conditions. Time in market beats timing the market.",
                icon: "⏰",
              },
              {
                mistake: "Chasing Hot Stocks",
                solution:
                  "Stick to your diversified plan. Individual stocks are gambling, not investing.",
                icon: "📈",
              },
              {
                mistake: "Ignoring International Exposure",
                solution:
                  "The US is only 54% of world market cap. Don't miss global opportunities.",
                icon: "🌍",
              },
              {
                mistake: "Checking Too Often",
                solution:
                  "Review quarterly at most. Daily checking leads to emotional decisions.",
                icon: "📱",
              },
              {
                mistake: "Not Rebalancing",
                solution:
                  "Annual rebalancing forces you to sell high and buy low automatically.",
                icon: "⚖️",
              },
              {
                mistake: "Paying High Fees",
                solution:
                  "Keep expense ratios under 0.10%. High fees compound against you forever.",
                icon: "💰",
              },
            ].map((item, i) => (
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
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-blue-900/40 to-green-900/40 border-blue-700 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            🎯 Start Your Journey Today
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            A diversified portfolio with ITOT, VXUS, AGG, and BNDX gives you
            exposure to:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
            <div className="bg-slate-800/50 p-3 rounded">
              3,000+ US companies
            </div>
            <div className="bg-slate-800/50 p-3 rounded">
              7,000+ international companies
            </div>
            <div className="bg-slate-800/50 p-3 rounded">10,000+ US bonds</div>
            <div className="bg-slate-800/50 p-3 rounded">
              Global government bonds
            </div>
          </div>
          <p className="text-gray-300 mb-6">
            Total portfolio cost: Under 0.06% annually. That&lsquo;s less than
            $6 per year on every $10,000 invested.
          </p>
          <Button
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Building Your Portfolio
          </Button>
        </Card>
      </div>
    </div>
  );
}
