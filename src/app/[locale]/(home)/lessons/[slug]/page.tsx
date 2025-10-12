import { lessons } from "@/constants/lessons";
import { LessonContent } from "./LessonContent.tsx";

interface LessonPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ["en", "uk"];
  const params = [];

  for (const locale of locales) {
    for (const lesson of lessons) {
      params.push({ locale, slug: lesson.slug });
    }
  }

  return params;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, locale } = await params;

  try {
    const mod = await import(`@/lessons/${slug}.tsx`);
    const Content = mod.default as React.ComponentType;
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 prose prose-invert">
          <Content />
          <LessonContent slug={slug} locale={locale} />
        </div>
      </div>
    );
  } catch (e) {
    console.log(e);
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <LessonContent slug={slug} locale={locale} />
        </div>
      </div>
    );
  }
}
