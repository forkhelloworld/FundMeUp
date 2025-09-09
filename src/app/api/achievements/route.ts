import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, extractTokenFromHeader } from "@/lib/jwt";

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

  const all = await prisma.achievement.findMany({
    orderBy: { id: "asc" },
    select: { id: true, key: true, title: true, description: true },
  });

  let unlockedIds = new Set<string>();
  if (userId) {
    const unlocked = await prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true },
    });
    unlockedIds = new Set(unlocked.map((u) => u.achievementId));
  }

  const data = all.map((a) => ({
    id: a.id,
    key: a.key,
    title: a.title,
    description: a.description,
    unlocked: unlockedIds.has(a.id),
  }));
  return NextResponse.json({ achievements: data });
}
