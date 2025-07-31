import type {
  Feature,
  Testimonial,
  HowItWorksStep,
  PricingFeature,
  StatData,
  ProblemPoint,
} from "@/types/landing";

// Animation constants
export const ANIMATION_DELAY = 500;
export const COUNT_TARGET = 70;
export const CIRCLE_RADIUS = 80;
export const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

// Features data
export const FEATURES: Omit<Feature, "icon">[] = [
  {
    id: "investment-simulator",
    title: "Investment Simulator",
    description:
      "Test your strategies in a risk-free environment. Compete and track your performance.",
    color: "emerald",
  },
  {
    id: "goal-savings",
    title: "Goal-based Savings",
    description:
      "Set savings goals and track your progress visually. Stay motivated with milestones.",
    color: "cyan",
  },
  {
    id: "public-portfolios",
    title: "Public Portfolios",
    description:
      "See how influencers invest. Learn from real strategies and share your own.",
    color: "purple",
  },
  {
    id: "rewards-badges",
    title: "Rewards & Badges",
    description:
      "Earn badges for achievements and consistency. Show off your progress.",
    color: "yellow",
  },
];

// Testimonials data
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "alex",
    name: "Alex",
    role: "Student",
    content:
      "I never thought finance could be this fun. The challenges keep me coming back!",
    rating: 5,
  },
  {
    id: "maria",
    name: "Maria",
    role: "Marketing Manager",
    content:
      "The simulator made me realize how much I could grow my money. Super motivating!",
    rating: 5,
  },
  {
    id: "taras",
    name: "Taras",
    role: "Developer",
    content:
      "I love the rewards and badges. It feels like a game, but I'm learning real skills.",
    rating: 5,
  },
];

// How it works steps
export const HOW_IT_WORKS_STEPS: Omit<HowItWorksStep, "icon">[] = [
  {
    id: "personalize",
    step: "01",
    title: "Personalize your path",
    description:
      "Start with a quick quiz to tailor your journey and set your financial goals.",
    color: "emerald",
  },
  {
    id: "learn",
    step: "02",
    title: "Learn via micro-tasks",
    description:
      "Learn via micro-tasks, simulations, and challenges. Master concepts at your own pace.",
    color: "cyan",
  },
  {
    id: "track",
    step: "03",
    title: "Track your progress",
    description:
      "Track your progress and earn rewards. Stay motivated with streaks, badges, and public goals.",
    color: "purple",
  },
];

// Pricing features
export const PRICING_FEATURES: PricingFeature[] = [
  { id: "lessons", text: "Access to all lessons and simulations" },
  { id: "goals", text: "Track goals and earn badges" },
  { id: "challenges", text: "Join public challenges" },
];

// Statistics data
export const STATS_DATA: StatData[] = [
  {
    id: "inflation",
    value: "2.4%",
    label: "Inflation",
    subtitle: "This year alone",
    color: "text-red-400",
  },
  {
    id: "investing-profit",
    value: "10.9%",
    label: "Investing profit",
    subtitle: "Which can be obtained",
    color: "text-orange-400",
  },
  {
    id: "profit",
    value: "13.3%",
    label: "Profit",
    subtitle: "Potential gains missed",
    color: "text-green-400",
  },
];

// Problem points data
export const PROBLEM_POINTS: ProblemPoint[] = [
  {
    id: "fear",
    emoji: "😰",
    title: "Fear of Losing Money",
    description: "Without proper education, investing feels like gambling.",
    bgColor: "bg-red-500/20",
    textColor: "text-red-400",
  },
  {
    id: "overload",
    emoji: "🤯",
    title: "Information Overload",
    description: "Traditional finance education is overwhelming and boring.",
    bgColor: "bg-orange-500/20",
    textColor: "text-orange-400",
  },
  {
    id: "time",
    emoji: "⏰",
    title: "No Time to Learn",
    description: "People need bite-sized, engaging ways to learn finance.",
    bgColor: "bg-yellow-500/20",
    textColor: "text-yellow-400",
  },
];
