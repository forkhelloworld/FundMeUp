import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { recordLessonCompletion } from "@/lib/achievements/service";
import { handleApiError } from "@/lib/api-error";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await request.json();
    const slug = body?.slug || body?.lessonSlug;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Lesson slug is required" },
        { status: 400 }
      );
    }

    await recordLessonCompletion(userId, slug);
    return NextResponse.json({
      message: "Lesson completed successfully",
      success: true,
    });
  } catch (error) {
    return handleApiError(error, { userId });
  }
}
