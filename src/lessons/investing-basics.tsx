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
  rotateIn,
  scaleIn,
  slideInFromBottom,
} from "@/constants/animations";
import { useLessonState } from "@/hooks/useLessonState";
import { motion } from "framer-motion";

export default function InvestingBasicsPage() {
  const { state, actions } = useLessonState();

  // Calculations
  const stockPercentage = Math.max(20, Math.min(90, 110 - state.age));
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
    if (state.age < 30) score += 3;
    else if (state.age < 50) score += 2;
    else score += 1;

    if (state.timeHorizon > 20) score += 3;
    else if (state.timeHorizon > 10) score += 2;
    else score += 1;

    if (state.riskTolerance === "aggressive") score += 3;
    else if (state.riskTolerance === "moderate") score += 2;
    else score += 1;

    if (score >= 8) actions.setRiskProfile("Aggressive");
    else if (score >= 5) actions.setRiskProfile("Moderate");
    else actions.setRiskProfile("Conservative");

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
            📈 <span className="text-green-400">Investing Basics</span>
          </>
        }
        subtitle="Your Complete Guide to Making Your Money Work for You"
        description={
          "You now understand WHY you need to invest and WHAT you&lsquo;re investing for. Now comes the exciting part: HOW to actually make your money grow."
        }
      />

      {/* From Goals to Action */}
      <LessonSection
        title="🎯 From Goals to Action: Making the Connection"
        animationVariant={fadeInLeft}
        onViewportEnter={() => handleProgress(2)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          Think of investing like planting a garden. You wouldn&lsquo;t throw
          seeds randomly in the dirt and hope for the best. You&lsquo;d choose
          the right seeds (investments) for your climate (risk tolerance), plant
          them in good soil (diversified portfolio), water them regularly
          (consistent contributions), and give them time to grow.
        </p>

        <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
          <p className="text-green-200 font-semibold text-center">
            Today, you become a money gardener.
          </p>
        </div>
      </LessonSection>

      {/* Investment Universe */}
      <LessonSection
        title="🏗️ The Investment Universe: Your Options Explained"
        animationVariant={fadeInRight}
        onViewportEnter={() => handleProgress(3)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              icon: "🏢",
              title: "Stocks (Equities)",
              color: "blue",
              what: "You buy a tiny piece of ownership in a company",
              how: "Company grows in value, stock price goes up + dividends",
              risk: "Medium to High",
              time: "3+ years ideally",
              example:
                "You buy Apple stock for $150. If Apple does well and the stock rises to $180, you made $30 per share. If Apple struggles, it might drop to $120, and you'd lose $30 per share.",
            },
            {
              icon: "🏛️",
              title: "Bonds (Fixed Income)",
              color: "green",
              what: "You loan money to a government or company",
              how: "They pay you interest regularly, then return your principal",
              risk: "Low to Medium",
              time: "1-30 years depending on bond type",
              example:
                "You buy a $1,000 government bond paying 4% annually for 10 years. You'll receive $40 per year for 10 years, then get your $1,000 back.",
            },
            {
              icon: "🧺",
              title: "Mutual Funds",
              color: "purple",
              what: "A basket containing many stocks, bonds, or both",
              how: "The fund's investments grow in value",
              risk: "Varies based on fund contents",
              time: "Varies, typically 3+ years",
              example:
                "Instead of picking individual stocks, you buy shares in a fund that owns 500 different companies. If those companies do well on average, your fund value increases.",
            },
            {
              icon: "📦",
              title: "Exchange-Traded Funds (ETFs)",
              color: "orange",
              what: "Like mutual funds but trade like stocks throughout the day",
              how: "Same as mutual funds but often with lower fees",
              risk: "Varies based on fund contents",
              time: "3+ years typically",
              example:
                "An S&P 500 ETF owns all 500 companies in that index. When you buy shares, you own a tiny piece of America's biggest companies.",
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
                <strong>What it is:</strong> {investment.what}
              </p>
              <p className="text-gray-300 text-sm mb-3">
                <strong>How you make money:</strong> {investment.how}
              </p>
              <p className="text-gray-300 text-sm mb-3">
                <strong>Risk level:</strong> {investment.risk}
              </p>
              <p className="text-gray-300 text-sm mb-3">
                <strong>Time horizon:</strong> {investment.time}
              </p>
              <div className={`bg-${investment.color}-900/40 p-3 rounded-lg`}>
                <p className={`text-${investment.color}-200 text-sm`}>
                  <strong>Example:</strong> {investment.example}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </LessonSection>

      {/* Risk vs Return */}
      <LessonSection
        title="⚖️ Risk vs. Return: The Golden Rule of Investing"
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(4)}
      >
        <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-700 mb-6">
          <p className="text-yellow-200 font-semibold text-center">
            The fundamental truth: Higher potential returns come with higher
            risk. There&lsquo;s no free lunch in investing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              risk: "Lowest Risk/Lowest Return",
              examples: [
                "Savings accounts: ~0.5% annually",
                "Government bonds: ~2-4% annually",
              ],
              color: "green",
            },
            {
              risk: "Medium Risk/Medium Return",
              examples: [
                "Corporate bonds: ~3-6% annually",
                "Balanced funds: ~4-8% annually",
              ],
              color: "yellow",
            },
            {
              risk: "Higher Risk/Higher Return",
              examples: [
                "Stock market: ~6-10% annually",
                "Growth stocks: Can be much higher or lower",
              ],
              color: "orange",
            },
            {
              risk: "Highest Risk/Highest Return",
              examples: [
                "Individual growth stocks: -50% to +500%",
                "Cryptocurrency: Extremely volatile",
              ],
              color: "red",
            },
          ].map((level, index) => (
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
                {level.examples.map((example, i) => (
                  <li key={i}>• {example}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeInLeft}
          className="bg-blue-900/20 p-4 rounded-lg border border-blue-700"
        >
          <h4 className="text-blue-300 font-semibold mb-3">
            Your Personal Risk Tolerance
          </h4>
          <p className="text-gray-300 text-sm mb-3">Ask yourself:</p>
          <ol className="text-gray-300 text-sm space-y-2">
            <li>
              1. <strong>Time horizon:</strong> How long until you need this
              money?
            </li>
            <li>
              2. <strong>Sleep test:</strong> Would a 20% portfolio drop keep
              you awake at night?
            </li>
            <li>
              3. <strong>Recovery ability:</strong> Can you make up losses with
              future earnings?
            </li>
            <li>
              4. <strong>Experience:</strong> Are you comfortable with market
              volatility?
            </li>
          </ol>
        </motion.div>
      </LessonSection>

      {/* Risk Tolerance Quiz */}
      <LessonSection
        title="🧠 Risk Tolerance Quiz"
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(5)}
      >
        <div className="space-y-6">
          <div>
            <label className="text-white font-semibold">
              What&lsquo;s your age?
            </label>
            <input
              type="number"
              value={state.age}
              onChange={(e) =>
                actions.updateInput("age", Number(e.target.value))
              }
              className="w-full bg-slate-800 border-slate-700 text-white mt-2 p-2 rounded border"
            />
          </div>

          <div>
            <label className="text-white font-semibold">
              What&lsquo;s your time horizon for this money?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              {[
                { value: 5, label: "5 years" },
                { value: 10, label: "10 years" },
                { value: 20, label: "20+ years" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    actions.updateInput("timeHorizon", option.value)
                  }
                  className={`p-3 rounded-lg border transition-colors ${
                    state.timeHorizon === option.value
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
              How would you describe your risk tolerance?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              {[
                { value: "conservative", label: "Conservative" },
                { value: "moderate", label: "Moderate" },
                { value: "aggressive", label: "Aggressive" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    actions.updateInput("riskTolerance", option.value)
                  }
                  className={`p-3 rounded-lg border transition-colors ${
                    state.riskTolerance === option.value
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
          Calculate My Risk Profile
        </Button>

        {state.showRiskResult && (
          <motion.div
            {...scaleIn}
            className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-700"
          >
            <p className="text-blue-200 text-center mb-2">
              <strong>Your Risk Profile: {state.riskProfile}</strong>
            </p>
            <p className="text-blue-300 text-sm text-center">
              Based on your age ({state.age}), time horizon ({state.timeHorizon}{" "}
              years), and risk tolerance ({state.riskTolerance}).
            </p>
          </motion.div>
        )}
      </LessonSection>

      {/* Asset Allocation Calculator */}
      <LessonSection
        title="🧮 Asset Allocation Calculator"
        animationVariant={fadeInRight}
        onViewportEnter={() => handleProgress(6)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            {...fadeInLeft}
            className="bg-green-900/20 p-4 rounded-lg border border-green-700"
          >
            <h3 className="text-green-300 font-semibold mb-4">Your Profile</h3>
            <div className="space-y-3">
              {[
                {
                  id: "calcAge",
                  label: "Age",
                  key: "age" as keyof typeof state,
                },
                {
                  id: "calcSavings",
                  label: "Current savings",
                  key: "currentSavings" as keyof typeof state,
                },
                {
                  id: "calcContribution",
                  label: "Monthly contribution",
                  key: "monthlyContribution" as keyof typeof state,
                },
              ].map((input) => (
                <div key={input.id}>
                  <label htmlFor={input.id} className="text-green-200">
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
              onClick={() => actions.toggleVisibility("showAllocationResult")}
              className="w-full bg-green-600 hover:bg-green-700 mt-4"
            >
              Calculate Asset Allocation
            </Button>
          </motion.div>

          {state.showAllocationResult && (
            <motion.div
              {...fadeInRight}
              className="bg-blue-900/20 p-4 rounded-lg border border-blue-700"
            >
              <h3 className="text-blue-300 font-semibold mb-4">
                Recommended Allocation
              </h3>
              <div className="space-y-4">
                {[
                  {
                    name: "Stocks",
                    percentage: stockPercentage,
                    color: "blue",
                  },
                  {
                    name: "Bonds",
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
                    <strong>Formula:</strong> Stock percentage = 110 - your age
                  </p>
                  <p className="text-yellow-200 text-sm">
                    <strong>Your age {state.age}:</strong> {110 - state.age}%
                    stocks, {100 - (110 - state.age)}% bonds
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </LessonSection>

      {/* Dollar-Cost Averaging Simulator */}
      <LessonSection
        title="🚀 Dollar-Cost Averaging: Your Secret Weapon"
        animationVariant={rotateIn}
        onViewportEnter={() => handleProgress(7)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          <strong>Dollar-Cost Averaging (DCA)</strong> means investing the same
          amount of money at regular intervals, regardless of market conditions.
        </p>

        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700 mb-6">
          <h4 className="text-purple-300 font-semibold mb-3">DCA Simulator</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              {
                id: "dcaAmount",
                label: "Monthly investment amount",
                key: "dcaAmount" as keyof typeof state,
              },
              {
                id: "dcaMonths",
                label: "Number of months",
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
            Run DCA Simulation
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
                    label: "Total shares bought",
                    value: totalShares.toFixed(1),
                  },
                  {
                    label: "Total invested",
                    value: `$${totalInvested.toLocaleString()}`,
                  },
                  {
                    label: "Average price per share",
                    value: `$${averagePrice.toFixed(2)}`,
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
                <strong>Why DCA Works:</strong> You bought more shares when
                prices were low ($80) and fewer when prices were high ($120),
                resulting in a lower average cost per share than if you had
                invested all at once.
              </p>
            </div>
          </motion.div>
        )}
      </LessonSection>

      {/* Investment Strategy Builder */}
      <LessonSection
        title="🛠️ Building Your First Investment Strategy"
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(8)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Option A - Simple Three-Fund Portfolio",
              color: "blue",
              items: [
                "70% Total Stock Market Index Fund (like VTI)",
                "20% International Stock Index Fund (like VTIAX)",
                "10% Bond Index Fund (like BND)",
              ],
              bestFor: "Hands-on investors who want control",
            },
            {
              title: "Option B - Target-Date Fund",
              color: "green",
              items: [
                "One fund that automatically adjusts",
                "Based on your retirement date",
                "Gets more conservative as you age",
                'Example: "2055 Target Date Fund"',
              ],
              bestFor: "Set-it-and-forget-it investors",
            },
            {
              title: "Option C - Robo-Advisor",
              color: "purple",
              items: [
                "Automated investing service",
                "Builds portfolio for you",
                "Examples: Betterment, Wealthfront",
                "Handles rebalancing automatically",
              ],
              bestFor: "Beginners who want guidance",
            },
          ].map((option, index) => (
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
                {option.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
              <div className={`bg-${option.color}-900/40 p-3 rounded-lg mt-3`}>
                <p className={`text-${option.color}-200 text-sm`}>
                  <strong>Best for:</strong> {option.bestFor}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </LessonSection>

      {/* Common Mistakes */}
      <LessonSection
        title="⚠️ Common Beginner Mistakes to Avoid"
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(9)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              mistake: "Trying to Time the Market",
              problem: 'Waiting for the "perfect" time to invest',
              solution: "Start now with dollar-cost averaging",
            },
            {
              mistake: "Picking Individual Stocks",
              problem: "Most professionals can't beat the market consistently",
              solution: "Start with diversified index funds",
            },
            {
              mistake: "Checking Your Account Daily",
              problem: "Short-term volatility causes panic decisions",
              solution: "Check monthly or quarterly at most",
            },
            {
              mistake: "Not Having an Emergency Fund First",
              problem: "You might need to sell investments at a loss",
              solution: "Build 3-6 months expenses in cash first",
            },
            {
              mistake: "Chasing Hot Trends",
              problem: "By the time you hear about it, it's often too late",
              solution: "Stick to boring, diversified investments",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              {...fadeInLeft}
              transition={{ delay: index * 0.1 }}
              className="bg-red-900/20 p-4 rounded-lg border border-red-700"
            >
              <h4 className="text-red-300 font-semibold mb-3">
                Mistake #{index + 1}: {item.mistake}
              </h4>
              <div className="space-y-2">
                <p className="text-red-200 text-sm">
                  <strong>Problem:</strong> {item.problem}
                </p>
                <p className="text-green-200 text-sm">
                  <strong>Solution:</strong> {item.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </LessonSection>

      {/* Knowledge Check Quiz */}
      <LessonSection
        title="🧠 Knowledge Check Quiz"
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(10)}
      >
        <Quiz
          question="What's the most important factor in determining your asset allocation?"
          options={[
            { id: "a", text: "Your current income level" },
            { id: "b", text: "Your age and time horizon" },
            { id: "c", text: "How much money you have to invest" },
            { id: "d", text: "What your friends are investing in" },
          ]}
          selectedAnswer={state.quizAnswer}
          onAnswerSelect={actions.setQuizAnswer}
          onCheckAnswer={() => actions.toggleVisibility("showQuizResult")}
          showResult={state.showQuizResult}
          correctAnswer="B) Your age and time horizon"
          explanation="Your age and time horizon are the most important factors because they determine how much risk you can afford to take. Younger investors can handle more risk because they have time to recover from market downturns."
        />
      </LessonSection>

      {/* Key Takeaways */}
      <LessonSection
        title="🎉 Key Takeaways"
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(11)}
      >
        <KeyTakeaways
          animationVariant={fadeInLeft}
          onViewportEnter={() => {}}
          items={[
            "Start simple - Index funds and ETFs are perfect for beginners",
            "Diversify broadly - Don't put all money in one investment",
            "Match risk to timeline - Longer goals can handle more risk",
            "Automate everything - Remove emotions from the equation",
            "Stay the course - Time in the market beats timing the market",
            "Keep costs low - Fees compound against you over time",
            "Think decades, not days - Successful investing is boring",
          ]}
        />
      </LessonSection>

      {/* Next Steps */}
      <NextStepsCard
        animationVariant={bounceIn}
        onViewportEnter={() => handleProgress(12)}
        description={
          "Now that you understand the basics of investing, our next lesson will teach you how to actually build your first portfolio. You&lsquo;ll learn specific fund recommendations, how to allocate your money, and how to put together a complete investment plan that matches your goals."
        }
        progressValue={75}
        lessonLabel={`Lesson 3 of 4 — ${
          state.lessonProgress === 100
            ? "Complete! You've mastered investing basics."
            : "Keep exploring to complete this lesson."
        }`}
        completeMessage={
          state.lessonProgress === 100
            ? "Remember: The best investment strategy is the one you can stick with. Don&lsquo;t let perfect be the enemy of good – start investing today, even if it&lsquo;s not perfect."
            : undefined
        }
      />
    </div>
  );
}
