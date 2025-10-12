import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt";
import {
  createApiHandlerWithContext,
  AuthenticationError,
  ValidationError,
  NotFoundError,
} from "@/lib/api-error";
import * as z from "zod";

const formSchema = z
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
  })
  .refine((v) => v.selectedFIAge > v.currentAge, {
    message: "Target FI age must be greater than current age",
    path: ["selectedFIAge"],
  })
  .refine((v) => v.monthlyIncome >= v.monthlyExpenses, {
    message: "Expenses should not exceed income",
    path: ["monthlyExpenses"],
  });

async function createSimulation(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    throw new AuthenticationError();
  }

  const payload = verifyToken(token);
  if (!payload || typeof payload !== "object" || !("id" in payload)) {
    throw new AuthenticationError("Invalid or expired token");
  }

  const userId = payload.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const body = await request.json();
  const validation = formSchema.safeParse(body);

  if (!validation.success) {
    throw new ValidationError("Invalid simulation data");
  }
  const {
    currentAge,
    selectedFIAge,
    currentNetWorth,
    monthlyIncome,
    monthlyExpenses,
  } = validation.data;

  const userProfile = await prisma.userProfile.upsert({
    where: { userId },
    update: {
      age: currentAge,
      retirementAge: selectedFIAge,
      currentNetWorth,
      monthlyIncome,
      monthlyExpenses,
    },
    create: {
      userId,
      age: currentAge,
      retirementAge: selectedFIAge,
      currentNetWorth,
      monthlyIncome,
      monthlyExpenses,
      riskTolerance: "MODERATE",
    },
  });
  // Convert string fields back to numbers for consistent API response
  const responseProfile = {
    ...userProfile,
    age: Number(userProfile.age),
    retirementAge: Number(userProfile.retirementAge),
    currentNetWorth: Number(userProfile.currentNetWorth),
    monthlyIncome: Number(userProfile.monthlyIncome),
    monthlyExpenses: Number(userProfile.monthlyExpenses),
  };

  return NextResponse.json({ userProfile: responseProfile });
}

function createSimulationContext(request: NextRequest) {
  return {
    endpoint: "POST /api/user/profile",
    method: request.method,
    url: request.url,
    userAgent: request.headers.get("user-agent"),
  };
}

async function getSimulation(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    throw new AuthenticationError();
  }

  const payload = verifyToken(token);
  if (!payload || typeof payload !== "object" || !("id" in payload)) {
    throw new AuthenticationError("Invalid or expired token");
  }

  const userId = payload.id;
  const userProfile = await prisma.userProfile.findUnique({
    where: { userId },
  });

  if (!userProfile) {
    throw new NotFoundError("User profile not found");
  }

  return NextResponse.json({
    currentAge: userProfile.age,
    selectedFIAge: userProfile.retirementAge,
    currentNetWorth: userProfile.currentNetWorth,
    monthlyIncome: userProfile.monthlyIncome,
    monthlyExpenses: userProfile.monthlyExpenses,
    riskTolerance: userProfile.riskTolerance,
  });
}

function getSimulationContext(request: NextRequest) {
  return {
    endpoint: "GET /api/user/profile",
    method: request.method,
    url: request.url,
    userAgent: request.headers.get("user-agent"),
  };
}

export const GET = createApiHandlerWithContext(
  getSimulation,
  getSimulationContext
);
export const POST = createApiHandlerWithContext(
  createSimulation,
  createSimulationContext
);
