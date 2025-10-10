"use client";
import { FICalculator } from "@/components/lessons/FICalculator";
import { PortfolioCalculator } from "@/components/lessons/PortfolioCalculator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function SimulationsPage() {
  const t = useTranslations("simulations.page");

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6 md:py-8 space-y-6 md:space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        {t("title")}
      </h1>
      <div>
        <Card className="mb-6 md:mb-8">
          <CardHeader>
            <CardTitle>{t("configureSimulation")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {t("setupDescription")}
            </p>
            <Button asChild>
              <Link href="/settings">{t("goToSettings")}</Link>
            </Button>
          </CardContent>
        </Card>
        <div className="rounded-lg border bg-card p-4 md:p-6 shadow-sm">
          <FICalculator />
        </div>
        <div className="mt-6 md:mt-8 rounded-lg border bg-card p-4 md:p-6 shadow-sm">
          <PortfolioCalculator />
        </div>
      </div>
    </div>
  );
}
