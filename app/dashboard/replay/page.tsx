import ReplayEngine from "../../../components/replay/replay-engine";

export default function ReplayPage() {
  return (
    <main className="space-y-6 theme-text">
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
          Replay Engine
        </p>
        <h1 className="mt-2 text-4xl font-semibold theme-text">
          AI Race Replay Comparison
        </h1>
        <p className="mt-3 max-w-3xl text-sm theme-text-muted">
          Upload a race clip or use a demo asset, compare the original session
          against an alternate race branch, and inspect timeline-driven
          what-if decisions through split-screen playback.
        </p>
      </div>

      <ReplayEngine />
    </main>
  );
}