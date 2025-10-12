"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { lessons } from "@/constants/lessons";

export function CompleteLessonButton({ slug }: { slug: string }) {
  const [submitting, setSubmitting] = useState(false);
  let nextSlug: string;
  try {
    nextSlug = lessons[lessons.findIndex((l) => l.slug === slug) + 1].slug;
  } catch {
    return null;
  }
  const onComplete = async () => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/user/events/lesson-completed", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.error || "Failed to record completion");

      const awarded: string[] = data?.awarded ?? [];
      if (awarded.length > 0) {
        for (const key of awarded) {
          if (key === "first-step") {
            toast.success("Achievement unlocked: First Step", {
              description: "Completed your first lesson",
            });
          } else {
            toast.success(`Achievement unlocked: ${key}`);
          }
        }
      } else {
        toast("Progress saved", { description: "Lesson completion recorded." });
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      toast.error("Could not complete lesson", { description: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Link href={`/lessons/${nextSlug}`}>
      <Button onClick={onComplete} disabled={submitting} variant="default">
        {submitting ? "Completing..." : "Next lesson"}
      </Button>
    </Link>
  );
}
