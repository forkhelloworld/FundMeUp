import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";
import { PRICING_FEATURES } from "@/constants/landing";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Link from "next/link";

export const PricingSection = () => {
  const { isVisible, elementRef } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "-50px",
  });

  return (
    <section id="pricing" ref={elementRef} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          style={{ transitionDelay: "300ms" }}
        >
          <Card className="bg-slate-800/30 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold mb-2">
                Free Tier
              </CardTitle>
              <div className="text-4xl font-black text-emerald-400 mb-4">
                $0
              </div>
              <CardDescription>
                All core features, no credit card required
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {PRICING_FEATURES.map((feature) => (
                <div key={feature.id} className="flex items-center gap-3">
                  <FaCheck className="text-emerald-400 flex-shrink-0" />
                  <span>{feature.text}</span>
                </div>
              ))}
              <Link href='/login'>
                <Button className="w-full bg-slate-700 hover:bg-slate-600 mt-6">
                  Start Free
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
