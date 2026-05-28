"use client";

import { Menu } from "lucide-react";
import LogoutButton from "@/components/auth/logout-button";

type TopbarProps = {
  onMenuClick?: () => void;
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <div className="theme-panel mb-6 flex items-center justify-between rounded-3xl border px-5 py-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-2xl border theme-border p-2 theme-text-muted hover:bg-white/10 hover:text-inherit lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] theme-text-faint">
            Motorsport Intelligence Platform
          </p>
          <h2 className="mt-1 text-xl font-semibold theme-text">
            LapForgeIQ Operations Dashboard
          </h2>
        </div>
      </div>

      <LogoutButton />
    </div>
  );
}