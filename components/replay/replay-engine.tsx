"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const demoVideo =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const eventMarkers = [
  { second: 8, label: "Late braking detected" },
  { second: 16, label: "Undercut window opens" },
  { second: 27, label: "Tire degradation threshold" },
  { second: 38, label: "Weather crossover trigger" },
  { second: 51, label: "Safety car branch decision" },
];

function buildScenarioSummary(scenario: string, aggression: string) {
  if (scenario === "pit-early") {
    return {
      title: "Earlier Pit Stop Scenario",
      outcome:
        "The alternate branch gains track position through a better undercut and reduces late-stint tire stress.",
      speed:
        "Exit speed improves after the stop because the alternate car rejoins in cleaner air.",
      corner:
        "Corner stability rises in the second half of the stint as tire temperatures normalize earlier.",
      decision:
        aggression === "Aggressive"
          ? "Aggressive deployment raises undercut reward but increases cold-tire risk after rejoin."
          : "Balanced aggression makes the earlier stop more stable across repeated simulations.",
    };
  }

  if (scenario === "wet-tires") {
    return {
      title: "Earlier Wet Tire Switch",
      outcome:
        "The alternate branch avoids crossover loss by reacting earlier to declining grip and surface instability.",
      speed:
        "Top speed falls slightly, but sector consistency improves once the dry line disappears.",
      corner:
        "Mechanical grip improves under wet conditions, producing more secure braking and rotation phases.",
      decision:
        "The earlier wet call lowers hesitation risk and protects lap-time collapse during grip transition.",
    };
  }

  return {
    title: "Alternate Steering Decision",
    outcome:
      "A cleaner line through the decision point preserves momentum and reduces downstream time loss.",
    speed:
      "Speed trace recovers earlier after corner exit, improving acceleration onto the following straight.",
    corner:
      "Steering input becomes less abrupt, reducing scrub and improving front-end confidence.",
    decision:
      aggression === "Aggressive"
        ? "Aggressive turn-in makes the alternate line riskier but potentially more rewarding."
        : "Measured steering increases repeatability and lowers rotation instability in the alternate branch.",
  };
}

export default function ReplayEngine() {
  const [videoUrl, setVideoUrl] = useState(demoVideo);
  const [videoName, setVideoName] = useState("Demo clip loaded");
  const [scenario, setScenario] = useState("pit-early");
  const [aggression, setAggression] = useState("Balanced");
  const [timeline, setTimeline] = useState(16);
  const [isPlaying, setIsPlaying] = useState(false);

  const leftVideoRef = useRef<HTMLVideoElement | null>(null);
  const rightVideoRef = useRef<HTMLVideoElement | null>(null);

  const summary = useMemo(
    () => buildScenarioSummary(scenario, aggression),
    [scenario, aggression]
  );

  useEffect(() => {
    const left = leftVideoRef.current;
    const right = rightVideoRef.current;
    if (!left || !right) return;

    left.currentTime = timeline;
    right.currentTime = timeline;
  }, [timeline]);

  const handleUpload = (file?: File) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setVideoUrl(objectUrl);
    setVideoName(file.name);
    setIsPlaying(false);
  };

  const syncPlayPause = async () => {
    const left = leftVideoRef.current;
    const right = rightVideoRef.current;
    if (!left || !right) return;

    if (isPlaying) {
      left.pause();
      right.pause();
      setIsPlaying(false);
    } else {
      await left.play();
      await right.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
              Scenario Control
            </p>
            <h2 className="mt-2 text-3xl font-semibold theme-text">
              Alternate Outcome Builder
            </h2>
            <p className="mt-2 text-sm theme-text-muted">
              Select a replay branch, upload a race clip, and compare the
              original sequence against an AI-styled alternate outcome.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium theme-text-muted">
                Upload race clip
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleUpload(e.target.files?.[0])}
                className="theme-input w-full rounded-2xl border px-4 py-3"
              />
              <p className="mt-2 text-xs theme-text-faint">{videoName}</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium theme-text-muted">
                Scenario type
              </label>
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="theme-input w-full rounded-2xl border px-4 py-3"
              >
                <option value="pit-early">Pit 2 laps earlier</option>
                <option value="wet-tires">Switch to rain tires earlier</option>
                <option value="steering-line">Different steering decision</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium theme-text-muted">
                Driver aggression
              </label>
              <select
                value={aggression}
                onChange={(e) => setAggression(e.target.value)}
                className="theme-input w-full rounded-2xl border px-4 py-3"
              >
                <option>Conservative</option>
                <option>Balanced</option>
                <option>Aggressive</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium theme-text-muted">
                Timeline scrubber ({timeline}s)
              </label>
              <input
                type="range"
                min={0}
                max={55}
                value={timeline}
                onChange={(e) => setTimeline(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={syncPlayPause}
                className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-[1.01]"
              >
                {isPlaying ? "Pause Comparison" : "Play Comparison"}
              </button>

              <button
                onClick={() => {
                  setVideoUrl(demoVideo);
                  setVideoName("Demo clip loaded");
                  setIsPlaying(false);
                }}
                className="rounded-2xl border theme-border px-5 py-3 text-sm font-medium theme-text transition hover:bg-white/10"
              >
                Use Demo Clip
              </button>
            </div>
          </div>
        </div>

        <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                Split Screen Replay
              </p>
              <h2 className="mt-2 text-3xl font-semibold theme-text">
                Original vs AI Alternate
              </h2>
            </div>

            <div className="rounded-full border theme-border px-3 py-1 text-xs theme-text-muted">
              Synced Timeline
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="theme-panel-soft rounded-[24px] border p-3">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-red-400">
                Original Race Feed
              </p>
              <video
                ref={leftVideoRef}
                src={videoUrl}
                controls
                className="h-[260px] w-full rounded-[18px] object-cover"
              />
            </div>

            <div className="theme-panel-soft rounded-[24px] border p-3">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-emerald-400">
                AI Alternate Outcome
              </p>
              <div className="relative">
                <video
                  ref={rightVideoRef}
                  src={videoUrl}
                  controls
                  className="h-[260px] w-full rounded-[18px] object-cover brightness-110 contrast-110 saturate-[1.15]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[18px] border border-cyan-400/30" />
                <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-cyan-400/20 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cyan-200 backdrop-blur">
                  Simulated branch
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-400">
            AI Analysis
          </p>
          <h2 className="mt-2 text-3xl font-semibold theme-text">
            Decision Intelligence
          </h2>

          <div className="mt-5 space-y-4">
            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">{summary.title}</p>
              <p className="mt-2 text-sm theme-text-muted">{summary.outcome}</p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">Speed Comparison</p>
              <p className="mt-2 text-sm theme-text-muted">{summary.speed}</p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">
                Cornering Analysis
              </p>
              <p className="mt-2 text-sm theme-text-muted">{summary.corner}</p>
            </div>

            <div className="theme-panel-soft rounded-2xl border p-4">
              <p className="text-sm font-semibold theme-text">
                Driver Decision Analysis
              </p>
              <p className="mt-2 text-sm theme-text-muted">
                {summary.decision}
              </p>
            </div>
          </div>
        </div>

        <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">
              Event Timeline
            </p>
            <h2 className="mt-2 text-3xl font-semibold theme-text">
              Predicted Race Branch Points
            </h2>
          </div>

          <div className="space-y-4">
            {eventMarkers.map((event) => {
              const active = timeline >= event.second;

              return (
                <button
                  key={event.second}
                  onClick={() => setTimeline(event.second)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-cyan-400/30 bg-cyan-400/10"
                      : "theme-panel-soft"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold theme-text">
                        {event.label}
                      </p>
                      <p className="mt-1 text-xs theme-text-faint">
                        Jump to simulation marker
                      </p>
                    </div>
                    <span className="rounded-full border theme-border px-3 py-1 text-xs theme-text-muted">
                      {event.second}s
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}