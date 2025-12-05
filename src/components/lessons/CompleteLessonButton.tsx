"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { lessons } from "@/constants/lessons";
import { useAchievementChecker } from "@/lib/achievement-checker";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/posthog";

export function CompleteLessonButton({ slug }: { slug: string }) {
  const t = useTranslations("lessons");
  const [submitting, setSubmitting] = useState(false);
  const { checkAndAwardLessonAchievement } = useAchievementChecker();

  let nextSlug: string;
  try {
    nextSlug = lessons[lessons.findIndex((l) => l.slug === slug) + 1].slug;
  } catch {
    return null;
  }

  const onComplete = async () => {
    try {
      setSubmitting(true);

      // Record lesson completion
      const res = await fetch("/api/user/events/lesson-completed", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      console.log("complete button res data ", data);
      if (!res.ok)
        throw new Error(data?.error || t("errors.failedToRecordCompletion"));

      trackEvent("lesson_completed", { slug });

      // Check and award lesson achievements (only one per call)
      await checkAndAwardLessonAchievement();
    } catch (e) {
      console.log(e);
      const message =
        e instanceof Error ? e.message : t("errors.somethingWentWrong");
      toast.error(t("errors.couldNotCompleteLesson"), { description: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Link href={`/lessons/${nextSlug}`}>
      <Button onClick={onComplete} disabled={submitting} variant="default">
        {submitting
          ? t("navigation.completing")
          : t("navigation.nextLessonButton")}
      </Button>
    </Link>
  );
}
