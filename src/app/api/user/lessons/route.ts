import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { handleApiError, NotFoundError } from "@/lib/api-error";

interface JwtPayloadWithId {
  id: string;
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cookieToken = request.cookies.get("auth-token")?.value || null;
  const rawToken = extractTokenFromHeader(authHeader) || cookieToken;
  const payload = rawToken
    ? (verifyToken(rawToken) as JwtPayloadWithId | null)
    : null;

  const userId = payload?.id ?? null;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundError(`User not found`);
    }

    // Get user's lessons
    const userLessons = await prisma.userLesson.findMany({
      where: { userId },
      select: {
        lessonSlug: true,
        status: true,
        startedAt: true,
        completedAt: true,
      },
      orderBy: { startedAt: "asc" },
    });

    return NextResponse.json({
      lessons: userLessons.map((ul) => ({
        slug: ul.lessonSlug,
        status: ul.status,
        startedAt: ul.startedAt,
        completedAt: ul.completedAt,
        progress: ul.status === "COMPLETED" ? 100 : 0,
      })),
      completedLessons: userLessons
        .filter((ul) => ul.status === "COMPLETED")
        .map((ul) => ({
          slug: ul.lessonSlug,
          status: ul.status,
          startedAt: ul.startedAt,
          completedAt: ul.completedAt,
          progress: 100,
        })),
    });
  } catch (error) {
    return handleApiError(error, { userId });
  }
}
