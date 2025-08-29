import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { StatsPreview } from "./StatsPreview";
import { useTranslations } from "next-intl";

interface HeroSectionProps {
  isVisible: boolean;
}

const AnimatedBackground = () => (
  <div className="absolute inset-0 z-0" aria-hidden="true">
    <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 xl:w-[28rem] xl:h-[28rem] bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 xl:w-[24rem] xl:h-[24rem] bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px] xl:w-[760px] xl:h-[760px] bg-purple-500/10 rounded-full blur-3xl animate-spin"
      style={{ animationDuration: "20s" }}
    />
    <div className="absolute top-10 left-6 sm:top-20 sm:left-20 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full animate-bounce" />
    <div className="absolute top-38 right-6 sm:top-40 sm:right-32 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-bounce delay-500" />
    <div className="absolute bottom-24 left-1/3 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-400 rounded-full animate-bounce delay-1000" />
  </div>
);

export const HeroSection = ({ isVisible }: HeroSectionProps) => {
  const t = useTranslations("landing.hero");
  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <div
        className={`relative z-10 text-center px-3 sm:px-4 md:px-6 xl:px-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="mt-20 md+:mt-12 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-black mb-4 sm:mb-6 leading-[1.15]">
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t("title")}
          </span>
          <br />
          <span className="text-white">Learn to Invest.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-2xl text-slate-400 mb-6 sm:mb-8 max-w-2xl md:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto leading-relaxed">
          Interactive, gamified finance education built for the digital
          generation.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10 sm:mb-12">
          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg 2xl:text-xl 2xl:px-10 2xl:py-5 font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 group"
            >
              {t("cta")}
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <StatsPreview />
      </div>
    </section>
  );
};
