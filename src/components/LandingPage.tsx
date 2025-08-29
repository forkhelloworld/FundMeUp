"use client";
import { useVisibilityAnimation } from "@/hooks/useLandingAnimations";
import {
  Navigation,
  HeroSection,
  ProblemStatement,
  HowItWorksSection,
  FeaturesSection,
  TestimonialsSection,
  PricingSection,
  FinalCTASection,
  Footer,
} from "@/components/landing";

export function LandingPage() {
  const isVisible = useVisibilityAnimation();

  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection isVisible={isVisible} />
      <ProblemStatement />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
