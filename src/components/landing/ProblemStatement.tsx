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
  <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 xl:w-96 xl:h-96 mx-auto">
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
        strokeWidth="16"
      />
      <circle
        cx="100"
        cy="100"
        r={CIRCLE_RADIUS}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="16"
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
      <div className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-red-400 mb-1 sm:mb-2">
        {count}%
      </div>
      <div className="text-slate-400 text-center text-xs sm:text-sm">
        of people
        <br />
        don&apos;t invest
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
    className={`flex items-start gap-3 sm:gap-4 transition-all duration-700 ease-out ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}
    style={{
      transitionDelay: `${index * 200}ms`,
    }}
  >
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 ${point.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
    >
      <span className={`${point.textColor} text-lg sm:text-xl`}>
        {point.emoji}
      </span>
    </div>
    <div>
      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
        {point.title}
      </h3>
      <p className="text-slate-400 text-sm sm:text-base">{point.description}</p>
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
    <section ref={sectionRef} className="py-16 sm:py-20 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-10 sm:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Financial literacy is low.{" "}
            <span className="text-red-400">70% of people</span> don&apos;t
            invest.
          </h2>
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl md:max-w-3xl mx-auto">
            Most people miss out on the power of investing early. FundMeUp is
            here to change that with interactive, personalized learning for
            everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
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

          <div className="space-y-5 sm:space-y-6">
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
