"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

interface FeedbackFormProps {
  context: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  onSkip?: () => void;
  showEmail?: boolean;
  defaultEmail?: string;
}

export function FeedbackForm({
  context,
  onSuccess,
  onCancel,
  onSkip,
  showEmail = false,
  defaultEmail,
}: FeedbackFormProps) {
  const t = useTranslations("feedback");
  const locale = useLocale();
  const [email, setEmail] = useState(defaultEmail || "");
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [comment, setComment] = useState("");
  const [whatLiked, setWhatLiked] = useState("");
  const [whatMissing, setWhatMissing] = useState("");
  const [wouldPay, setWouldPay] = useState<number | undefined>(undefined);
  const [wouldRecommend, setWouldRecommend] = useState<number | undefined>(
    undefined
  );
  const [howFound, setHowFound] = useState("");
  const [wantsPremiumTrial, setWantsPremiumTrial] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Required choice questions must be selected
    if (
      rating === undefined ||
      wouldPay === undefined ||
      wouldRecommend === undefined
    ) {
      toast.error(t("validation.requiredOptions"));
      return;
    }

    if (
      comment.length > 1000 ||
      whatLiked.length > 500 ||
      whatMissing.length > 500
    ) {
      toast.error(t("validation.textTooLong"));
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: showEmail ? email : undefined,
          context,
          rating,
          comment: comment.trim() || undefined,
          whatLiked: whatLiked.trim() || undefined,
          whatMissing: whatMissing.trim() || undefined,
          wouldPay: wouldPay !== undefined ? wouldPay : undefined,
          wouldRecommend:
            wouldRecommend !== undefined ? wouldRecommend : undefined,
          howFound: howFound.trim() || undefined,
          wantsPremiumTrial,
          locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("errors.submitFailed"));
      }

      if (data.feedback?.eligibleForTrial) {
        toast.success(t("success.withTrial"), {
          description: t("success.trialDescription"),
        });
      } else {
        toast.success(t("success.default"));
      }

      // Reset form
      setRating(undefined);
      setComment("");
      setWhatLiked("");
      setWhatMissing("");
      setWouldPay(undefined);
      setWouldRecommend(undefined);
      setHowFound("");
      setWantsPremiumTrial(false);

      onSuccess?.();
    } catch (error) {
      console.error("Feedback submission error:", error);
      toast.error(t("errors.submitFailed"), {
        description:
          error instanceof Error ? error.message : t("errors.unknown"),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="bg-slate-900/95 border-slate-700 shadow-xl max-h-[90vh] overflow-y-auto">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {showEmail && (
            <div className="space-y-2">
              <Label htmlFor="email">
                {t("email")}{" "}
                <span className="text-slate-400">({t("optional")})</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>{t("rating")}</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`
                    flex-1 h-10 rounded-md border transition-all font-semibold
                    ${
                      rating === value
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-400"
                        : "bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500"
                    }
                  `}
                >
                  {value}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400">{t("ratingHint")}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatLiked">
              {t("whatLiked")}{" "}
              <span className="text-slate-400">({t("optional")})</span>
            </Label>
            <Textarea
              id="whatLiked"
              value={whatLiked}
              onChange={(e) => setWhatLiked(e.target.value)}
              placeholder={t("whatLikedPlaceholder")}
              rows={2}
              maxLength={500}
            />
            <p className="text-xs text-slate-400">
              {whatLiked.length}/500 {t("characters")}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatMissing">
              {t("whatMissing")}{" "}
              <span className="text-slate-400">({t("optional")})</span>
            </Label>
            <Textarea
              id="whatMissing"
              value={whatMissing}
              onChange={(e) => setWhatMissing(e.target.value)}
              placeholder={t("whatMissingPlaceholder")}
              rows={2}
              maxLength={500}
            />
            <p className="text-xs text-slate-400">
              {whatMissing.length}/500 {t("characters")}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wouldPay">{t("wouldPay")}</Label>
            <div className="flex gap-2 flex-wrap">
              {[0, 5, 10, 15, 20, 30, 50].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setWouldPay(value)}
                  className={`
                    px-4 py-2 rounded-md border transition-all text-sm
                    ${
                      wouldPay === value
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-400"
                        : "bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500"
                    }
                  `}
                >
                  {value === 0 ? t("wouldNotPay") : `$${value}/mo`}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400">{t("wouldPayHint")}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wouldRecommend">{t("wouldRecommend")}</Label>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setWouldRecommend(value)}
                  className={`
                    flex-1 h-8 rounded border transition-all text-xs
                    ${
                      wouldRecommend === value
                        ? value >= 9
                          ? "bg-emerald-500/20 border-emerald-400 text-emerald-400"
                          : value >= 7
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                          : "bg-yellow-500/20 border-yellow-400 text-yellow-400"
                        : "bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500"
                    }
                  `}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>{t("notLikely")}</span>
              <span>{t("veryLikely")}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="howFound">
              {t("howFound")}{" "}
              <span className="text-slate-400">({t("optional")})</span>
            </Label>
            <Input
              id="howFound"
              value={howFound}
              onChange={(e) => setHowFound(e.target.value)}
              placeholder={t("howFoundPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">
              {t("comment")}{" "}
              <span className="text-slate-400">({t("optional")})</span>
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("commentPlaceholder")}
              rows={3}
              maxLength={1000}
            />
            <p className="text-xs text-slate-400">
              {comment.length}/1000 {t("characters")}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="wantsPremiumTrial"
              checked={wantsPremiumTrial}
              onChange={(e) => setWantsPremiumTrial(e.target.checked)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
            />
            <Label
              htmlFor="wantsPremiumTrial"
              className="text-sm cursor-pointer"
            >
              {t("wantsPremiumTrial")}
            </Label>
          </div>

          <div className="flex gap-2 pt-2">
            {onSkip && (
              <Button
                type="button"
                variant="ghost"
                onClick={onSkip}
                disabled={submitting}
                className="flex-1 text-slate-400 hover:text-slate-200"
              >
                {t("skip")}
              </Button>
            )}
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={submitting}
                className="flex-1"
              >
                {t("cancel")}
              </Button>
            )}
            <Button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
            >
              {submitting ? t("submitting") : t("submit")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
