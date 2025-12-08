import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { handleApiError, NotFoundError } from "@/lib/api-error";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

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
