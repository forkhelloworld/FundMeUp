import { CompleteLessonButton } from "@/components/lessons/CompleteLessonButton";
import { Button } from "@/components/ui/button";
import { lessons } from "@/constants/lessons";
import Link from "next/link";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;

  try {
    const mod = await import(`@/lessons/${slug}.tsx`);
    const Content = mod.default as React.ComponentType;
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 prose prose-invert">
          <Content />
          <div className="mt-8 md:mt-10 flex items-center gap-3">
            <Link href="/lessons">
              <Button variant="outline">Back to lessons</Button>
            </Link>
            <CompleteLessonButton slug={slug} />
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="mt-8 md:mt-10 flex items-center gap-3">
      <Link href="/lessons">
        <Button variant="outline">Back to lessons</Button>
      </Link>
      <CompleteLessonButton slug={slug} />
    </div>

  );
}
