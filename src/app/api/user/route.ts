import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { extractTokenFromHeader, signToken, verifyToken } from "@/lib/jwt";
import {
  createApiHandlerWithContext,
  AuthenticationError,
  ValidationError,
  NotFoundError,
  ConflictError,
} from "@/lib/api-error";

async function getUser(request: NextRequest) {
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

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
}

async function createUser(request: NextRequest) {
  const body = await request.json();
  const { firstName, lastName, email, password } = body;

  if (!firstName || !lastName || !email || !password) {
    throw new ValidationError("Missing required fields");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ConflictError("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  const token = signToken({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const response = NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    token,
  });

  // Set token in cookie for middleware
  response.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return response;
}

// Context functions for better error logging
function getUserContext(request: NextRequest) {
  return {
    endpoint: "GET /api/user",
    method: request.method,
    url: request.url,
    userAgent: request.headers.get("user-agent"),
  };
}

function createUserContext(request: NextRequest) {
  return {
    endpoint: "POST /api/user",
    method: request.method,
    url: request.url,
    userAgent: request.headers.get("user-agent"),
  };
}

export const GET = createApiHandlerWithContext(getUser, getUserContext);
export const POST = createApiHandlerWithContext(createUser, createUserContext);
