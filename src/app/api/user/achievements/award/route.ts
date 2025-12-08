import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  awardAchievement,
  type AchievementKey,
} from "@/lib/achievements/service";
import { handleApiError } from "@/lib/api-error";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  let achievementKey: AchievementKey;
  try {
    const body = await request.json();
    achievementKey = body?.achievementKey;

    if (!achievementKey) {
      return NextResponse.json(
        { error: "Achievement key required" },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  try {
    const wasAwarded = await awardAchievement(userId, achievementKey);

    return NextResponse.json({
      success: true,
      awarded: wasAwarded,
      achievementKey,
    });
  } catch (error) {
    return handleApiError(error, { userId, achievementKey });
  }
}
