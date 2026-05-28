import TeamInsightsDashboard from "../../../components/team/team-insights-dashboard";

export default function TeamInsightsPage() {
  return (
    <main className="space-y-6 text-white">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">
          Team Insights
        </p>
        <h1 className="mt-2 text-4xl font-semibold">
          Constructor Intelligence Center
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-white/60">
          Evaluate pit performance, team strategy patterns, and competitor
          benchmarking through a constructor-focused intelligence dashboard.
        </p>
      </div>

      <TeamInsightsDashboard />
    </main>
  );
}