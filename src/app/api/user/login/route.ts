import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import { signToken } from "@/lib/jwt";
import {
  createApiHandler,
  // ValidationError,
  // AuthenticationError,
} from "@/lib/api-error";
// import { recordEventAndEvaluate } from "@/lib/achievements/service";

async function loginUser(request: NextRequest) {
  return request;
  // const body = await request.json();
  // const { email, password } = body;

  // if (!email || !password) {
  //   throw new ValidationError("Missing email or password");
  // }

  // const user = await prisma.user.findUnique({ where: { email } });
  // if (!user) {
  //   throw new AuthenticationError("Invalid credentials");
  // }

  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // if (!isPasswordValid) {
  //   throw new AuthenticationError("Invalid credentials");
  // }

  // const token = signToken({
  //   id: user.id,
  //   email: user.email,
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  // });

  // // Record login event and evaluate achievements
  // const awarded = await recordEventAndEvaluate(user.id, { type: "login" });

  // const response = NextResponse.json({
  //   user: {
  //     id: user.id,
  //     email: user.email,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //   },
  //   token,
  //   achievementsAwarded: awarded,
  // });

  // // Set token in cookie for middleware
  // response.cookies.set("auth-token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "lax",
  //   maxAge: 7 * 24 * 60 * 60, // 7 days
  // });

  // return response;
}

export const POST = createApiHandler(loginUser);
