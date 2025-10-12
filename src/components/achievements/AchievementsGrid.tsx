"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { ApiAchievement } from "@/types/achievements";

export function AchievementsGrid({
  achievements,
}: {
  achievements: ApiAchievement[];
}) {
  const onOpen = (a: ApiAchievement) => {
    if (a.unlocked) {
      toast.success(`Achievement unlocked: ${a.title}`);
    } else {
      toast(`Achievement: ${a.title}`, { description: a.description });
    }
  };

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((ach) => {
        const isUnlocked = ach.unlocked;
        return (
          <button
            key={ach.id}
            onClick={() => onOpen(ach)}
            className="text-left"
          >
            <Card
              className={`transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border-muted/50 ${
                isUnlocked ? "" : "opacity-75"
              }`}
            >
              <CardHeader className="flex flex-row items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    isUnlocked
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span className="text-base font-semibold">
                    {String(ach.title?.[0] ?? "A").toUpperCase()}
                  </span>
                </div>
                <div className="grid gap-1">
                  <CardTitle className="text-lg">{ach.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <CardDescription>Achievement</CardDescription>
                    <Badge
                      variant={isUnlocked ? "default" : "secondary"}
                      className="h-5 px-2 text-xs"
                    >
                      {isUnlocked ? "Unlocked" : "Locked"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {ach.description}
                </p>
              </CardContent>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
