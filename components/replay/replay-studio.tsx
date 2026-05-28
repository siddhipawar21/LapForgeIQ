"use client";

import { useEffect, useState } from "react";

const DEMO_VIDEO =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const scenarioDescriptions: Record<string, string> = {
  pitEarlier:
    "Stopping 2 laps earlier creates an undercut window and improves clean-air probability.",
  pitLater:
    "Extending the stint protects track position initially but increases degradation risk.",
  softTires:
    "Switching to softs improves attack pace and overtaking potential for a short window.",
  stayOut:
    "Remaining on track preserves track position but raises the chance of hitting the tire cliff.",
};

const decisionDescriptions: Record<string, string> = {
  defensive:
    "The alternate model prioritizes defending the inside line into the braking zone.",
  aggressive:
    "The alternate model increases entry commitment and rotation at turn-in.",
  smooth:
    "The alternate model reduces steering aggression to improve exit stability.",
  lateApex:
    "The alternate model delays apex timing to maximize traction on corner exit.",
};

const weatherDescriptions: Record<string, string> = {
  dry:
    "Dry conditions keep the baseline strategy stable and favor outright pace.",
  lightRain:
    "Light rain introduces crossover uncertainty and increases pit timing sensitivity.",
  crosswind:
    "Crosswind changes braking confidence and high-speed balance through fast corners.",
  coolTrack:
    "A cooler track lowers surface temperature and can extend tire life slightly.",
};

export default function ReplayStudio() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState(DEMO_VIDEO);
  const [sourceMode, setSourceMode] = useState<"demo" | "upload">("demo");

  const [scenario, setScenario] = useState("pitEarlier");
  const [decision, setDecision] = useState("defensive");
  const [weather, setWeather] = useState("lightRain");

  const [ranAnalysis, setRanAnalysis] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      if (sourceMode === "demo") {
        setVideoUrl(DEMO_VIDEO);
      }
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setVideoUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile, sourceMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    setSelectedFile(file);
    setSourceMode("upload");
    setRanAnalysis(false);
  };

  const useDemoClip = () => {
    setSelectedFile(null);
    setSourceMode("demo");
    setVideoUrl(DEMO_VIDEO);
    setRanAnalysis(false);
  };

  const runAnalysis = () => {
    setRanAnalysis(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-red-400">
            Replay Inputs
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Scenario Control Panel
          </h2>
          <p className="mt-3 text-sm text-white/60">
            Upload a race clip or switch to demo mode, then configure the
            alternate decision path.
          </p>

          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <label className="mb-3 block text-sm font-medium text-white/80">
                Upload race video
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2 file:font-medium file:text-slate-900"
              />

              <button
                type="button"
                onClick={useDemoClip}
                className="mt-4 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
              >
                Choose Demo Clip
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Strategy Scenario
              </label>
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="pitEarlier">Pit 2 laps earlier</option>
                <option value="pitLater">Pit 2 laps later</option>
                <option value="softTires">Switch to soft tires</option>
                <option value="stayOut">Stay out under pressure</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Driver Decision Model
              </label>
              <select
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="defensive">Defensive line</option>
                <option value="aggressive">Aggressive turn-in</option>
                <option value="smooth">Smooth rotation</option>
                <option value="lateApex">Late apex exit</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Weather Variable
              </label>
              <select
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="dry">Dry track</option>
                <option value="lightRain">Light rain</option>
                <option value="crosswind">Crosswind</option>
                <option value="coolTrack">Cooler track</option>
              </select>
            </div>

            <button
              type="button"
              onClick={runAnalysis}
              className="w-full rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-[1.01]"
            >
              Run Replay Analysis
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                Split-Screen Replay
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                Original vs Alternate Outcome
              </h2>
            </div>

            <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/70">
              {sourceMode === "demo" ? "Demo Clip" : "Uploaded Clip"}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/40">
                Original Replay
              </p>
              <video
                controls
                className="h-[260px] w-full rounded-2xl bg-black object-cover"
                src={videoUrl}
              />
            </div>

            <div className="rounded-[24px] border border-cyan-400/20 bg-cyan-400/5 p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-cyan-300">
                Alternate Outcome
              </p>
              <video
                controls
                className="h-[260px] w-full rounded-2xl bg-black object-cover"
                src={videoUrl}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Strategy Shift
          </p>
          <h3 className="mt-3 text-xl font-semibold text-cyan-300">
            {ranAnalysis ? "Scenario Evaluated" : "Waiting for analysis"}
          </h3>
          <p className="mt-2 text-sm text-white/60">
            {ranAnalysis
              ? scenarioDescriptions[scenario]
              : "Choose a scenario and run analysis to generate replay insights."}
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Decision Model
          </p>
          <h3 className="mt-3 text-xl font-semibold text-amber-300">
            {ranAnalysis ? "Corner Response Updated" : "No driver model yet"}
          </h3>
          <p className="mt-2 text-sm text-white/60">
            {ranAnalysis
              ? decisionDescriptions[decision]
              : "Driver behavior logic will appear here after running analysis."}
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Weather Influence
          </p>
          <h3 className="mt-3 text-xl font-semibold text-sky-300">
            {ranAnalysis ? "Conditions Applied" : "No weather model yet"}
          </h3>
          <p className="mt-2 text-sm text-white/60">
            {ranAnalysis
              ? weatherDescriptions[weather]
              : "Weather impact will be included in the alternate replay outcome."}
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Predicted Result
          </p>
          <h3 className="mt-3 text-xl font-semibold text-emerald-300">
            {ranAnalysis ? "Projected Gain: +1.8s" : "No projection yet"}
          </h3>
          <p className="mt-2 text-sm text-white/60">
            {ranAnalysis
              ? "The alternate timeline suggests measurable performance improvement."
              : "Outcome projection appears after replay analysis is triggered."}
          </p>
        </div>
      </div>
    </div>
  );
}