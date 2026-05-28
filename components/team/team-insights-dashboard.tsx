"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const pitTrend = [
  { race: "Bahrain", pitTime: 2.48 },
  { race: "Jeddah", pitTime: 2.36 },
  { race: "Melbourne", pitTime: 2.29 },
  { race: "Suzuka", pitTime: 2.21 },
  { race: "Miami", pitTime: 2.18 },
];

const strategyShare = [
  { name: "One-Stop", value: 42 },
  { name: "Two-Stop", value: 33 },
  { name: "Undercut", value: 15 },
  { name: "Safety Car Response", value: 10 },
];

const comparisonData = [
  { team: "Apex GP", execution: 94, pitCrew: 91, strategy: 93 },
  { team: "Velocity One", execution: 90, pitCrew: 88, strategy: 89 },
  { team: "Quantum Racing", execution: 87, pitCrew: 92, strategy: 85 },
];

const COLORS = ["#22d3ee", "#f59e0b", "#ef4444", "#10b981"];

export default function TeamInsightsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
            Team Rating
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">93.1</h2>
          <p className="mt-2 text-sm text-white/60">
            Composite constructor performance score.
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Fastest Pit
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-cyan-300">2.18s</h2>
          <p className="mt-2 text-sm text-white/60">
            Best recorded pit-stop execution in recent rounds.
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Best Strategy Type
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-amber-300">One-Stop</h2>
          <p className="mt-2 text-sm text-white/60">
            Most effective strategic pattern in current model.
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400">
            Threat Index
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-rose-300">Medium</h2>
          <p className="mt-2 text-sm text-white/60">
            Rival execution pressure remains manageable.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Pit Performance
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Pit Stop Trend
            </h3>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pitTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="race" stroke="rgba(255,255,255,0.45)" />
                <YAxis stroke="rgba(255,255,255,0.45)" />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                    color: "white",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="pitTime"
                  stroke="#22d3ee"
                  fill="rgba(34,211,238,0.18)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Strategy Mix
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Tactical Distribution
            </h3>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={strategyShare}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                >
                  {strategyShare.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                    color: "white",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl xl:col-span-2">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
              Team Benchmarking
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Constructor Comparison
            </h3>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="team" stroke="rgba(255,255,255,0.45)" />
                <YAxis stroke="rgba(255,255,255,0.45)" />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                    color: "white",
                  }}
                />
                <Bar dataKey="execution" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="pitCrew" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                <Bar dataKey="strategy" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}