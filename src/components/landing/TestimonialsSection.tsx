import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { TESTIMONIALS } from "@/constants/landing";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const TestimonialsSection = () => {
  const { isVisible, elementRef } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "-50px",
  });

  return (
    <section
      ref={elementRef}
      className="py-16 sm:py-20 px-3 sm:px-4 bg-slate-900/30"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="text-base sm:text-xl text-slate-400">
            What our users say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-700 ease-out hover:transform hover:scale-105 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <CardHeader className="text-center pb-3 sm:pb-4">
                <div
                  className="flex justify-center mb-2"
                  role="img"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <CardTitle className="text-base sm:text-lg">
                  {testimonial.name}
                </CardTitle>
                <CardDescription className="text-emerald-400 text-sm sm:text-base">
                  {testimonial.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <blockquote className="text-slate-300 text-center italic leading-relaxed text-sm sm:text-base">
                  &quot;{testimonial.content}&quot;
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
