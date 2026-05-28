"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const driverComparison = [
  { metric: "Pace", driverA: 92, driverB: 88 },
  { metric: "Braking", driverA: 86, driverB: 90 },
  { metric: "Corner Exit", driverA: 89, driverB: 84 },
  { metric: "Tire Management", driverA: 91, driverB: 87 },
  { metric: "Consistency", driverA: 88, driverB: 92 },
  { metric: "Overtake Timing", driverA: 84, driverB: 81 },
];

const sectorPerformance = [
  { sector: "S1", delta: 0.12 },
  { sector: "S2", delta: -0.08 },
  { sector: "S3", delta: 0.21 },
];

const stintTrend = [
  { lap: "12", pace: 91.2 },
  { lap: "13", pace: 91.4 },
  { lap: "14", pace: 91.7 },
  { lap: "15", pace: 92.1 },
  { lap: "16", pace: 92.5 },
  { lap: "17", pace: 92.9 },
  { lap: "18", pace: 93.4 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-violet-400">
            Driver Rating
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">91.4</h2>
          <p className="mt-2 text-sm text-white/60">
            Composite performance rating from pace, tire use, and consistency.
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Best Sector
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-cyan-300">Sector 2</h2>
          <p className="mt-2 text-sm text-white/60">
            Strongest relative performance under medium-speed corner load.
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Tire Window
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-amber-300">Optimal</h2>
          <p className="mt-2 text-sm text-white/60">
            Tire management profile remains stable through the active stint.
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
            Team Form
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-emerald-300">Rising</h2>
          <p className="mt-2 text-sm text-white/60">
            Recent execution trend suggests improved strategic consistency.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-violet-400">
              Driver Comparison
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Radar Performance Profile
            </h3>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={driverComparison}>
                <PolarGrid stroke="rgba(255,255,255,0.12)" />
                <PolarAngleAxis dataKey="metric" stroke="rgba(255,255,255,0.55)" />
                <Radar
                  name="Driver A"
                  dataKey="driverA"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.25}
                />
                <Radar
                  name="Driver B"
                  dataKey="driverB"
                  stroke="#22d3ee"
                  fill="#22d3ee"
                  fillOpacity={0.18}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                    color: "white",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Sector Delta
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Relative Sector Advantage
            </h3>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorPerformance}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="sector" stroke="rgba(255,255,255,0.45)" />
                <YAxis stroke="rgba(255,255,255,0.45)" />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                    color: "white",
                  }}
                />
                <Bar dataKey="delta" fill="#22d3ee" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl xl:col-span-2">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Stint Trend
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Lap Pace Evolution
            </h3>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stintTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="lap" stroke="rgba(255,255,255,0.45)" />
                <YAxis stroke="rgba(255,255,255,0.45)" />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                    color: "white",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="pace"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}