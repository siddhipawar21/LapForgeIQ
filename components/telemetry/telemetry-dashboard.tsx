"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

type TelemetryPoint = {
  time: string;
  speed: number;
  rpm: number;
  tireWear: number;
  lapDelta: number;
};

const baseTelemetry: TelemetryPoint[] = [
  { time: "00", speed: 282, rpm: 11200, tireWear: 18, lapDelta: -0.12 },
  { time: "05", speed: 289, rpm: 11420, tireWear: 19, lapDelta: -0.08 },
  { time: "10", speed: 295, rpm: 11610, tireWear: 21, lapDelta: -0.05 },
  { time: "15", speed: 301, rpm: 11850, tireWear: 24, lapDelta: 0.01 },
  { time: "20", speed: 292, rpm: 11520, tireWear: 27, lapDelta: 0.04 },
  { time: "25", speed: 287, rpm: 11340, tireWear: 30, lapDelta: 0.08 },
  { time: "30", speed: 298, rpm: 11760, tireWear: 33, lapDelta: 0.03 },
];

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export default function TelemetryDashboard() {
  const [speed, setSpeed] = useState(298);
  const [rpm, setRpm] = useState(11740);
  const [brakeTemp, setBrakeTemp] = useState(846);
  const [drs, setDrs] = useState("ENABLED");
  const [ers, setErs] = useState(62);
  const [sector, setSector] = useState("S2");
  const [telemetry, setTelemetry] = useState(baseTelemetry);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => clamp(prev + Math.floor(Math.random() * 15 - 7), 268, 312));
      setRpm((prev) => clamp(prev + Math.floor(Math.random() * 500 - 250), 10800, 12150));
      setBrakeTemp((prev) => clamp(prev + Math.floor(Math.random() * 26 - 13), 780, 920));
      setErs((prev) => clamp(prev + Math.floor(Math.random() * 7 - 3), 38, 100));

      setDrs((prev) => (Math.random() > 0.55 ? "ENABLED" : prev === "ENABLED" ? "DISABLED" : "ENABLED"));
      setSector((prev) =>
        prev === "S1" ? "S2" : prev === "S2" ? "S3" : "S1"
      );

      setTelemetry((prev) =>
        prev.map((point, index) => ({
          ...point,
          speed:
            index === prev.length - 1
              ? clamp(point.speed + Math.floor(Math.random() * 18 - 9), 270, 315)
              : prev[index + 1].speed,
          rpm:
            index === prev.length - 1
              ? clamp(point.rpm + Math.floor(Math.random() * 600 - 300), 10800, 12150)
              : prev[index + 1].rpm,
          tireWear:
            index === prev.length - 1
              ? clamp(point.tireWear + Math.random() * 1.2, 18, 68)
              : prev[index + 1].tireWear,
          lapDelta:
            index === prev.length - 1
              ? Number((Math.random() * 0.24 - 0.12).toFixed(2))
              : prev[index + 1].lapDelta,
        }))
      );
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const tireLife = useMemo(() => 100 - telemetry[telemetry.length - 1].tireWear, [telemetry]);
  const lapDelta = telemetry[telemetry.length - 1].lapDelta;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
            Speed
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-cyan-400">
            {speed} km/h
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Peak straight-line telemetry.
          </p>
        </div>

        <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
            RPM
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-amber-400">
            {rpm}
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Engine rotational output.
          </p>
        </div>

        <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
            Brake Temp
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-red-400">
            {brakeTemp}°C
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Front braking thermal load.
          </p>
        </div>

        <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
            DRS
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-emerald-400">
            {drs}
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Rear wing deployment state.
          </p>
        </div>

        <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
            ERS
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-violet-400">
            {ers}%
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Energy recovery reserve.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              Speed Trace
            </p>
            <h2 className="mt-2 text-3xl font-semibold theme-text">
              Live Speed Curve
            </h2>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetry}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="rgba(148,163,184,0.7)" />
                <YAxis stroke="rgba(148,163,184,0.7)" />
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

        <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">
            Live Race State
          </p>
          <h2 className="mt-2 text-3xl font-semibold theme-text">
            Session Intelligence
          </h2>

          <div className="mt-5 space-y-4">
            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">Current Sector</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-400">
                {sector}
              </p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">Lap Delta</p>
              <p
                className={`mt-2 text-2xl font-semibold ${
                  lapDelta <= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {lapDelta > 0 ? `+${lapDelta}` : lapDelta}s
              </p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">Pit Window Alert</p>
              <p className="mt-2 text-sm theme-text-muted">
                {tireLife < 72
                  ? "Pit window opening soon. Tire life is trending toward the optimal crossover threshold."
                  : "Current stint remains stable. No immediate pit response required."}
              </p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">Mini Track Map</p>
              <div className="mt-3 h-28 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-3">
                <div className="relative h-full w-full rounded-xl border border-dashed border-cyan-400/20">
                  <div className="absolute left-[18%] top-[56%] h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
                  <div className="absolute right-[18%] top-[22%] h-2 w-2 rounded-full bg-white/50" />
                  <div className="absolute left-[42%] top-[18%] h-2 w-2 rounded-full bg-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
              Tire Degradation
            </p>
            <h2 className="mt-2 text-3xl font-semibold theme-text">
              Wear Progression
            </h2>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="rgba(148,163,184,0.7)" />
                <YAxis stroke="rgba(148,163,184,0.7)" />
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
                  fill="rgba(245,158,11,0.2)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.3em] text-violet-400">
              Engine Output
            </p>
            <h2 className="mt-2 text-3xl font-semibold theme-text">
              RPM Evolution
            </h2>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetry}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="rgba(148,163,184,0.7)" />
                <YAxis stroke="rgba(148,163,184,0.7)" />
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
                  stroke="#a855f7"
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