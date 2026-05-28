import TelemetryDashboard from "../../../components/telemetry/telemetry-dashboard";

export default function TelemetryPage() {
  return (
    <main className="space-y-6 theme-text">
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
          Telemetry
        </p>
        <h1 className="mt-2 text-4xl font-semibold theme-text">
          Live Telemetry Intelligence
        </h1>
        <p className="mt-3 max-w-3xl text-sm theme-text-muted">
          Monitor race-speed behavior, tire degradation, sector timing, engine
          output, and live deployment states through a motorsport telemetry
          workspace.
        </p>
      </div>

      <TelemetryDashboard />
    </main>
  );
}