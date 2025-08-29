import { FICalculator } from "@/components/lessons/FICalculator";
import { PortfolioCalculator } from "@/components/lessons/PortfolioCalculator";

export default function SimulationsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-6 md:py-8 space-y-6 md:space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        Simulations
      </h1>
      <div>
        <div className="rounded-lg border bg-card p-4 md:p-6 shadow-sm">
          <FICalculator />
        </div>
        <div className="mt-6 md:mt-8 rounded-lg border bg-card p-4 md:p-6 shadow-sm">
          <PortfolioCalculator />
        </div>
      </div>
    </div>
  );
}
