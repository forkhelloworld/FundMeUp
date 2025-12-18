import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { createApiHandlerWithContext } from "@/lib/api-error";

interface FeedbackBody {
  email?: string;
  context: string;
  rating?: number;
  comment?: string;
  whatLiked?: string;
  whatMissing?: string;
  wouldPay?: number;
  wouldRecommend?: number;
  howFound?: string;
  wantsPremiumTrial?: boolean;
  locale?: string;
}

async function createFeedback(request: NextRequest) {
  const session = await auth();
  const body: FeedbackBody = await request.json();

  // Validate required fields
  if (!body.context) {
    return NextResponse.json({ error: "Context is required" }, { status: 400 });
  }

  // Validate rating if provided
  if (body.rating !== undefined && (body.rating < 1 || body.rating > 5)) {
    return NextResponse.json(
      { error: "Rating must be between 1 and 5" },
      { status: 400 }
    );
  }

  // Check if user completed a lesson (for premium trial eligibility)
  // Note: This only marks eligibility in the database. When premium is implemented,
  // you'll need to check eligibleForTrial flag and grant 7 days of premium access.
  let eligibleForTrial = false;
  if (session?.user?.id && body.context.startsWith("lesson:")) {
    const lessonSlug = body.context.replace("lesson:", "");
    const userLesson = await prisma.userLesson.findFirst({
      where: {
        userId: session.user.id,
        lessonSlug: lessonSlug,
        status: "COMPLETED",
      },
    });
    eligibleForTrial = !!userLesson;
  }

  // Validate wouldPay if provided
  if (body.wouldPay !== undefined && body.wouldPay < 0) {
    return NextResponse.json(
      { error: "Would pay must be 0 or greater" },
      { status: 400 }
    );
  }

  // Validate wouldRecommend if provided (NPS: 0-10)
  if (
    body.wouldRecommend !== undefined &&
    (body.wouldRecommend < 0 || body.wouldRecommend > 10)
  ) {
    return NextResponse.json(
      { error: "Would recommend must be between 0 and 10" },
      { status: 400 }
    );
  }

  // Create feedback
  const feedback = await prisma.feedback.create({
    data: {
      userId: session?.user?.id || null,
      email: body.email || session?.user?.email || null,
      context: body.context,
      rating: body.rating || null,
      comment: body.comment || null,
      whatLiked: body.whatLiked || null,
      whatMissing: body.whatMissing || null,
      wouldPay: body.wouldPay !== undefined ? body.wouldPay : null,
      wouldRecommend:
        body.wouldRecommend !== undefined ? body.wouldRecommend : null,
      howFound: body.howFound || null,
      wantsPremiumTrial: body.wantsPremiumTrial || false,
      eligibleForTrial: eligibleForTrial,
      locale: body.locale || "en",
    },
  });

  return NextResponse.json(
    {
      success: true,
      feedback: {
        id: feedback.id,
        eligibleForTrial: feedback.eligibleForTrial,
      },
    },
    { status: 201 }
  );
}

function getFeedbackContext(request: NextRequest) {
  return {
    endpoint: "POST /api/feedback",
    method: request.method,
    url: request.url,
    userAgent: request.headers.get("user-agent"),
  };
}

export const POST = createApiHandlerWithContext(
  createFeedback,
  getFeedbackContext
);

