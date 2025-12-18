"use client";
import LessonCard from "@/components/LessonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLessons } from "@/constants/lessons";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";

const LessonsPage = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState("all");

  const lessons = getLessons(t);

  const categories = [
    { key: "all", label: t("lessons.page.categories.all") },
    {
      key: "investingBasics",
      label: t("lessons.page.categories.investingBasics"),
    },
    { key: "advanced", label: t("lessons.page.categories.advanced") },
    { key: "retirement", label: t("lessons.page.categories.retirement") },
  ];

  const basicLessons = lessons.filter(
    (lesson) => lesson.category === t("lessons.category")
  );
  const advancedLessons = lessons.filter(
    (lesson) => lesson.category !== t("lessons.category")
  );

  const filteredLessons = useMemo(() => {
    if (activeCategory === "all") {
      return lessons;
    }
    return lessons.filter((lesson) => lesson.category === activeCategory);
  }, [activeCategory, lessons]);

  const renderBasicLessonsCombined = () => (
    <Card className="col-span-full bg-gradient-to-br from-slate-900/80 to-emerald-900/20 border-2 border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 transform hover:-translate-y-1 group hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
      <CardHeader className="text-center pb-2 sm:pb-4">
        <CardTitle className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 leading-tight">
          {t("lessons.page.title")}
        </CardTitle>
        <p className="text-emerald-300 text-sm sm:text-base px-2 sm:px-4">
          {t("lessons.page.subtitle")}
        </p>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          {basicLessons.map((lesson) => (
            <div key={lesson.id} className="text-center group/item">
              <div className="p-3 sm:p-4 bg-slate-800/50 rounded-lg border border-slate-700 group-hover/item:border-emerald-500/50 transition-all duration-300 h-full flex flex-col">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="p-2 bg-slate-700/50 rounded-full">
                    <lesson.icon className="text-base sm:text-xl text-emerald-400" />
                  </div>
                </div>
                <h4 className="font-semibold text-white mb-2 text-sm sm:text-base leading-snug line-clamp-2">
                  {lesson.title}
                </h4>
                <p
                  className="text-slate-400 text-xs sm:text-sm mb-3 flex-grow overflow-hidden leading-relaxed"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {lesson.description}
                </p>
                <Badge
                  variant="outline"
                  className="border-slate-600 text-slate-300 text-[11px] sm:text-xs mt-auto self-center"
                >
                  {lesson.duration} {t("lessons.page.minRead")}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-3 sm:pt-6">
        <Link href={`/${locale}/lessons/why-you-should-invest`}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-5 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            {t("lessons.page.startFreeCourse")}
            <FaArrowRight className="ml-2 sm:ml-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );

  const renderAdvancedLessons = () => (
    <>
      {advancedLessons.map((lesson, index) => (
        <div
          key={lesson.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <LessonCard
            title={lesson.title}
            description={lesson.description}
            duration={lesson.duration}
            icon={lesson.icon}
            progress={lesson.progress}
            slug={lesson.slug}
          />
        </div>
      ))}
    </>
  );

  const renderFilteredLessons = () => (
    <>
      {filteredLessons.map((lesson, index) => (
        <div
          key={lesson.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <LessonCard
            title={lesson.title}
            description={lesson.description}
            duration={lesson.duration}
            icon={lesson.icon}
            progress={lesson.progress}
            slug={lesson.slug}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className="px-3 sm:px-4 py-5 md:p-6 bg-slate-950 text-white min-h-screen pt-[calc(4.5rem+env(safe-area-inset-top,0px))]">
      <div className="mb-6 sm:mb-8 md:mb-12 -mx-3 sm:mx-0">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto px-3 sm:px-0 pb-2 sm:pb-0 snap-x snap-mandatory scroll-pl-3 sm:scroll-pl-0 [-webkit-overflow-scrolling:touch]">
          {categories.map((category) => (
            <Button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              variant={activeCategory === category.key ? "default" : "outline"}
              className={`font-mono transition-all duration-300 rounded-full whitespace-nowrap text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-2.5 snap-start ${
                activeCategory === category.key
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-transparent"
                  : "text-slate-200 border-slate-700 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto w-full pb-[calc(5rem+env(safe-area-inset-bottom,0px))]">
        {activeCategory === "all" ? (
          <>
            {renderBasicLessonsCombined()}
            {renderAdvancedLessons()}
          </>
        ) : activeCategory === "investingBasics" ? (
          renderBasicLessonsCombined()
        ) : (
          renderFilteredLessons()
        )}
      </div>
    </div>
  );
};

export default LessonsPage;
