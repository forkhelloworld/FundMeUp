import { useReducer, useCallback } from "react";

// Types for the lesson state
export interface LessonState {
  // Interactive elements visibility
  showRealityCheck: boolean;
  showInflationResult: boolean;
  showComparison: boolean;
  showQuizResult: boolean;
  showRiskResult: boolean;
  showAllocationResult: boolean;
  showDcaResult: boolean;
  showHomeResult: boolean;
  showEmergencyResult: boolean;
  showPriorityResult: boolean;
  showRetirementResult: boolean;

  // Form inputs
  savingsAmount: number;
  years: number;
  currentAge: number;
  monthlyInvestment: number;
  quizAnswer: string;
  goalClarityScore: number;
  selectedGoals: string[];
  goalPriority: { [key: string]: number };

  // Risk tolerance inputs
  age: number;
  riskTolerance: string;
  timeHorizon: number;
  currentSavings: number;
  monthlyContribution: number;
  riskProfile: string;

  // Home calculator inputs
  homePrice: number;
  downPaymentPercent: number;
  timeline: number;

  // Emergency fund inputs
  monthlyExpenses: number;
  targetMonths: number;

  // DCA inputs
  dcaAmount: number;
  dcaMonths: number;

  // Financial goal inputs
  retirementAge: number;
  desiredIncome: number;

  // Lesson progress
  lessonProgress: number;
}

// Action types for the reducer
export type LessonAction =
  | {
      type: "TOGGLE_VISIBILITY";
      key: keyof Pick<
        LessonState,
        | "showRealityCheck"
        | "showInflationResult"
        | "showComparison"
        | "showQuizResult"
        | "showRiskResult"
        | "showAllocationResult"
        | "showDcaResult"
        | "showHomeResult"
        | "showEmergencyResult"
        | "showPriorityResult"
        | "showRetirementResult"
      >;
    }
  | { type: "UPDATE_INPUT"; key: keyof LessonState; value: string | number }
  | { type: "SET_QUIZ_ANSWER"; answer: string }
  | { type: "SET_GOAL_SELECTION"; goal: string }
  | { type: "SET_GOAL_PRIORITY"; goal: string; level: number }
  | { type: "SET_GOAL_CLARITY_SCORE"; score: number }
  | { type: "SET_RISK_PROFILE"; profile: string }
  | { type: "UPDATE_PROGRESS"; section: number; maxSections: number }
  | { type: "RESET_LESSON" };

// Initial state
export const initialLessonState: LessonState = {
  // Interactive elements visibility
  showRealityCheck: false,
  showInflationResult: false,
  showComparison: false,
  showQuizResult: false,
  showRiskResult: false,
  showAllocationResult: false,
  showDcaResult: false,
  showHomeResult: false,
  showEmergencyResult: false,
  showPriorityResult: false,
  showRetirementResult: false,

  // Form inputs
  savingsAmount: 5000,
  years: 10,
  currentAge: 25,
  monthlyInvestment: 200,
  quizAnswer: "",
  goalClarityScore: 0,
  selectedGoals: [],
  goalPriority: {},

  // Risk tolerance inputs
  age: 30,
  riskTolerance: "moderate",
  timeHorizon: 10,
  currentSavings: 10000,
  monthlyContribution: 500,
  riskProfile: "",

  // Home calculator inputs
  homePrice: 400000,
  downPaymentPercent: 20,
  timeline: 5,

  // Emergency fund inputs
  monthlyExpenses: 4000,
  targetMonths: 6,

  // DCA inputs
  dcaAmount: 1000,
  dcaMonths: 12,

  // Financial goal inputs
  retirementAge: 65,
  desiredIncome: 50000,

  // Lesson progress
  lessonProgress: 0,
};

// Reducer function
function lessonReducer(state: LessonState, action: LessonAction): LessonState {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return {
        ...state,
        [action.key]: !state[action.key],
      };

    case "UPDATE_INPUT":
      return {
        ...state,
        [action.key]: action.value,
      };

    case "SET_QUIZ_ANSWER":
      return {
        ...state,
        quizAnswer: action.answer,
      };

    case "SET_GOAL_SELECTION":
      const newSelectedGoals = state.selectedGoals.includes(action.goal)
        ? state.selectedGoals.filter((g) => g !== action.goal)
        : [...state.selectedGoals, action.goal];
      return {
        ...state,
        selectedGoals: newSelectedGoals,
      };

    case "SET_GOAL_PRIORITY":
      return {
        ...state,
        goalPriority: {
          ...state.goalPriority,
          [action.goal]: action.level,
        },
      };

    case "SET_GOAL_CLARITY_SCORE":
      return {
        ...state,
        goalClarityScore: action.score,
      };

    case "SET_RISK_PROFILE":
      return {
        ...state,
        riskProfile: action.profile,
      };

    case "UPDATE_PROGRESS":
      const progressPerSection = 100 / action.maxSections;
      const newProgress = Math.max(
        state.lessonProgress,
        action.section * progressPerSection
      );
      return {
        ...state,
        lessonProgress: newProgress,
      };

    case "RESET_LESSON":
      return initialLessonState;

    default:
      return state;
  }
}

// Custom hook
export function useLessonState() {
  const [state, dispatch] = useReducer(lessonReducer, initialLessonState);

  // Action creators
  const toggleVisibility = useCallback(
    (
      key: keyof Pick<
        LessonState,
        | "showRealityCheck"
        | "showInflationResult"
        | "showComparison"
        | "showQuizResult"
        | "showRiskResult"
        | "showAllocationResult"
        | "showDcaResult"
        | "showHomeResult"
        | "showEmergencyResult"
        | "showPriorityResult"
        | "showRetirementResult"
      >
    ) => {
      dispatch({ type: "TOGGLE_VISIBILITY", key });
    },
    []
  );

  const updateInput = useCallback(
    (key: keyof LessonState, value: string | number) => {
      dispatch({ type: "UPDATE_INPUT", key, value });
    },
    []
  );

  const setQuizAnswer = useCallback((answer: string) => {
    dispatch({ type: "SET_QUIZ_ANSWER", answer });
  }, []);

  const setGoalSelection = useCallback((goal: string) => {
    dispatch({ type: "SET_GOAL_SELECTION", goal });
  }, []);

  const setGoalPriority = useCallback((goal: string, level: number) => {
    dispatch({ type: "SET_GOAL_PRIORITY", goal, level });
  }, []);

  const setGoalClarityScore = useCallback((score: number) => {
    dispatch({ type: "SET_GOAL_CLARITY_SCORE", score });
  }, []);

  const setRiskProfile = useCallback((profile: string) => {
    dispatch({ type: "SET_RISK_PROFILE", profile });
  }, []);

  const updateProgress = useCallback((section: number, maxSections: number) => {
    dispatch({ type: "UPDATE_PROGRESS", section, maxSections });
  }, []);

  const resetLesson = useCallback(() => {
    dispatch({ type: "RESET_LESSON" });
  }, []);

  return {
    state,
    actions: {
      toggleVisibility,
      updateInput,
      setQuizAnswer,
      setGoalSelection,
      setGoalPriority,
      setGoalClarityScore,
      setRiskProfile,
      updateProgress,
      resetLesson,
    },
  };
}
