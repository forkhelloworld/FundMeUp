"use client";
import { CompleteLessonButton } from "@/components/lessons/CompleteLessonButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface LessonContentProps {
  slug: string;
  locale: string;
}

export function LessonContent({ slug }: LessonContentProps) {
  const t = useTranslations("lessons");

  return (
    <div className="mt-8 md:mt-10 flex items-center gap-3">
      <Link href={`/lessons`}>
        <Button variant="outline">{t("navigation.backToLessons")}</Button>
      </Link>
      <CompleteLessonButton slug={slug} />
    </div>
  );
}
