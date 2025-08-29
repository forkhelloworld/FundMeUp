import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHowItWorksStepsWithIcons } from "@/utils/landingUtils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const HowItWorksSection = () => {
  const steps = getHowItWorksStepsWithIcons();
  const { isVisible, elementRef } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "-50px",
  });

  return (
    <section
      id="how-it-works"
      ref={elementRef}
      className="py-20 px-4 bg-slate-900/50"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Three simple steps to transform your financial future through
            interactive learning.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={step.id}
              className={`bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-700 ease-out hover:transform hover:scale-105 relative overflow-hidden group ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${step.color}-400 to-${step.color}-600`}
              />
              <CardHeader className="text-center pb-4">
                <div className="text-6xl font-black text-slate-800 mb-4">
                  {step.step}
                </div>
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <CardTitle className="text-2xl font-bold">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-center leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
