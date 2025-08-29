import Link from "next/link";
import { Button } from "@/components/ui/button";
import { lessons } from "@/constants/lessons";

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
          <div className="mt-10">
            <Link href="/lessons">
              <Button variant="outline">Back to lessons</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-slate-400">Lesson not found: {slug}</p>
        <Link href="/lessons">
          <Button variant="outline">Back to lessons</Button>
        </Link>
      </div>
    </div>
  );
}
