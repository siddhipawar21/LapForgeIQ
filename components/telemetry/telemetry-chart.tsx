"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

type TelemetryPoint = {
  time: string;
  speed: number;
  tireWear: number;
  brakeTemp: number;
  rpm: number;
};

const telemetryData: TelemetryPoint[] = [
  { time: "0", speed: 210, tireWear: 12, brakeTemp: 540, rpm: 10800 },
  { time: "5", speed: 248, tireWear: 13, brakeTemp: 560, rpm: 11200 },
  { time: "10", speed: 289, tireWear: 14, brakeTemp: 610, rpm: 11800 },
  { time: "15", speed: 301, tireWear: 16, brakeTemp: 640, rpm: 12100 },
  { time: "20", speed: 275, tireWear: 18, brakeTemp: 680, rpm: 11600 },
  { time: "25", speed: 228, tireWear: 19, brakeTemp: 710, rpm: 10900 },
  { time: "30", speed: 192, tireWear: 21, brakeTemp: 690, rpm: 10100 },
  { time: "35", speed: 235, tireWear: 22, brakeTemp: 655, rpm: 11050 },
  { time: "40", speed: 284, tireWear: 24, brakeTemp: 630, rpm: 11750 },
  { time: "45", speed: 312, tireWear: 26, brakeTemp: 650, rpm: 12300 },
];

export default function TelemetryChart() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Speed Trace
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            Live Speed Graph
          </h3>
        </div>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetryData}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" />
              <YAxis stroke="rgba(255,255,255,0.4)" />
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
                dataKey="speed"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Tire Degradation
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            Tire Wear Evolution
          </h3>
        </div>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={telemetryData}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" />
              <YAxis stroke="rgba(255,255,255,0.4)" />
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
                dataKey="tireWear"
                stroke="#f59e0b"
                fill="rgba(245,158,11,0.22)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400">
            Braking System
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            Brake Temperature
          </h3>
        </div>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetryData}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" />
              <YAxis stroke="rgba(255,255,255,0.4)" />
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
                dataKey="brakeTemp"
                stroke="#fb7185"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
            Power Unit
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            RPM Monitoring
          </h3>
        </div>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetryData}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" />
              <YAxis stroke="rgba(255,255,255,0.4)" />
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
                dataKey="rpm"
                stroke="#4ade80"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}