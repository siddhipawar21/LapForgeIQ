"use client";

import { useEffect, useState } from "react";

type WeatherResponse = {
  success: boolean;
  weather?: {
    location: string;
    temperature: number;
    windspeed: number;
    weathercode: number;
    condition: string;
    time: string;
  };
  impact?: {
    tireRecommendation: string;
    weatherImpact: string;
    strategyOutlook: string;
  };
  message?: string;
};

export default function WeatherDashboard() {
  const [track, setTrack] = useState("monza");
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async (trackKey: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/weather?track=${trackKey}`);
      const json: WeatherResponse = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Weather fetch failed.");
      }

      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected weather error.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(track);
  }, [track]);

  return (
    <div className="space-y-6">
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
              Track Selector
            </p>
            <h2 className="mt-2 text-3xl font-semibold theme-text">
              Backend Weather Feed
            </h2>
            <p className="mt-2 text-sm theme-text-muted">
              Live weather intelligence routed through your own Next.js backend.
            </p>
          </div>

          <select
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            className="theme-input rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option value="monza">Monza</option>
            <option value="silverstone">Silverstone</option>
            <option value="suzuka">Suzuka</option>
            <option value="miami">Miami</option>
            <option value="spa">Spa-Francorchamps</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
          <p className="text-sm theme-text-muted">Loading weather intelligence...</p>
        </div>
      ) : error ? (
        <div className="rounded-[28px] border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          {error}
        </div>
      ) : data?.weather && data?.impact ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
                Location
              </p>
              <h3 className="mt-3 text-3xl font-semibold theme-text">
                {data.weather.location}
              </h3>
            </div>

            <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
                Temperature
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-sky-400">
                {data.weather.temperature}°C
              </h3>
            </div>

            <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
                Wind Speed
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-cyan-400">
                {data.weather.windspeed} km/h
              </h3>
            </div>

            <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
                Condition
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-amber-400">
                {data.weather.condition}
              </h3>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                AI Impact
              </p>
              <h2 className="mt-2 text-3xl font-semibold theme-text">
                Tactical Weather Analysis
              </h2>

              <div className="mt-4 space-y-4">
                <div className="theme-panel-soft rounded-2xl border p-4">
                  <p className="text-sm font-semibold theme-text">
                    Tire Recommendation
                  </p>
                  <p className="mt-2 text-sm theme-text-muted">
                    {data.impact.tireRecommendation}
                  </p>
                </div>

                <div className="theme-panel-soft rounded-2xl border p-4">
                  <p className="text-sm font-semibold theme-text">
                    Weather Pressure
                  </p>
                  <p className="mt-2 text-sm theme-text-muted">
                    {data.impact.weatherImpact}
                  </p>
                </div>

                <div className="theme-panel-soft rounded-2xl border p-4">
                  <p className="text-sm font-semibold theme-text">
                    Strategy Outlook
                  </p>
                  <p className="mt-2 text-sm theme-text-muted">
                    {data.impact.strategyOutlook}
                  </p>
                </div>
              </div>
            </div>

            <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">
                Feed Timestamp
              </p>
              <h2 className="mt-2 text-3xl font-semibold theme-text">
                Live Weather Snapshot
              </h2>

              <div className="mt-4 space-y-4">
                <div className="theme-panel-soft rounded-2xl border p-4">
                  <p className="text-sm font-semibold theme-text">Updated At</p>
                  <p className="mt-2 text-sm theme-text-muted">
                    {data.weather.time}
                  </p>
                </div>

                <div className="theme-panel-soft rounded-2xl border p-4">
                  <p className="text-sm font-semibold theme-text">
                    Race Operations Note
                  </p>
                  <p className="mt-2 text-sm theme-text-muted">
                    This backend feed is now ready to inform strategy decisions,
                    compound calls, and race-risk projections across modules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}