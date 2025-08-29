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
import { lessons as constantsLessons } from "@/constants/lessons";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const categories = ["All", "Investing Basics", "Advanced", "Retirement"];

const LessonsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const lessons = constantsLessons;

  const basicLessons = lessons.filter(
    (lesson) => lesson.category === "Investing Basics"
  );
  const advancedLessons = lessons.filter(
    (lesson) => lesson.category !== "Investing Basics"
  );

  const filteredLessons = useMemo(() => {
    if (activeCategory === "All") {
      return lessons;
    }
    return lessons.filter((lesson) => lesson.category === activeCategory);
  }, [activeCategory, lessons]);

  const renderBasicLessonsCombined = () => (
    <Card className="col-span-full bg-gradient-to-br from-slate-900/80 to-emerald-900/20 border-2 border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 transform hover:-translate-y-1 group hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
      <CardHeader className="text-center pb-3 sm:pb-4">
        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
          🎓 Complete Investing Foundation
        </CardTitle>
        <p className="text-emerald-300 text-sm sm:text-base px-2 sm:px-4">
          Master the fundamentals of investing with our comprehensive beginner
          course
        </p>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          {basicLessons.map((lesson) => (
            <div key={lesson.id} className="text-center group/item">
              <div className="p-3 sm:p-4 bg-slate-800/50 rounded-lg border border-slate-700 group-hover/item:border-emerald-500/50 transition-all duration-300">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="p-2 bg-slate-700/50 rounded-full">
                    <lesson.icon className="text-lg sm:text-xl text-emerald-400" />
                  </div>
                </div>
                <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">
                  {lesson.title}
                </h4>
                <p
                  className="text-slate-400 text-xs sm:text-sm mb-3 overflow-hidden"
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
                  className="border-slate-600 text-slate-300 text-xs"
                >
                  {lesson.duration} min
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-4 sm:pt-6">
        <Link href="/lessons/why-you-should-invest">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-5 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Start Free Course
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
    <div className="px-4 py-6 md:p-6 bg-slate-950 text-white min-h-screen">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveCategory(category)}
            variant={activeCategory === category ? "default" : "outline"}
            className={`font-mono transition-all duration-300 rounded-full ${
              activeCategory === category
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-transparent"
                : "text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
        {activeCategory === "All" ? (
          <>
            {renderBasicLessonsCombined()}
            {renderAdvancedLessons()}
          </>
        ) : activeCategory === "Investing Basics" ? (
          renderBasicLessonsCombined()
        ) : (
          renderFilteredLessons()
        )}
      </div>
    </div>
  );
};

export default LessonsPage;
