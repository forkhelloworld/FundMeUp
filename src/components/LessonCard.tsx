import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { IconType } from "react-icons";
import Link from "next/link";

interface LessonCardProps {
  title: string;
  description: string;
  duration: number;
  icon: IconType;
  progress: number;
  slug: string;
}

const LessonCard: React.FC<LessonCardProps> = ({
  title,
  description,
  duration,
  progress,
  slug,
}) => {
  return (
    <Card className="flex flex-col h-full bg-slate-900/50 border-slate-800 hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1 group hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]">
      <CardHeader className="flex-row items-center gap-4">
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-slate-400 mb-4">{description}</p>
        <div className="w-full bg-slate-700 rounded-full h-2.5 mb-4">
          <div
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
          {duration} min read
        </Badge>
        <Link href={`/lessons/${slug}`}>
          <Button
            size="sm"
            className="bg-transparent text-emerald-400 group-hover:text-white group-hover:bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
          >
            {progress > 0 ? "Continue" : "Start Lesson"}
            <FaArrowRight className="ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
