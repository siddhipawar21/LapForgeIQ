"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Gauge,
  Brain,
  PlaySquare,
  CloudSun,
  BarChart3,
  Users,
  Settings,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Telemetry", href: "/dashboard/telemetry", icon: Gauge },
  { label: "AI Strategy", href: "/dashboard/strategy", icon: Brain },
  { label: "Replay Engine", href: "/dashboard/replay", icon: PlaySquare },
  { label: "Weather", href: "/dashboard/weather", icon: CloudSun },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Team Insights", href: "/dashboard/team-insights", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({
  mobileOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          className="theme-overlay fixed inset-0 z-40 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={clsx(
          "theme-sidebar fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r px-5 py-6 transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-400">
              LapForgeIQ
            </p>
            <h1 className="mt-2 text-2xl font-semibold theme-text">
              Race Control
            </h1>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border theme-border p-2 theme-text-muted hover:bg-white/10 hover:text-inherit lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition",
                  active
                    ? "theme-active-nav"
                    : "theme-text-muted border-transparent hover:bg-white/10 hover:text-inherit"
                )}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="rounded-2xl border theme-panel-soft p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
            AI Engine
          </p>
          <p className="mt-2 text-sm font-medium theme-text">
            IBM Granite Active
          </p>
        </div>
      </aside>
    </>
  );
}