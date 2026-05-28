"use client";

import { useEffect, useState } from "react";
import StrategyForm from "../../../components/strategy/strategy-form";
import StrategyHistory from "../../../components/strategy/strategy-history";
import type { StrategyRecord } from "@/types/strategy";


export default function StrategyPage() {
  const [history, setHistory] = useState<StrategyRecord[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem("apexiq-strategy-history");
    if (!raw) return;

    try {
      setHistory(JSON.parse(raw));
    } catch {
      setHistory([]);
    }
  }, []);

  const handleSave = (entry: StrategyRecord) => {
    const next = [entry, ...history].slice(0, 8);
    setHistory(next);
    window.localStorage.setItem(
      "apexiq-strategy-history",
      JSON.stringify(next)
    );
  };

  return (
    <main className="space-y-6 theme-text">
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-red-400">
          AI Strategy
        </p>
        <h1 className="mt-2 text-4xl font-semibold theme-text">
          Dynamic Race Strategy Center
        </h1>
        <p className="mt-3 max-w-3xl text-sm theme-text-muted">
          Generate race strategy outputs from track conditions, tire state,
          weather pressure, aggression profile, and pit timing preferences.
        </p>
      </div>

      <StrategyForm onSave={handleSave} />
      <StrategyHistory history={history} />
    </main>
  );
}