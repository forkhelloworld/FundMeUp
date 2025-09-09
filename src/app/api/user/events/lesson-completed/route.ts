import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader } from "@/lib/jwt";
import { recordEventAndEvaluate } from "@/lib/achievements/service";

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

  let slug: string | undefined;
  try {
    const body = await request.json();
    slug = body?.slug;
  } catch {
    slug = undefined;
  }

  const awarded = await recordEventAndEvaluate(userId, {
    type: "lesson_completed",
    slug,
  });
  return NextResponse.json({ awarded });
}
