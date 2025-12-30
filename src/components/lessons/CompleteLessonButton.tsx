"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { lessons } from "@/constants/lessons";
import { useAchievementChecker } from "@/lib/achievement-checker";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/posthog";
import { FeedbackForm } from "@/components/FeedbackForm";

export function CompleteLessonButton({ slug }: { slug: string }) {
  const t = useTranslations("lessons");
  const [submitting, setSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { checkAndAwardLessonAchievement } = useAchievementChecker();

  const currentIndex = lessons.findIndex((l) => l.slug === slug);
  const nextLesson = lessons[currentIndex + 1];
  const isLastLesson = currentIndex === lessons.length - 1;
  const nextSlug = nextLesson?.slug;

  // If slug is invalid, render nothing
  if (currentIndex === -1) return null;

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

      // Show feedback only after finishing the last lesson (course complete)
      if (isLastLesson) {
        setShowFeedback(true);
      } else if (nextSlug) {
        window.location.href = `/lessons/${nextSlug}`;
      }
    } catch (e) {
      console.log(e);
      const message =
        e instanceof Error ? e.message : t("errors.somethingWentWrong");
      toast.error(t("errors.couldNotCompleteLesson"), { description: message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFeedbackSuccess = () => {
    setShowFeedback(false);
    // After final course feedback, return to lessons overview
    window.location.href = `/lessons`;
  };

  const handleFeedbackCancel = () => {
    setShowFeedback(false);
    // Navigate to lessons overview even if feedback is cancelled
    window.location.href = `/lessons`;
  };

  const handleFeedbackSkip = () => {
    setShowFeedback(false);
    // Navigate to lessons overview when feedback is skipped
    window.location.href = `/lessons`;
  };

  return (
    <>
      {!showFeedback ? (
        <Button onClick={onComplete} disabled={submitting} variant="default">
          {submitting
            ? t("navigation.completing")
            : isLastLesson
            ? t("navigation.lessonCompleted")
            : t("navigation.nextLessonButton")}
        </Button>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md">
            <FeedbackForm
              context={`course:all-lessons`}
              onSuccess={handleFeedbackSuccess}
              onCancel={handleFeedbackCancel}
              onSkip={handleFeedbackSkip}
            />
          </div>
        </div>
      )}
    </>
  );
}
