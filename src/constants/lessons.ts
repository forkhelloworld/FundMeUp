import {
  FaChartLine,
  FaBalanceScale,
  FaPiggyBank,
  FaUniversity,
} from "react-icons/fa";

export const lessons = [
  {
    id: 1,
    slug: "why-you-should-invest",
    title: "Why You Should Invest",
    description:
      "Learn how compound interest can make your money grow exponentially over time.",
    duration: 5,
    progress: 0,
    category: "Investing Basics",
    icon: FaChartLine,
  },
  {
    id: 2,
    slug: "set-your-financial-goal",
    title: "Set Your Financial Goal",
    description:
      "Learn how to define a personal financial goal — from buying a car to long-term wealth building.",
    duration: 7,
    progress: 0,
    category: "Investing Basics",
    icon: FaPiggyBank,
  },
  {
    id: 3,
    slug: "investing-basics",
    title: "Investing Basics",
    description:
      "Explore the core principles of investing: risk, return, diversification, and compound growth.",
    duration: 10,
    progress: 0,
    category: "Investing Basics",
    icon: FaBalanceScale,
  },
  {
    id: 4,
    slug: "build-your-first-portfolio",
    title: "Build Your First Portfolio",
    description:
      "Turn your goal into action by creating a simple beginner-friendly portfolio aligned with your needs.",
    duration: 6,
    progress: 0,
    category: "Investing Basics",
    icon: FaUniversity,
  },
];
