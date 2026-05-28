"use client";

import { useState } from "react";

type WeatherResult = {
  city: string;
  condition: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  cloudCover: number;
};

export default function WeatherPanel() {
  const [city, setCity] = useState("Monza");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState<WeatherResult | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch weather");
      }

      setWeather(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected weather error");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-white/80">
              Track / City
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city, e.g. Monza"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-cyan-400"
            />
          </div>

          <button
            onClick={fetchWeather}
            disabled={loading}
            className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading..." : "Fetch Weather"}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}
      </div>

      {!weather && !loading && !error && (
        <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-6 text-sm text-white/50">
          Search for a race location to load live weather intelligence.
        </div>
      )}

      {weather && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-sky-400">
              Condition
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              {weather.condition}
            </h2>
            <p className="mt-2 text-sm text-white/60">{weather.description}</p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Temperature
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-cyan-300">
              {weather.temperature}°C
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Track grip sensitivity may change.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
              Humidity
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-emerald-300">
              {weather.humidity}%
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Affects cooling and tire response.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Wind Speed
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-amber-300">
              {weather.windSpeed} m/s
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Crosswind can affect braking stability.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:col-span-2">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Race Impact Analysis
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white">
              {weather.city} weather suggests a{" "}
              {weather.condition.toLowerCase().includes("rain")
                ? "high likelihood of wet-strategy adaptation."
                : "stable dry-race strategy window with moderate environmental variation."}
            </h2>
            <p className="mt-3 text-sm text-white/60">
              Pressure: {weather.pressure} hPa · Cloud Cover: {weather.cloudCover}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}