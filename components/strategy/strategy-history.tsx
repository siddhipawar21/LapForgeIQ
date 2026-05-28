"use client";
import type { StrategyRecord } from "@/types/strategy";


type Props = {
  history: StrategyRecord[];
};

export default function StrategyHistory({ history }: Props) {
  return (
    <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
          Strategy History
        </p>
        <h2 className="mt-2 text-3xl font-semibold theme-text">
          Saved Sessions
        </h2>
        <p className="mt-2 text-sm theme-text-muted">
          Review previously generated strategy outputs and compare tactical
          decisions over time.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="theme-panel-soft rounded-2xl border p-5">
          <p className="text-sm theme-text-muted">
            No saved strategies yet. Generate your first race strategy to build
            history.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="theme-panel-soft rounded-2xl border p-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                    {item.track}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold theme-text">
                    {item.predictedFinish} projection
                  </h3>
                  <p className="mt-2 text-sm theme-text-muted">
                    {item.weather} · {item.tireCompound} · {item.aggression}
                  </p>
                </div>

                <p className="text-xs theme-text-faint">{item.createdAt}</p>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium theme-text">Pit Strategy</p>
                  <p className="mt-1 text-sm theme-text-muted">
                    {item.pitStrategy}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium theme-text">
                    Tire Recommendation
                  </p>
                  <p className="mt-1 text-sm theme-text-muted">
                    {item.tireRecommendation}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium theme-text">
                    Overtake Windows
                  </p>
                  <p className="mt-1 text-sm theme-text-muted">
                    {item.overtakeWindows}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium theme-text">
                    Safety Car Response
                  </p>
                  <p className="mt-1 text-sm theme-text-muted">
                    {item.safetyCarPlan}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium theme-text">
                    Best Lap Prediction
                  </p>
                  <p className="mt-1 text-sm theme-text-muted">
                    {item.bestLapPrediction}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium theme-text">Risk Analysis</p>
                  <p className="mt-1 text-sm theme-text-muted">
                    {item.riskAnalysis}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}