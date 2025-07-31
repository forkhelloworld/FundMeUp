import {
  PROBLEM_POINTS,
  CIRCLE_RADIUS,
  CIRCLE_CIRCUMFERENCE,
} from "@/constants/landing";
import {
  useScrollCountAnimation,
  useScrollAnimation,
} from "@/hooks/useScrollAnimation";

const InteractiveChart = ({ count }: { count: number }) => (
  <div className="relative w-80 h-80 mx-auto">
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full transform -rotate-90"
      aria-label="Investment statistics chart"
    >
      <circle
        cx="100"
        cy="100"
        r={CIRCLE_RADIUS}
        fill="none"
        stroke="rgb(51 65 85)"
        strokeWidth="20"
      />
      <circle
        cx="100"
        cy="100"
        r={CIRCLE_RADIUS}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="20"
        strokeDasharray={CIRCLE_CIRCUMFERENCE}
        strokeDashoffset={CIRCLE_CIRCUMFERENCE * (1 - count / 100)}
        strokeLinecap="round"
        className="transition-all duration-2000 ease-out"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(239 68 68)" />
          <stop offset="100%" stopColor="rgb(249 115 22)" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="text-5xl font-bold text-red-400 mb-2">{count}%</div>
      <div className="text-slate-400 text-center text-sm">
        of people
        <br />
        don't invest
      </div>
    </div>
  </div>
);

const ProblemPoint = ({
  point,
  index,
  isVisible,
}: {
  point: (typeof PROBLEM_POINTS)[0];
  index: number;
  isVisible: boolean;
}) => (
  <div
    className={`flex items-start gap-4 transition-all duration-700 ease-out ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}
    style={{
      transitionDelay: `${index * 200}ms`,
    }}
  >
    <div
      className={`w-12 h-12 ${point.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
    >
      <span className={`${point.textColor} text-xl`}>{point.emoji}</span>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
      <p className="text-slate-400">{point.description}</p>
    </div>
  </div>
);

export const ProblemStatement = () => {
  // Use scroll-triggered count animation
  const { count, elementRef: chartRef } = useScrollCountAnimation(70, 500, {
    threshold: 0.3, // Trigger when 30% of the section is visible
    rootMargin: "-50px", // Start animation slightly before element is fully in view
  });

  // Use scroll animation for the entire section
  const { isVisible, elementRef: sectionRef } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "-100px",
  });

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Financial literacy is low.{" "}
            <span className="text-red-400">70% of people</span> don't invest.
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Most people miss out on the power of investing early. FundMeUp is
            here to change that with interactive, personalized learning for
            everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            ref={chartRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <InteractiveChart count={count} />
          </div>

          <div className="space-y-6">
            {PROBLEM_POINTS.map((point, index) => (
              <ProblemPoint
                key={point.id}
                point={point}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
