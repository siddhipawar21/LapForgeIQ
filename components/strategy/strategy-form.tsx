"use client";

import { useState } from "react";
import type { StrategyRecord } from "@/types/strategy";



type Props = {
  onSave: (entry: StrategyRecord) => void;
};

export default function StrategyForm({ onSave }: Props) {
  const [form, setForm] = useState({
    track: "Monza",
    weather: "Dry",
    tireCompound: "Medium",
    humidity: "44",
    aggression: "Balanced",
    fuelLoad: "78",
    pitPreference: "Flexible",
    safetyCarProbability: "28",
    rainProbability: "14",
    opponentPace: "Fast",
    tireWear: "21",
    trackTemperature: "34",
    customNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<string>("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<StrategyRecord | null>(null);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const generateStrategy = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/strategy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Strategy generation failed.");
      }

      const generated: StrategyRecord = {
        id: crypto.randomUUID(),
        track: form.track,
        weather: form.weather,
        tireCompound: form.tireCompound,
        aggression: form.aggression,
        predictedFinish: data.strategy.predictedFinish,
        pitStrategy: data.strategy.pitStrategy,
        tireRecommendation: data.strategy.tireRecommendation,
        overtakeWindows: data.strategy.overtakeWindows,
        fuelStrategy: data.strategy.fuelStrategy,
        safetyCarPlan: data.strategy.safetyCarPlan,
        bestLapPrediction: data.strategy.bestLapPrediction,
        riskAnalysis: data.strategy.riskAnalysis,
        createdAt: new Date().toLocaleString(),
      };

      setSource(data.source);
      setResult(generated);
      onSave(generated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-red-400">
            RaceMind AI
          </p>
          <h2 className="mt-2 text-3xl font-semibold theme-text">
            Generate Race Strategy
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Configure race variables and generate a tactical strategy report.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.track}
            onChange={(e) => handleChange("track", e.target.value)}
            placeholder="Track name"
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          />
          <select
            value={form.weather}
            onChange={(e) => handleChange("weather", e.target.value)}
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option>Dry</option>
            <option>Cloudy</option>
            <option>Rain</option>
            <option>Mixed</option>
          </select>

          <select
            value={form.tireCompound}
            onChange={(e) => handleChange("tireCompound", e.target.value)}
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option>Soft</option>
            <option>Medium</option>
            <option>Hard</option>
            <option>Intermediate</option>
            <option>Wet</option>
          </select>

          <input
            value={form.humidity}
            onChange={(e) => handleChange("humidity", e.target.value)}
            placeholder="Humidity"
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          />

          <select
            value={form.aggression}
            onChange={(e) => handleChange("aggression", e.target.value)}
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option>Conservative</option>
            <option>Balanced</option>
            <option>Aggressive</option>
          </select>

          <input
            value={form.fuelLoad}
            onChange={(e) => handleChange("fuelLoad", e.target.value)}
            placeholder="Fuel load"
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          />

          <select
            value={form.pitPreference}
            onChange={(e) => handleChange("pitPreference", e.target.value)}
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option>Flexible</option>
            <option>Early Stop</option>
            <option>Late Stop</option>
          </select>

          <input
            value={form.safetyCarProbability}
            onChange={(e) => handleChange("safetyCarProbability", e.target.value)}
            placeholder="Safety car probability"
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          />

          <input
            value={form.rainProbability}
            onChange={(e) => handleChange("rainProbability", e.target.value)}
            placeholder="Rain probability"
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          />

          <select
            value={form.opponentPace}
            onChange={(e) => handleChange("opponentPace", e.target.value)}
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option>Slow</option>
            <option>Balanced</option>
            <option>Fast</option>
          </select>

          <input
            value={form.tireWear}
            onChange={(e) => handleChange("tireWear", e.target.value)}
            placeholder="Tire wear %"
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          />

          <input
            value={form.trackTemperature}
            onChange={(e) => handleChange("trackTemperature", e.target.value)}
            placeholder="Track temperature"
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          />
        </div>

        <textarea
          value={form.customNotes}
          onChange={(e) => handleChange("customNotes", e.target.value)}
          placeholder="Custom race notes"
          className="theme-input mt-4 min-h-[120px] w-full rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
        />

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={generateStrategy}
            disabled={loading}
            className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-[1.01] disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Strategy"}
          </button>

          {source && (
            <span className="rounded-full border theme-border px-3 py-1 text-xs theme-text-muted">
              Source: {source}
            </span>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}
      </div>

      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
          Strategy Output
        </p>
        <h2 className="mt-2 text-3xl font-semibold theme-text">
          Race Engineer Summary
        </h2>

        {!result ? (
          <p className="mt-4 text-sm theme-text-muted">
            No strategy generated yet. Submit the race conditions to create a
            tactical recommendation.
          </p>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-xs uppercase tracking-[0.2em] theme-text-faint">
                Predicted Finish
              </p>
              <p className="mt-2 text-2xl font-semibold text-emerald-400">
                {result.predictedFinish}
              </p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">Pit Strategy</p>
              <p className="mt-2 text-sm theme-text-muted">
                {result.pitStrategy}
              </p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">
                Tire Recommendation
              </p>
              <p className="mt-2 text-sm theme-text-muted">
                {result.tireRecommendation}
              </p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">
                Overtake Windows
              </p>
              <p className="mt-2 text-sm theme-text-muted">
                {result.overtakeWindows}
              </p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">Fuel Strategy</p>
              <p className="mt-2 text-sm theme-text-muted">
                {result.fuelStrategy}
              </p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">
                Safety Car Response
              </p>
              <p className="mt-2 text-sm theme-text-muted">
                {result.safetyCarPlan}
              </p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">
                Best Lap Prediction
              </p>
              <p className="mt-2 text-sm theme-text-muted">
                {result.bestLapPrediction}
              </p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">Risk Analysis</p>
              <p className="mt-2 text-sm theme-text-muted">
                {result.riskAnalysis}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}