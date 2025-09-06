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

export default function LessonPage() {
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
        title={
          <>
            💰 Why You Need to <span className="text-green-400">Invest</span>
          </>
        }
        subtitle="Your Journey to Financial Freedom Starts Here"
        description="You don&lsquo;t need to be rich to start investing. But if you never start, it will be much harder to ever get rich."
      />

      {/* Reality Check Section */}
      <LessonSection
        title="🤔 Let&lsquo;s Start with a Reality Check"
        animationVariant={fadeInLeft}
        onViewportEnter={() => handleProgress(2)}
      >
        <p className="text-gray-300 leading-relaxed mb-4 md:mb-6">
          Imagine you have $10,000 sitting in your savings account earning 0.5%
          interest. Now imagine your friend invested the same amount and earned
          7% annually. What happens after 20 years?
        </p>

        {!state.showRealityCheck ? (
          <Button
            onClick={() => actions.toggleVisibility("showRealityCheck")}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm md:text-base leading-snug whitespace-normal break-words px-3 py-3"
          >
            Click to see what happens to $10,000 over 20 years
          </Button>
        ) : (
          <motion.div {...scaleIn} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                <p className="text-blue-300 text-sm">Your savings account</p>
                <p className="text-2xl font-bold text-blue-400">$11,049</p>
              </div>
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
                <p className="text-green-300 text-sm">
                  Your friend&lsquo;s investment
                </p>
                <p className="text-2xl font-bold text-green-400">$38,697</p>
              </div>
              <div className="bg-red-900/30 p-4 rounded-lg border border-red-700">
                <p className="text-red-300 text-sm">Money left on table</p>
                <p className="text-2xl font-bold text-red-400">$27,648</p>
              </div>
            </div>
            <p className="text-gray-300 text-center text-sm md:text-base">
              That&lsquo;s enough to buy a car, pay for a wedding, or fund a
              year of living expenses! This is why every financial expert says
              the same thing:{" "}
              <strong>time in the market beats timing the market.</strong>
            </p>
          </motion.div>
        )}
      </LessonSection>

      {/* Inflation Section */}
      <LessonSection
        title="🏃‍♀️ The Silent Wealth Killer: Inflation"
        animationVariant={fadeInRight}
        onViewportEnter={() => handleProgress(3)}
      >
        <p className="text-gray-300 leading-relaxed mb-4 md:mb-6">
          Here&lsquo;s something your bank won&lsquo;t tell you: inflation is
          quietly stealing your money every single day.
        </p>

        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-red-200 text-sm md:text-base">
            With average inflation at 3% annually, money that sits in cash loses
            purchasing power over time. For example, $10,000 today would only
            buy about $7,400 worth of goods in 10 years if prices rise ~3% per
            year.
          </p>
          <p className="text-red-300 mt-2 text-sm md:text-base">
            This is why investing matters: your money needs to grow just to
            maintain its value.
          </p>
        </div>

        <div className="bg-red-900/30 p-4 rounded-lg border border-red-700 mt-4 md:mt-6">
          <p className="text-red-200 font-semibold text-center text-sm md:text-base">
            The brutal truth: If you&lsquo;re not investing, you&lsquo;re
            actually losing money every year.
          </p>
        </div>
      </LessonSection>

      {/* Three Pillars Section */}
      <LessonSection
        title="🎯 The Three Pillars of Why You Must Invest"
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(4)}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              title: "1. Beat Inflation (Survival Mode)",
              color: "red",
              description:
                "If you're not investing, you're actually losing money every year. With average inflation at 3%, your $1,000 today will only buy $744 worth of goods in 10 years. Your money needs to grow just to maintain its value.",
            },
            {
              title: "2. Build Wealth (Growth Mode)",
              color: "blue",
              description:
                "The stock market has historically returned about 10% annually over the long term. That means your money can double approximately every 7 years through compound growth. Einstein allegedly called compound interest 'the eighth wonder of the world' – and for good reason.",
            },
            {
              title: "3. Achieve Financial Freedom (Freedom Mode)",
              color: "green",
              description:
                "Investing isn't just about money—it's about buying back your time. When your investments generate enough income to cover your expenses, you work because you want to, not because you have to. This is the ultimate goal: financial independence.",
            },
          ].map((pillar, index) => (
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
          ))}
        </div>
      </LessonSection>

      {/* Myths Section */}
      <LessonSection
        title="💡 Common Investment Myths (Busted!)"
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(5)}
      >
        <div className="space-y-4 md:space-y-6">
          {[
            {
              myth: "I don't have enough money to start investing",
              reality:
                "You can start investing with as little as $1. Many brokerages now offer fractional shares, meaning you can own a piece of expensive stocks like Amazon or Tesla with just a few dollars.",
            },
            {
              myth: "Investing is too risky",
              reality:
                "Not investing is riskier. Inflation guarantees you'll lose purchasing power. While investments can fluctuate, historically they've been the best way to grow wealth over time.",
            },
            {
              myth: "I need to be a financial expert",
              reality:
                "You need basic knowledge, not a finance degree. Index funds allow you to invest in hundreds of companies with zero stock-picking skills required.",
            },
            {
              myth: "I'll start investing when I'm older and make more money",
              reality:
                "Starting early is your biggest advantage. A 25-year-old investing $200/month until retirement will likely have more money than a 35-year-old investing $400/month, thanks to compound interest.",
            },
          ].map((item, index) => (
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
        title="📊 The Power of Starting Early"
        animationVariant={fadeInRight}
        onViewportEnter={() => handleProgress(6)}
      >
        <div className="space-y-4">
          <motion.div
            {...fadeInUp}
            className="bg-blue-900/20 border border-blue-800 rounded-lg p-4"
          >
            <p className="text-blue-200 text-sm md:text-base">
              Starting sooner gives compound growth more time to work. Even
              small amounts invested consistently over many years can
              dramatically outperform larger amounts invested later.
            </p>
          </motion.div>

          {[
            {
              title: "Scenario A - The Early Bird",
              details: [
                "Starts investing at age 25",
                "Invests $200/month for 10 years, then stops",
                "Total invested: $24,000",
                "Value at age 65: $525,000",
              ],
              color: "green",
            },
            {
              title: "Scenario B - The Procrastinator",
              details: [
                "Starts investing at age 35",
                "Invests $200/month for 30 years",
                "Total invested: $72,000",
                "Value at age 65: $379,000",
              ],
              color: "red",
            },
          ].map((scenario, index) => (
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
                {scenario.details.map((detail, i) => (
                  <li key={i}>• {detail}</li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            {...fadeInUp}
            className="bg-blue-900/30 p-4 rounded-lg border border-blue-700"
          >
            <p className="text-blue-200 text-center font-semibold text-sm md:text-base">
              The early bird invested $48,000 less but ended up with $146,000
              more! This is the magic of compound interest combined with time.
            </p>
          </motion.div>
        </div>
      </LessonSection>

      {/* Knowledge Check Quiz */}
      <LessonSection
        title="🧠 Knowledge Check Quiz"
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(7)}
      >
        <Quiz
          question="Why do you think investing is important?"
          options={[
            { id: "a", text: "To grow wealth over time" },
            { id: "b", text: "To secure financial stability for the future" },
            {
              id: "c",
              text: "To beat inflation and maintain purchasing power",
            },
            { id: "d", text: "All of the above" },
          ]}
          selectedAnswer={state.quizAnswer}
          onAnswerSelect={actions.setQuizAnswer}
          onCheckAnswer={() => actions.toggleVisibility("showQuizResult")}
          showResult={state.showQuizResult}
          correctAnswer="D) All of the above"
          explanation="Investing allows you to grow your wealth, secure your future, and protect against inflation, making all of the above reasons important."
        />
      </LessonSection>

      {/* Key Takeaways */}
      <LessonSection
        title="🎉 Key Takeaways"
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(8)}
      >
        <KeyTakeaways
          animationVariant={fadeInLeft}
          items={[
            "Inflation is your enemy - It silently erodes your purchasing power every year",
            "Time is your best friend - Starting early gives you a massive advantage",
            "You don't need to be perfect - You just need to start and be consistent",
            "Small amounts matter - $50/month invested is infinitely better than $0",
            "Knowledge is power - The more you learn, the more confident you'll become",
          ]}
        />
      </LessonSection>

      {/* Next Steps */}
      <NextStepsCard
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(9)}
        description={
          "Now that you understand WHY you need to invest, our next lesson will teach you HOW to set clear, achievable financial goals. Because without a target, you're just throwing darts in the dark."
        }
        progressValue={25}
        lessonLabel={`Lesson 1 of 4 — ${state.lessonProgress === 100
            ? "Complete! You've mastered why investing matters."
            : "Keep exploring to complete this lesson."
          }`}
        completeMessage={
          state.lessonProgress === 100
            ? "Remember: Every expert was once a beginner. The difference between those who build wealth and those who don't isn't intelligence or income – it's taking action."
            : undefined
        }
      />
    </div>
  );
}
