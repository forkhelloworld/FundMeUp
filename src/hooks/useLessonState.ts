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

  quizAnswer: string;
  riskProfile: string;
  dcaAmount: number;
  dcaMonths: number;
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
  quizAnswer: "",
  riskProfile: "",
  dcaAmount: 500,
  dcaMonths: 4,
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
      >,
    ) => {
      dispatch({ type: "TOGGLE_VISIBILITY", key });
    },
    [],
  );

  const updateInput = useCallback(
    (key: keyof LessonState, value: string | number) => {
      dispatch({ type: "UPDATE_INPUT", key, value });
    },
    [],
  );

  const updateProgress = useCallback(
    (section: number, maxSections: number) => {
      dispatch({ type: "UPDATE_PROGRESS", section, maxSections });
    },
    [],
  );

  return {
    state,
    actions: {
      toggleVisibility,
      updateInput,
      updateProgress,
    },
  };
}
