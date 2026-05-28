// app/dashboard/page.tsx

import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import TeamLivePanel from "@/components/dashboard/team-live-panel";

const actionCards = [
  {
    title: "Launch Telemetry",
    description:
      "Open the live race telemetry center with speed, tire wear, brake temperature, and RPM analysis.",
    href: "/dashboard/telemetry",
    accent: "text-cyan-400",
    badge: "Telemetry",
  },
  {
    title: "AI Strategy Generator",
    description:
      "Generate dynamic race strategy outputs using live conditions, driver style, and tactical risk factors.",
    href: "/dashboard/strategy",
    accent: "text-red-400",
    badge: "Strategy",
  },
  {
    title: "Race Replay Engine",
    description:
      "Compare original race sessions against alternate strategy outcomes and decision branches.",
    href: "/dashboard/replay",
    accent: "text-amber-400",
    badge: "Replay",
  },
  {
    title: "Weather Intelligence",
    description:
      "Review race-day weather intelligence, rain probability, track temperature, and strategy impact.",
    href: "/dashboard/weather",
    accent: "text-sky-400",
    badge: "Weather",
  },
  {
    title: "Driver Analytics",
    description:
      "Analyze performance trends, sector advantages, and consistency behavior in comparison mode.",
    href: "/dashboard/analytics",
    accent: "text-violet-400",
    badge: "Analytics",
  },
  {
    title: "Team Insights",
    description:
      "Explore constructor performance, pit stop efficiency, and strategic benchmark models.",
    href: "/dashboard/team-insights",
    accent: "text-emerald-400",
    badge: "Insights",
  },
  {
    title: "F1 Live News",
    description:
      "Browse the latest headlines, race reports, and strategic storylines from F1-related sources.",
    href: "/dashboard/news",
    accent: "text-red-400",
    badge: "News",
  },
  {
    title: "Help Center",
    description:
      "Read FAQs, AI explanations, troubleshooting tips, and platform guidance for LapForgeIQ.",
    href: "/dashboard/help",
    accent: "text-cyan-400",
    badge: "Help",
  },
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="space-y-6 theme-text">
      {/* Top welcome panel */}
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-red-400">
          LapForgeIQ Control Center
        </p>
        <h1 className="mt-2 text-4xl font-semibold theme-text">
          Welcome, {session.user?.name || "XYZ"}
        </h1>
        <p className="mt-3 max-w-2xl text-sm theme-text-muted">
          Your motorsport intelligence workspace is active. Launch telemetry,
          strategy, replay, weather, analytics, and news systems from this
          command dashboard.
        </p>
      </div>

      {/* Status cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
            Session Status
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-emerald-400">
            Authenticated
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Protected route access confirmed.
          </p>
        </div>

        <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
            User Email
          </p>
          <h2 className="mt-3 break-all text-lg font-semibold theme-text">
            {session.user?.email || "Unavailable"}
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Session data loaded from authentication state.
          </p>
        </div>

        <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
            AI Platform
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-cyan-400">
            RaceMind AI
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Strategy generation pipeline online.
          </p>
        </div>

        <div className="theme-panel rounded-[24px] border p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] theme-text-faint">
            Platform Mode
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-red-400">
            Live Build
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Ready for race intelligence workflows.
          </p>
        </div>
      </div>

      {/* NEW: Live F1 grid panel */}
      <TeamLivePanel />

      {/* Launch Systems grid */}
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            Launch Systems
          </p>
          <h2 className="mt-2 text-3xl font-semibold theme-text">
            Interactive Platform Modules
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Every card below opens a working section of the LapForgeIQ platform.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {actionCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="theme-panel-soft theme-card-hover rounded-[24px] border p-5 transition duration-300 hover:border-white/20"
            >
              <p
                className={`text-xs uppercase tracking-[0.25em] ${card.accent}`}
              >
                {card.badge}
              </p>
              <h3 className="mt-3 text-2xl font-semibold theme-text">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-7 theme-text-muted">
                {card.description}
              </p>
              <div className="mt-5 inline-flex items-center text-sm font-medium theme-text-muted">
                Open module
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

            {/* Official Formula 1 link panel */}
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-400">
              Official Series
            </p>
            <h2 className="mt-2 text-2xl font-semibold theme-text">
              Visit Official Formula 1
            </h2>
            <p className="mt-2 text-sm theme-text-muted">
              For official standings, schedules, and race reports, visit the
              official Formula 1 website in a separate tab.
            </p>
          </div>

          <a
            href="https://www.formula1.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:scale-[1.01]"
          >
            Visit Official Formula 1
          </a>
        </div>
      </div>
    </section>
  );
}