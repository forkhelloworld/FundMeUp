import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { StatsPreview } from "./StatsPreview";

interface HeroSectionProps {
  isVisible: boolean;
}

const AnimatedBackground = () => (
  <div className="absolute inset-0 z-0" aria-hidden="true">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-spin"
      style={{ animationDuration: "20s" }}
    />
    <div className="absolute top-20 left-20 w-4 h-4 bg-emerald-400 rounded-full animate-bounce" />
    <div className="absolute top-40 right-32 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-500" />
    <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-1000" />
  </div>
);

export const HeroSection = ({ isVisible }: HeroSectionProps) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <AnimatedBackground />
    <div
      className={`relative z-10 text-center px-4 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <Badge
        variant="outline"
        className="mb-6 border-emerald-400/50 text-emerald-400 px-4 py-2"
      >
        🚀 Start Your Financial Journey
      </Badge>

      <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
        <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Don't lose your money!
        </span>
        <br />
        <span className="text-white">Learn to Invest.</span>
      </h1>

      <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
        Interactive, gamified finance education built for the digital
        generation.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <Link href="/login">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 group"
          >
            Start Free
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <StatsPreview />
    </div>
  </section>
);
