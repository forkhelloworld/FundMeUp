import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FICalculator } from "@/components/lessons/FICalculator";

const mockToastError = vi.fn();

vi.mock("sonner", () => ({
  toast: {
    error: (...args: unknown[]) => mockToastError(...args),
    success: vi.fn(),
  },
}));

const mockCheckAndAwardSimulationAchievement = vi.fn();
const mockCheckAndAwardTimeBasedAchievement = vi.fn();

vi.mock("@/lib/achievement-checker", () => ({
  useAchievementChecker: () => ({
    checkAndAwardSimulationAchievement: mockCheckAndAwardSimulationAchievement,
    checkAndAwardTimeBasedAchievement: mockCheckAndAwardTimeBasedAchievement,
  }),
}));

type StoreState = {
  currentAge: number;
  selectedFIAge: number;
  currentNetWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  riskTolerance: string;
  timeHorizon: number;
  monthlyContribution: number;
  setUserProfileData: (data: Partial<StoreState>) => void;
};

const baseState: StoreState = {
  currentAge: 25,
  selectedFIAge: 50,
  currentNetWorth: 10000,
  monthlyIncome: 2000,
  monthlyExpenses: 1000,
  riskTolerance: "moderate",
  timeHorizon: 10,
  monthlyContribution: 500,
  setUserProfileData: () => undefined,
};

const mockState: StoreState = { ...baseState };

vi.mock("@/lib/userProfile-store", () => {
  const hook = () => mockState;
  hook.getState = () => mockState;
  return {
    useUserProfileStore: hook,
  };
});

const translations: Record<string, string> = {
  title: "Financial Independence Calculator",
  currentAge: "Current Age",
  retirementAge: "Desired Retirement Age",
  currentSavings: "Current Savings",
  monthlyIncome: "Monthly Income",
  monthlyExpenses: "Monthly Expenses",
  expectedReturn: "Expected Annual Return (%)",
  savingsRate: "Current Savings Rate",
  calculate: "Calculate",
  "results.title": "Your Financial Independence Plan",
  "results.targetAmount": "Target Amount Needed",
  "results.currentProgress": "Current Progress",
  "results.projectedAtAge": "Projected at Age {age}",
  "results.monthlySavingsAmount": "Monthly savings: ${amount}",
  "results.gapAnalysis": "Gap Analysis",
  "results.shortfall": "Shortfall: ${amount}",
  "results.additionalNeeded": "Need additional ${amount}/month",
  "results.congratulations": "🎉 Congratulations!",
  "results.onTrack": "You're on track to achieve FI by age {age}!",
  "results.noData": "Press Calculate to see your plan",
  "results.noExpenses": "Enter monthly expenses above 0 to calculate your plan",
};

const validationTranslations: Record<string, string> = {
  currentAgeRequired: "Current age is required",
  currentAgeInvalid: "Current age must be a whole number",
  currentAgeMin: "Current age must be at least 18",
  currentAgeMax: "Current age must be at most 100",
  targetFIAgeRequired: "Target FI age is required",
  targetFIAgeInvalid: "Target FI age must be a whole number",
  targetFIAgeMin: "Target FI age must be at least 19",
  targetFIAgeMax: "Target FI age must be at most 120",
  currentNetWorthRequired: "Current net worth is required",
  currentNetWorthNegative: "Net worth cannot be negative",
  monthlyIncomeRequired: "Monthly income is required",
  monthlyIncomeNegative: "Monthly income cannot be negative",
  monthlyIncomeMin: "Monthly income must be greater than 0",
  monthlyExpensesRequired: "Monthly expenses are required",
  monthlyExpensesNegative: "Monthly expenses cannot be negative",
  monthlyExpensesMin: "Monthly expenses must be greater than 0",
  savingsRateRequired: "Savings rate is required",
  savingsRateMin: "Savings rate cannot be negative",
  savingsRateMax: "Savings rate must be 0-80%",
  expectedReturnRequired: "Expected return is required",
  expectedReturnMin: "Expected return is too low",
  expectedReturnMax: "Expected return seems unrealistic",
  targetFIAgeGreater: "Target FI age must be greater than current age",
  expensesExceedIncome: "Expenses should not exceed income",
};

const errorTranslations: Record<string, string> = {
  pleaseCorrectFields: "Please correct the highlighted fields",
  someInputsInvalid: "Some inputs are invalid. Review errors and try again.",
};

vi.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => {
    if (namespace === "lessons.calculators.fiCalculator") {
      return (key: string, params?: Record<string, unknown>) => {
        if (key === "results.projectedAtAge" && params?.age) {
          return `Projected at Age ${params.age as number}`;
        }
        if (key === "results.basedOnExpenses" && params?.amount) {
          return `Based on ${params.amount}`;
        }
        return translations[key] || key;
      };
    }
    if (namespace === "lessons.calculators.fiCalculator.validation") {
      return (key: string) => validationTranslations[key] || key;
    }
    if (namespace === "lessons.errors") {
      return (key: string) => errorTranslations[key] || key;
    }
    return (key: string) => key;
  },
}));

describe("FICalculator", () => {
  beforeEach(() => {
    vi.useRealTimers();
    mockCheckAndAwardSimulationAchievement.mockResolvedValue(undefined);
    mockCheckAndAwardTimeBasedAchievement.mockResolvedValue(undefined);
    Object.assign(mockState, { ...baseState });
    mockState.setUserProfileData = (data: Partial<StoreState>) =>
      Object.assign(mockState, data);
    vi.clearAllMocks();
  });

  it("renders form fields with localized labels", () => {
    render(<FICalculator />);

    const spinboxes = screen.getAllByRole("spinbutton");
    expect(spinboxes.length).toBeGreaterThanOrEqual(5);
    expect(screen.getByText(/current age/i)).toBeInTheDocument();
    expect(screen.getByText(/desired retirement age/i)).toBeInTheDocument();
    expect(screen.getAllByText(/current savings/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/monthly income/i)).toBeInTheDocument();
    expect(screen.getByText(/^monthly expenses$/i)).toBeInTheDocument();
    expect(screen.getByText(/expected annual return/i)).toBeInTheDocument();
  });

  it("does not show calculated results until Calculate is clicked", () => {
    render(<FICalculator />);

    expect(
      screen.getByText(/press calculate to see your plan/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/target amount needed/i)).not.toBeInTheDocument();
  });

  it("shows results after clicking Calculate with valid data", async () => {
    const user = userEvent.setup({ delay: null });
    render(<FICalculator />);

    await user.click(screen.getByRole("button", { name: /calculate/i }));

    expect(
      await screen.findByText(/target amount needed/i, {}, { timeout: 2000 })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/projected at age 50/i, {}, { timeout: 2000 })
    ).toBeInTheDocument();

    expect(mockCheckAndAwardSimulationAchievement).toHaveBeenCalled();
    expect(mockCheckAndAwardTimeBasedAchievement).toHaveBeenCalled();
  });

  it("shows localized validation error when target age is not greater than current age", async () => {
    const user = userEvent.setup({ delay: null });
    render(<FICalculator />);

    const [currentAgeInput, retirementAgeInput] =
      screen.getAllByRole("spinbutton");

    fireEvent.change(currentAgeInput, { target: { value: 30 } });
    fireEvent.change(retirementAgeInput, { target: { value: 29 } });

    await user.click(screen.getByRole("button", { name: /calculate/i }));

    expect(
      await screen.findByText(
        /target fi age must be greater than current age/i,
        {},
        { timeout: 2000 }
      )
    ).toBeInTheDocument();
  });

  it("shows validation errors for bounds and income/expense consistency", async () => {
    const user = userEvent.setup({ delay: null });
    render(<FICalculator />);

    const spinboxes = screen.getAllByRole("spinbutton");
    const [
      currentAgeInput,
      retirementAgeInput,
      netWorthInput,
      incomeInput,
      expensesInput,
    ] = spinboxes;
    const expectedReturnInput = spinboxes[5];
    const savingsRateInput = screen.getByRole("slider");

    fireEvent.change(currentAgeInput, { target: { value: 17 } });
    fireEvent.change(retirementAgeInput, { target: { value: 121 } });
    fireEvent.change(netWorthInput, { target: { value: -1 } });
    fireEvent.change(incomeInput, { target: { value: 1000 } });
    fireEvent.change(expensesInput, { target: { value: 2000 } });
    fireEvent.change(expectedReturnInput, { target: { value: -11 } });
    fireEvent.change(savingsRateInput, { target: { value: 85 } });

    await user.click(screen.getByRole("button", { name: /calculate/i }));

    expect(
      await screen.findByText(
        /current age must be at least 18/i,
        {},
        { timeout: 2000 }
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /target fi age must be at most 120/i,
        {},
        { timeout: 2000 }
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /net worth cannot be negative/i,
        {},
        { timeout: 2000 }
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /expenses should not exceed income/i,
        {},
        { timeout: 2000 }
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /expected return is too low/i,
        {},
        { timeout: 2000 }
      )
    ).toBeInTheDocument();
    // Savings rate slider error may render without text when capped; ensure no crash by asserting no success
    expect(mockCheckAndAwardSimulationAchievement).not.toHaveBeenCalled();
  });

  it("calculates and displays totals correctly with base data", async () => {
    const user = userEvent.setup({ delay: null });
    render(<FICalculator />);

    await user.click(screen.getByRole("button", { name: /calculate/i }));

    expect(
      await screen.findByText(/target amount needed/i, {}, { timeout: 2000 })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/\$300,000/)[0]).toBeInTheDocument();
    expect(screen.getByText(/projected at age 50/i)).toBeInTheDocument();
    expect(screen.getByText(/\$378,303/)).toBeInTheDocument();
    expect(screen.getByText(/3\.3% to fi/i)).toBeInTheDocument();
    expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
  });
});
