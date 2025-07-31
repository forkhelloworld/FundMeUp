import { STATS_DATA } from "@/constants/landing";

export const StatsPreview = () => (
  <div className="relative max-w-4xl mx-auto">
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS_DATA.map((stat) => (
          <div key={stat.id} className="text-center">
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-slate-400">{stat.label}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
