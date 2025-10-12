import { z } from "zod";

export const registrationBaseSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
});

export const registrationSchema = registrationBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const fiCalculatorSchema = z
  .object({
    currentAge: z
      .number({ invalid_type_error: "Current age is required" })
      .int("Current age must be a whole number")
      .min(18, "Current age must be at least 18")
      .max(100, "Current age must be at most 100"),
    selectedFIAge: z
      .number({ invalid_type_error: "Target FI age is required" })
      .int("Target FI age must be a whole number")
      .min(19, "Target FI age must be at least 19")
      .max(101, "Target FI age must be at most 120"),
    currentNetWorth: z
      .number({ invalid_type_error: "Current net worth is required" })
      .min(0, "Net worth cannot be negative"),
    monthlyIncome: z
      .number({ invalid_type_error: "Monthly income is required" })
      .min(0, "Monthly income cannot be negative"),
    monthlyExpenses: z
      .number({ invalid_type_error: "Monthly expenses are required" })
      .min(0, "Monthly expenses cannot be negative"),
    savingsRate: z
      .number({ invalid_type_error: "Savings rate is required" })
      .min(0, "Savings rate cannot be negative")
      .max(80, "Savings rate must be 0-80%"),
    expectedReturn: z
      .number({ invalid_type_error: "Expected return is required" })
      .min(-10, "Expected return is too low")
      .max(30, "Expected return seems unrealistic"),
  })
  .refine((v) => v.selectedFIAge > v.currentAge, {
    message: "Target FI age must be greater than current age",
    path: ["selectedFIAge"],
  })
  .refine((v) => v.monthlyIncome >= v.monthlyExpenses, {
    message: "Expenses should not exceed income",
    path: ["monthlyExpenses"],
  });

export const formSchema = z
  .object({
    currentAge: z
      .number({ invalid_type_error: "Current age is required" })
      .int("Current age must be a whole number")
      .min(18, "Current age must be at least 18")
      .max(100, "Current age must be at most 100"),
    selectedFIAge: z
      .number({ invalid_type_error: "Target FI age is required" })
      .int("Target FI age must be a whole number")
      .min(19, "Target FI age must be at least 19")
      .max(101, "Target FI age must be at most 120"),
    currentNetWorth: z
      .number({ invalid_type_error: "Current net worth is required" })
      .min(0, "Net worth cannot be negative"),
    monthlyIncome: z
      .number({ invalid_type_error: "Monthly income is required" })
      .min(0, "Monthly income cannot be negative"),
    monthlyExpenses: z
      .number({ invalid_type_error: "Monthly expenses is required" })
      .min(0, "Monthly expenses cannot be negative"),
  })
  .refine((v) => v.selectedFIAge > v.currentAge, {
    message: "Target FI age must be greater than current age",
    path: ["selectedFIAge"],
  })
  .refine((v) => v.monthlyIncome >= v.monthlyExpenses, {
    message: "Expenses should not exceed income",
    path: ["monthlyExpenses"],
  });

// Function to create localized form schema
export const createLocalizedFormSchema = (t: (key: string) => string) =>
  z
    .object({
      currentAge: z
        .number({ invalid_type_error: t("validation.currentAgeRequired") })
        .int(t("validation.currentAgeInvalid"))
        .min(18, t("validation.currentAgeMin"))
        .max(100, t("validation.currentAgeMax")),
      selectedFIAge: z
        .number({ invalid_type_error: t("validation.targetFIAgeRequired") })
        .int(t("validation.targetFIAgeInvalid"))
        .min(19, t("validation.targetFIAgeMin"))
        .max(101, t("validation.targetFIAgeMax")),
      currentNetWorth: z
        .number({ invalid_type_error: t("validation.netWorthRequired") })
        .min(0, t("validation.netWorthNegative")),
      monthlyIncome: z
        .number({ invalid_type_error: t("validation.incomeRequired") })
        .min(0, t("validation.incomeNegative")),
      monthlyExpenses: z
        .number({ invalid_type_error: t("validation.expensesRequired") })
        .min(0, t("validation.expensesNegative")),
    })
    .refine((v) => v.selectedFIAge > v.currentAge, {
      message: t("validation.targetFIAgeGreater"),
      path: ["selectedFIAge"],
    })
    .refine((v) => v.monthlyIncome >= v.monthlyExpenses, {
      message: t("validation.expensesExceedIncome"),
      path: ["monthlyExpenses"],
    });

export const assetAllocationSchema = z.object({
  currentAge: z
    .number({ invalid_type_error: "Current age is required" })
    .int("Current age must be a whole number")
    .min(18, "Current age must be at least 18")
    .max(100, "Current age must be at most 100"),
  currentNetWorth: z
    .number({ invalid_type_error: "Current net worth is required" })
    .min(0, "Net worth cannot be negative"),
  monthlyContribution: z
    .number({ invalid_type_error: "Monthly contribution is required" })
    .min(0, "Monthly contribution cannot be negative"),
});

// Function to create localized asset allocation schema
export const createLocalizedAssetAllocationSchema = (
  t: (key: string) => string
) =>
  z.object({
    currentAge: z
      .number({ invalid_type_error: t("currentAgeRequired") })
      .int(t("currentAgeInvalid"))
      .min(18, t("currentAgeMin"))
      .max(100, t("currentAgeMax")),
    currentNetWorth: z
      .number({ invalid_type_error: t("netWorthRequired") })
      .min(0, t("netWorthNegative")),
    monthlyContribution: z
      .number({
        invalid_type_error: t("monthlyContributionRequired"),
      })
      .min(0, t("monthlyContributionNegative")),
  });

export const validationSchemes = {
  loginSchema,
  registrationSchema,
  fiCalculatorSchema,
  formSchema,
  assetAllocationSchema,
  createLocalizedFormSchema,
  createLocalizedAssetAllocationSchema,
};
