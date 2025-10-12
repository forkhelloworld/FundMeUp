import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const FinalCTASection = () => {
  const t = useTranslations("landing.finalCta");
  const { isVisible, elementRef } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "-50px",
  });

  return (
    <section
      ref={elementRef}
      className="py-16 sm:py-20 px-3 sm:px-4 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            {t("title")}
          </h2>
          <p className="text-base sm:text-xl text-slate-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          <div
            className="p-6 sm:p-8 max-w-md mx-auto transition-all duration-1000 ease-out"
            style={{ transitionDelay: "300ms" }}
          >
            <Link href="/register">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white h-11 sm:h-12 text-base sm:text-lg font-semibold"
              >
                {t("cta")}
                <FaArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
