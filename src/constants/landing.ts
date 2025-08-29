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
    id: "intro-lessons",
    title: "Interactive Lessons",
    description:
      "Engage with short, interactive lessons that explain why investing matters and how to start.",
    color: "emerald",
  },
  {
    id: "goal-setting",
    title: "Financial Goal Builder",
    description:
      "Define your first financial goal and see how investing can help you reach it step by step.",
    color: "cyan",
  },
  {
    id: "progress-tracking",
    title: "Progress Tracking",
    description:
      "Track completed lessons and goals. Stay motivated with streaks, milestones, and rewards.",
    color: "purple",
  },
  {
    id: "ai-assistant",
    title: "AI Investment Buddy",
    description:
      "Get personalized guidance from an AI assistant that helps you learn and stay on track.",
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
    id: "learn",
    step: "01",
    "title": "Start learning",
    "description": "Begin with simple lessons that explain why investing matters and help you set your first financial goal.",
    "color": "emerald"
  },
  {
    "id": "simulate",
    "step": "02",
    "title": "Try simulations",
    "description": "Practice with easy-to-use simulations to see how investing works in real life without any risk.",
    "color": "cyan"
  },
  {
    "id": "progress",
    "step": "03",
    "title": "Track & earn",
    "description": "Follow your progress, unlock achievements, and stay motivated with rewards and public goals.",
    "color": "purple"
  }
];

// Pricing features
export const PRICING_FEATURES: PricingFeature[] = [
  { id: "basic-course", text: "Start the basic course on investing fundamentals" },
  { id: "simulations", text: "Try simple investment simulations without risks" },
  { id: "gamification", text: "Stay engaged with goals, badges, and challenges" },
];

// Statistics data
export const STATS_DATA: StatData[] = [
  {
    id: "inflation",
    value: "3%",
    label: "Inflation",
    subtitle: "This year alone",
    color: "text-red-400",
  },
  {
    id: "investing-profit",
    value: "10%",
    label: "Investing profit",
    subtitle: "Which can be obtained",
    color: "text-orange-400",
  },
  {
    id: "profit",
    value: "13%",
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
