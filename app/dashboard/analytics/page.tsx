import AnalyticsDashboard from "../../../components/analytics/analytics-dashboard";

export default function AnalyticsPage() {
  return (
    <main className="space-y-6 text-white">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-violet-400">
          Driver Analytics
        </p>
        <h1 className="mt-2 text-4xl font-semibold">
          Performance Comparison Center
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-white/60">
          Compare driver behavior, sector deltas, and stint evolution through a
          racing-focused analytics workspace.
        </p>
      </div>

      <AnalyticsDashboard />
    </main>
  );
}