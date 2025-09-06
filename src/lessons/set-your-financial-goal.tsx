"use client";
import { FICalculator } from "@/components/lessons/FICalculator";
import { LessonHero } from "@/components/lessons/LessonHero";
import { LessonSection } from "@/components/lessons/LessonSection";
import { KeyTakeaways } from "@/components/lessons/KeyTakeaways";
import { Quiz } from "@/components/lessons/Quiz";
import { NextStepsCard } from "@/components/lessons/NextStepsCard";
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

export default function SetFinancialPlanPage() {
  const { state, actions } = useLessonState();

  // Progress tracking
  const handleProgress = (section: number) => {
    actions.updateProgress(section, 10);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center px-6 py-12">
      {/* Hero Section */}
      <LessonHero
        animationVariant={bounceIn}
        onViewportEnter={() => handleProgress(1)}
        title={
          <>
            🎯 Set Your <span className="text-green-400">Financial Plan</span>
          </>
        }
        subtitle="Your Complete Roadmap to Financial Independence"
        description="Financial independence isn&lsquo;t just a dream—it&lsquo;s a mathematical equation you can solve."
      />

      {/* Why a Financial Plan Matters */}
      <LessonSection
        title="🗺️ Why You Need a Financial Plan (Not Just Goals)"
        animationVariant={fadeInLeft}
        onViewportEnter={() => handleProgress(2)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          Most people set random financial goals: &ldquo;save for
          retirement,&ldquo; &ldquo;buy a house,&ldquo; &ldquo;have an emergency
          fund.&ldquo; But these scattered goals often conflict with each other
          and lack a unifying purpose.
        </p>

        <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-700 mb-6">
          <h3 className="text-blue-200 font-semibold text-center mb-4">
            A financial plan is different—it&lsquo;s your complete strategy for
            achieving financial independence
          </h3>
          <p className="text-blue-300 text-center">
            Financial Independence (FI) = Having enough passive income to cover
            your lifestyle indefinitely
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            {...fadeInLeft}
            className="bg-red-900/20 p-4 rounded-lg border border-red-700"
          >
            <h4 className="text-red-300 font-semibold mb-3">
              ❌ Random Goals Approach:
            </h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Conflicting priorities and timelines</li>
              <li>• No clear path to financial freedom</li>
              <li>• Reactive money management</li>
              <li>• Always chasing the next financial milestone</li>
            </ul>
          </motion.div>

          <motion.div
            {...fadeInRight}
            className="bg-green-900/20 p-4 rounded-lg border border-green-700"
          >
            <h4 className="text-green-300 font-semibold mb-3">
              ✅ Strategic Financial Plan:
            </h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• One clear destination: Financial Independence</li>
              <li>• All goals work together toward FI</li>
              <li>• Proactive wealth building strategy</li>
              <li>• Freedom to choose your life path</li>
            </ul>
          </motion.div>
        </div>
      </LessonSection>

      {/* The Financial Independence Framework */}
      <LessonSection
        title="💰 The Financial Independence Framework"
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(3)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          Financial Independence follows a simple mathematical formula that
          anyone can understand and implement:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            {...scaleIn}
            className="bg-blue-900/20 p-6 rounded-lg border border-blue-700 text-center"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-blue-300 font-semibold mb-3">
              Step 1: Know Your FI Number
            </h3>
            <p className="text-gray-300 text-sm">
              Annual Expenses × 25 = Your FI Number
            </p>
            <p className="text-blue-200 text-xs mt-2">
              Based on the 4% withdrawal rule
            </p>
          </motion.div>

          <motion.div
            {...scaleIn}
            transition={{ delay: 0.1 }}
            className="bg-green-900/20 p-6 rounded-lg border border-green-700 text-center"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-green-300 font-semibold mb-3">
              Step 2: Calculate Timeline
            </h3>
            <p className="text-gray-300 text-sm">
              Higher savings rate = Faster FI
            </p>
            <p className="text-green-200 text-xs mt-2">
              50% savings rate = ~17 years to FI
            </p>
          </motion.div>

          <motion.div
            {...scaleIn}
            transition={{ delay: 0.2 }}
            className="bg-purple-900/20 p-6 rounded-lg border border-purple-700 text-center"
          >
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-purple-300 font-semibold mb-3">
              Step 3: Execute Plan
            </h3>
            <p className="text-gray-300 text-sm">
              Automate investments, optimize taxes, track progress
            </p>
            <p className="text-purple-200 text-xs mt-2">
              Consistency beats perfection
            </p>
          </motion.div>
        </div>

        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-700">
          <h4 className="text-yellow-300 font-semibold mb-3">
            The Magic of High Savings Rates:
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-yellow-200 font-bold">10% saved</div>
              <div className="text-gray-300">51 years to FI</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-200 font-bold">25% saved</div>
              <div className="text-gray-300">32 years to FI</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-200 font-bold">50% saved</div>
              <div className="text-gray-300">17 years to FI</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-200 font-bold">75% saved</div>
              <div className="text-gray-300">7 years to FI</div>
            </div>
          </div>
        </div>
      </LessonSection>

      {/* Financial Independence Calculator */}
      <LessonSection
        title="🧮 Your Personal FI Calculator"
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(4)}
      >
        <p className="text-gray-300 mb-6">
          Let&lsquo;s calculate your personalized path to financial
          independence:
        </p>

        <FICalculator
          onCurrentAgeChange={(age) => actions.updateInput("currentAge", age)}
          onViewportEnter={() => handleProgress(4)}
        />
      </LessonSection>

      {/* Building Your Supporting Goals */}
      <LessonSection
        title="🎯 Building Your Supporting Goals"
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(5)}
      >
        <p className="text-gray-300 leading-relaxed mb-6">
          Once you have your FI plan, all other financial goals should support
          this primary objective. Here&lsquo;s how to structure your supporting
          goals:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Foundation Goals",
              color: "red",
              icon: "🏗️",
              goals: [
                "Emergency fund (3-6 months expenses)",
                "High-interest debt elimination",
                "Adequate insurance coverage",
                "Employer 401(k) match maximization",
              ],
            },
            {
              title: "Acceleration Goals",
              color: "blue",
              icon: "🚀",
              goals: [
                "Optimize tax-advantaged accounts",
                "Increase income through skills/career",
                "Reduce major expenses (housing, transport)",
                "Build additional income streams",
              ],
            },
            {
              title: "Lifestyle Goals",
              color: "green",
              icon: "🎨",
              goals: [
                "Travel fund (within FI timeline)",
                "Home purchase (if aligned with FI)",
                "Education/skill development",
                "Major purchases (analyze FI impact)",
              ],
            },
          ].map((category, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: index * 0.1 }}
              className={`bg-${category.color}-900/20 p-6 rounded-lg border border-${category.color}-700`}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className={`text-${category.color}-300 font-semibold`}>
                  {category.title}
                </h3>
              </div>
              <ul className="text-gray-300 text-sm space-y-2">
                {category.goals.map((goal, goalIndex) => (
                  <li key={goalIndex} className="flex items-start gap-2">
                    <span className={`text-${category.color}-400 mt-1`}>•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-700 mt-6">
          <h4 className="text-yellow-300 font-semibold mb-3 text-center">
            💡 The FI Filter: Before Adding Any Goal, Ask:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-yellow-200 font-medium">
                &ldquo;Does this support my FI plan?&ldquo;
              </p>
            </div>
            <div>
              <p className="text-yellow-200 font-medium">
                &ldquo;How will this impact my timeline?&ldquo;
              </p>
            </div>
            <div>
              <p className="text-yellow-200 font-medium">
                &ldquo;Is there a more FI-aligned alternative?&ldquo;
              </p>
            </div>
          </div>
        </div>
      </LessonSection>

      {/* The FI Planning Process */}
      <LessonSection
        title="📋 Your FI Planning Process"
        animationVariant={fadeInLeft}
        onViewportEnter={() => handleProgress(6)}
      >
        <p className="text-gray-300 mb-6">
          Creating a financial plan isn&lsquo;t a one-time activity.
          Here&lsquo;s your systematic approach:
        </p>

        <div className="space-y-6">
          {[
            {
              phase: "Month 1: Foundation",
              color: "blue",
              tasks: [
                "Calculate your FI number and timeline",
                "Set up automatic savings and investments",
                "Build your emergency fund",
                "Maximize employer retirement matching",
              ],
            },
            {
              phase: "Month 2-3: Optimization",
              color: "green",
              tasks: [
                "Optimize your tax-advantaged accounts",
                "Automate your investment contributions",
                "Track and reduce unnecessary expenses",
                "Set up progress monitoring system",
              ],
            },
            {
              phase: "Month 4-6: Acceleration",
              color: "purple",
              tasks: [
                "Focus on increasing income",
                "Consider house hacking or real estate",
                "Build additional income streams",
                "Optimize tax strategies",
              ],
            },
            {
              phase: "Ongoing: Maintenance",
              color: "orange",
              tasks: [
                "Monthly progress reviews",
                "Quarterly plan adjustments",
                "Annual comprehensive review",
                "Celebrate milestones achieved",
              ],
            },
          ].map((phase, index) => (
            <motion.div
              key={index}
              {...fadeInLeft}
              transition={{ delay: index * 0.1 }}
              className={`bg-${phase.color}-900/20 p-6 rounded-lg border border-${phase.color}-700`}
            >
              <h3 className={`text-${phase.color}-300 font-semibold mb-4`}>
                {phase.phase}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {phase.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex items-start gap-2">
                    <span className={`text-${phase.color}-400 mt-1`}>✓</span>
                    <span className="text-gray-300 text-sm">{task}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </LessonSection>

      {/* Financial Plan Quiz */}
      <LessonSection
        title="🧠 Financial Plan Knowledge Check"
        animationVariant={slideInFromBottom}
        onViewportEnter={() => handleProgress(7)}
      >
        <Quiz
          question="What's the main advantage of having a financial independence plan versus scattered financial goals?"
          options={[
            { id: "a", text: "It's easier to achieve multiple small goals" },
            {
              id: "b",
              text: "All goals work together toward one unified objective",
            },
            { id: "c", text: "You can retire earlier than everyone else" },
            { id: "d", text: "It requires less monthly savings" },
          ]}
          selectedAnswer={state.quizAnswer}
          onAnswerSelect={actions.setQuizAnswer}
          onCheckAnswer={() => actions.toggleVisibility("showQuizResult")}
          showResult={state.showQuizResult}
          correctAnswer="B) All goals work together toward one unified objective"
          explanation="A financial independence plan provides a unified framework where every financial decision supports your ultimate goal of FI. This eliminates conflicting priorities and ensures optimal resource allocation toward building wealth and achieving financial freedom."
        />
      </LessonSection>

      {/* Implementation Checklist */}
      <LessonSection
        title="✅ Your FI Plan Implementation Checklist"
        animationVariant={fadeInRight}
        onViewportEnter={() => handleProgress(8)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            {...fadeInLeft}
            className="bg-slate-800 p-6 rounded-lg border border-slate-700"
          >
            <h4 className="text-white font-semibold mb-4">This Week:</h4>
            <div className="space-y-3">
              {[
                "Calculate your FI number using the 25x rule",
                "Determine your current savings rate",
                "Set your target FI age and timeline",
                "Open a dedicated FI tracking spreadsheet",
              ].map((task, index) => (
                <div key={index} className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-gray-300 text-sm">{task}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeInRight}
            className="bg-slate-800 p-6 rounded-lg border border-slate-700"
          >
            <h4 className="text-white font-semibold mb-4">This Month:</h4>
            <div className="space-y-3">
              {[
                "Automate investments toward your FI goal",
                "Complete your emergency fund if needed",
                "Optimize all tax-advantaged accounts",
                "Create your supporting goals framework",
              ].map((task, index) => (
                <div key={index} className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-gray-300 text-sm">{task}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </LessonSection>

      {/* Key Takeaways */}
      <LessonSection
        title="🎉 Key Takeaways"
        animationVariant={fadeInUp}
        onViewportEnter={() => handleProgress(9)}
      >
        <KeyTakeaways
          animationVariant={fadeInLeft}
          items={[
            "Financial independence is your north star—all goals should support it",
            "Your FI number = Annual expenses × 25 (4% withdrawal rule)",
            "Higher savings rate = Dramatically shorter timeline to FI",
            "Automate everything—consistency beats perfection every time",
            "Use the FI filter—does this goal support or delay your independence?",
            "Track progress monthly—what gets measured gets managed",
            "Supporting goals should accelerate, not derail, your FI plan",
          ]}
        />
      </LessonSection>

      {/* Next Steps */}
      <NextStepsCard
        animationVariant={bounceIn}
        onViewportEnter={() => handleProgress(10)}
        description={
          "Now that you have a clear financial independence plan, our next lesson will teach you the fundamentals of investing. You'll learn how to build the investment portfolio that will power your journey to FI."
        }
        progressValue={50}
        lessonLabel={`Lesson 2 of 4 — ${state.lessonProgress === 100
            ? "Complete! You've mastered financial planning."
            : "Keep exploring to complete this lesson."
          }`}
        completeMessage={
          state.lessonProgress === 100
            ? "Remember: Financial independence isn't about having millions—it's about having enough to choose how you spend your time."
            : undefined
        }
      />
    </div>
  );
}
