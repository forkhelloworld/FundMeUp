import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader } from "@/lib/jwt";
import {
  awardAchievement,
  type AchievementKey,
} from "@/lib/achievements/service";
import { handleApiError } from "@/lib/api-error";

interface JwtPayloadWithId {
  id: string;
}

export async function POST(request: NextRequest) {
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
