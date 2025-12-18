import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { createApiHandlerWithContext, NotFoundError } from "@/lib/api-error";

async function getUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
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

// Context functions for better error logging
function getUserContext(request: NextRequest) {
  return {
    endpoint: "GET /api/user",
    method: request.method,
    url: request.url,
    userAgent: request.headers.get("user-agent"),
  };
}

export const GET = createApiHandlerWithContext(getUser, getUserContext);
