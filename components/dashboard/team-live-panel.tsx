// components/dashboard/team-live-panel.tsx

"use client";

import { useEffect, useState } from "react";

type TeamRow = {
  driverNumber: number;
  driverName: string;
  teamName: string;
  countryCode: string;
  position?: number;
  interval?: string;
  gapToLeader?: string;
};

type ApiResponse = {
  success: boolean;
  session?: {
    sessionKey: number;
    sessionName: string;
    meetingName: string;
    dateStart: string;
    year: number;
  };
  teams?: TeamRow[];
  message?: string;
  error?: string;
};

export default function TeamLivePanel() {
  const [sessionInfo, setSessionInfo] = useState<ApiResponse["session"]>();
  const [teams, setTeams] = useState<TeamRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function fetchTeams() {
    try {
      const res = await fetch("/api/teams");
      const json: ApiResponse = await res.json();

      if (!json.success) {
        console.error("Team API error:", json);
        setErrorMsg(json.message || "Failed to load F1 team data");
        return;
      }

      setSessionInfo(json.session);
      setTeams(json.teams || []);
      setErrorMsg(null);
    } catch (err) {
      console.error("Team fetch failed:", err);
      setErrorMsg("Could not fetch F1 data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTeams();
    const id = setInterval(fetchTeams, 5000); // refresh every 5s
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        Loading live F1 team data…
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
        {errorMsg}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Live Team & Driver Grid
          </h2>
          {sessionInfo && (
            <p className="text-xs text-white/40">
              {sessionInfo.meetingName} – {sessionInfo.sessionName} ({sessionInfo.year})
            </p>
          )}
        </div>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] text-emerald-300">
          Auto-updating
        </span>
      </div>

      <div className="max-h-80 overflow-auto text-xs">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 bg-black/40 text-white/50 backdrop-blur">
            <tr>
              <th className="py-1 pr-2">Pos</th>
              <th className="py-1 pr-2">#</th>
              <th className="py-1 pr-2">Driver</th>
              <th className="py-1 pr-2">Team</th>
              <th className="py-1 pr-2">Gap</th>
            </tr>
          </thead>
          <tbody className="text-white/80">
            {teams
              .slice()
              .sort((a, b) => (a.position ?? 99) - (b.position ?? 99))
              .map((t) => (
                <tr key={t.driverNumber} className="border-t border-white/5">
                  <td className="py-1 pr-2">{t.position ?? "-"}</td>
                  <td className="py-1 pr-2">{t.driverNumber}</td>
                  <td className="py-1 pr-2">{t.driverName}</td>
                  <td className="py-1 pr-2">{t.teamName}</td>
                  <td className="py-1 pr-2">
                    {t.gapToLeader ?? t.interval ?? "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}