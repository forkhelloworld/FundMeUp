"use client";
import { useUserStore } from "@/lib/user-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  BookOpen,
  Trophy,
  BarChart2,
  TrendingUp,
  Calendar,
  User,
  ArrowRight,
  Zap,
  Brain,
  DollarSign,
  ChevronRight,
  Play,
  Award,
  Sparkles,
} from "lucide-react";
import { lessons } from "@/constants/lessons";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LucideIcon } from "lucide-react";
import { FeedbackForm } from "@/components/FeedbackForm";

interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  gradient: string;
  priority: "high" | "medium" | "low";
}

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const { user, achievements } = useUserStore();

  const achievementProgress = {
    total: achievements.length,
    unlocked: achievements.filter((a) => a.unlocked).length,
    percentage:
      achievements.length > 0
        ? Math.round(
            (achievements.filter((a) => a.unlocked).length /
              achievements.length) *
              100
          )
        : 0,
  };
  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const [showFeedback, setShowFeedback] = useState(false);

  // Personalized quick actions based on user progress
  const quickActions: QuickAction[] = [
    {
      title: t("quickActions.continueLearning.title"),
      description: t("quickActions.continueLearning.description"),
      icon: BookOpen,
      href: "/lessons",
      color: "text-emerald-400",
      gradient: "from-emerald-400/20 to-emerald-500/20",
      priority: "high",
    },
    {
      title: t("quickActions.aiBuddy.title"),
      description: t("quickActions.aiBuddy.description"),
      icon: Brain,
      href: "/ai-buddy",
      color: "text-emerald-400",
      gradient: "from-emerald-400/20 to-emerald-500/20",
      priority: "high",
    },
    {
      title: t("quickActions.simulations.title"),
      description: t("quickActions.simulations.description"),
      icon: BarChart2,
      href: "/simulations",
      color: "text-emerald-400",
      gradient: "from-emerald-400/20 to-emerald-500/20",
      priority: "medium",
    },
    {
      title: t("quickActions.achievements.title"),
      description: t("quickActions.achievements.description"),
      icon: Trophy,
      href: "/achievements",
      color: "text-emerald-400",
      gradient: "from-emerald-400/20 to-emerald-500/20",
      priority: "medium",
    },
  ];

  // Get current time for personalized greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("welcome.greeting.morning");
    if (hour < 17) return t("welcome.greeting.afternoon");
    return t("welcome.greeting.evening");
  };

  // Calculate learning streak (mock data)
  const learningStreak = 7;
  const portfolioValue = 12450;
  const portfolioChange = 12.5;

  return (
    <div className="min-h-screen bg-slate-950 pt-[calc(4.5rem+env(safe-area-inset-top,0px))]">
      <div className="container mx-auto max-w-7xl px-3 sm:px-4 py-5 md:py-8 space-y-6 pb-[calc(5rem+env(safe-area-inset-bottom,0px))]">
        {/* Compact Welcome Section */}
        <div className="bg-slate-800/50 border border-emerald-400/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                  {getGreeting()}, {user?.firstName || "Investor"}!
                </h1>
                <p className="text-slate-300 text-sm sm:text-base">
                  {t("welcome.motivation")}
                </p>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="hidden md:flex gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">
                  {achievementProgress.unlocked}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">
                  {learningStreak}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid - Bento Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Primary Action Cards - High Priority */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* Learning CTA - Progress temporarily hidden */}
            <Card className="bg-slate-800/50 border-emerald-400/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                  </div>
                  {t("progress.learningJourney")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-300 text-sm sm:text-base">
                  {t("progress.continueJourney")}
                </p>
                <div className="p-4 rounded-xl bg-emerald-400/10 border border-emerald-400/20">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                        <Play className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white leading-tight">
                          {lessons[0]?.title || t("progress.learningJourney")}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {t("progress.review")}
                        </p>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="bg-emerald-400 hover:bg-emerald-500 text-white w-full sm:w-auto"
                    >
                      <Link href="/lessons">
                        {t("progress.continue")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-slate-800/50 border-emerald-400/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-emerald-400" />
                  </div>
                  {t("achievements.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {unlockedAchievements.length > 0 ? (
                  <div className="space-y-4">
                    {unlockedAchievements.slice(0, 2).map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-xl bg-emerald-400/10 border border-emerald-400/20 hover:border-emerald-400/30 transition-all duration-200"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                          <Award className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white leading-tight">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {achievement.description}
                          </p>
                        </div>
                        <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30 shrink-0">
                          {t("achievements.unlocked")}
                        </Badge>
                      </div>
                    ))}
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-slate-600 hover:bg-slate-800"
                    >
                      <Link href="/achievements">
                        {t("achievements.viewAll")}
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">
                      {t("achievements.noAchievements")}
                    </h3>
                    <p className="text-slate-400 mb-4">
                      {t("achievements.motivation")}
                    </p>
                    <Button
                      asChild
                      className="bg-emerald-400 hover:bg-emerald-500 text-white"
                    >
                      <Link href="/lessons">
                        {t("achievements.startLearning")}
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Quick Actions & Stats */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-emerald-400/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-emerald-400" />
                  </div>
                  {t("quickActions.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.href}
                    asChild
                    variant="ghost"
                    className={`w-full justify-start h-auto p-3 hover:bg-slate-800/50 transition-all duration-200 group ${action.gradient}`}
                  >
                    <Link href={action.href}>
                      <div className="flex items-center gap-3 w-full min-w-0">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-200 flex-shrink-0`}
                        >
                          <action.icon className={`w-5 h-5 ${action.color}`} />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors truncate">
                            {action.title}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {action.description}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                      </div>
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="space-y-4">
              {/* Learning Streak */}
              <Card className="bg-slate-800/50 border-emerald-400/20 hover:border-emerald-400/30 transition-all duration-300">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-emerald-300 font-medium">
                        {t("stats.learningStreak")}
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {learningStreak}
                      </p>
                      <p className="text-xs text-emerald-400">
                        {t("stats.daysInRow")}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Value */}
              <Card className="bg-slate-800/50 border-emerald-400/20 hover:border-emerald-400/30 transition-all duration-300">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-emerald-300 font-medium">
                        {t("stats.portfolioValue")}
                      </p>
                      <p className="text-2xl font-bold text-white">
                        ${portfolioValue.toLocaleString()}
                      </p>
                      <p className="text-xs text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />+{portfolioChange}%{" "}
                        {t("stats.thisMonth")}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                      <DollarSign className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Profile Card */}
            <Card className="bg-slate-800/50 border-emerald-400/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-emerald-400" />
                  </div>
                  {t("profile.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                      <User className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-slate-400">{user?.email}</p>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-emerald-400/30 hover:bg-emerald-400/10 text-emerald-300 hover:text-emerald-200"
                  >
                    <Link href="/settings">{t("profile.manageProfile")}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Card */}
            <Card className="bg-slate-800/50 border-emerald-400/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-300">
                  Share what’s working and what to improve.
                </p>
                <Button
                  className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-950"
                  onClick={() => setShowFeedback(true)}
                >
                  Leave feedback
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md">
            <FeedbackForm
              context="dashboard:main"
              onSuccess={() => setShowFeedback(false)}
              onCancel={() => setShowFeedback(false)}
              onSkip={() => setShowFeedback(false)}
              showEmail
              defaultEmail={user?.email}
            />
          </div>
        </div>
      )}
    </div>
  );
}
