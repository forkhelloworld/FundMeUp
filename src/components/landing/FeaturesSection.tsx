import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFeaturesWithIcons } from "@/utils/landingUtils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const FeaturesSection = () => {
  const t = useTranslations("landing.features");
  const features = getFeaturesWithIcons();
  const { isVisible, elementRef } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "-50px",
  });

  return (
    <section
      id="features"
      ref={elementRef}
      className="py-16 sm:py-20 px-3 sm:px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {t("title")}{" "}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              className={`bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 transition-all duration-700 ease-out group cursor-pointer hover:transform hover:scale-105 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <CardHeader className="text-center">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-base sm:text-lg font-bold">
                  {t(`items.${feature.id}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm sm:text-base text-center leading-relaxed">
                  {t(`items.${feature.id}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          className={`mt-10 sm:mt-12 flex justify-center transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <Card className="bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 transition-all duration-300 group cursor-pointer hover:transform hover:scale-105 max-w-md w-full">
            <CardHeader className="text-center">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-purple-400 text-2xl sm:text-3xl">★</span>
              </div>
              <CardTitle className="text-base sm:text-lg font-bold">
                {t("items.short-modules.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4">
                {t("items.short-modules.description")}
              </p>
              <Link href="/register">
                <Button
                  size="sm"
                  className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white"
                >
                  {t("items.short-modules.cta")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
