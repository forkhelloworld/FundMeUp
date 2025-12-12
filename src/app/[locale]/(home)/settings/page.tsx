"use client";

import { UserProfileForm } from "@/components/settings/UserProfileForm";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FeedbackForm } from "@/components/FeedbackForm";

export default function SettingsPage() {
  const t = useTranslations("settings");
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6 md:py-8 space-y-6 md:space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>
      <UserProfileForm />

      <div className="border border-slate-700/70 rounded-xl p-4 sm:p-5 bg-slate-900/60">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Feedback</h2>
            <p className="text-sm text-slate-400">
              Tell us what to improve in settings and profile.
            </p>
          </div>
          <Button
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={() => setShowFeedback(true)}
          >
            Leave feedback
          </Button>
        </div>
      </div>

      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md">
            <FeedbackForm
              context="settings:profile"
              onSuccess={() => setShowFeedback(false)}
              onCancel={() => setShowFeedback(false)}
              onSkip={() => setShowFeedback(false)}
              showEmail
            />
          </div>
        </div>
      )}
    </div>
  );
}
