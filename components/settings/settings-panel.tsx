"use client";

import { useEffect, useState } from "react";

type SettingsState = {
  theme: "dark" | "light";
  aiMode: "balanced" | "aggressive" | "conservative";
  telemetryAnimations: boolean;
  soundEffects: boolean;
  autoSaveStrategies: boolean;
  raceNotifications: boolean;
};

const defaultSettings: SettingsState = {
  theme: "dark",
  aiMode: "balanced",
  telemetryAnimations: true,
  soundEffects: false,
  autoSaveStrategies: true,
  raceNotifications: true,
};

export default function SettingsPanel() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem("apexiq-settings");

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as SettingsState;
        setSettings(parsed);

        if (parsed.theme) {
          document.documentElement.setAttribute("data-theme", parsed.theme);
        }
      } catch {
        setSettings(defaultSettings);
      }
    } else {
      document.documentElement.setAttribute("data-theme", defaultSettings.theme);
    }
  }, []);

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (key === "theme") {
      document.documentElement.setAttribute("data-theme", value as string);
    }

    setSaved(false);
  };

  const handleSave = () => {
    window.localStorage.setItem("apexiq-settings", JSON.stringify(settings));
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] theme-text-faint">
            Appearance
          </p>
          <h2 className="mt-2 text-3xl font-semibold theme-text">
            Platform Preferences
          </h2>
          <p className="mt-2 text-sm theme-text-muted">
            Control theme, AI behavior, and interaction settings for LapForgeIQ.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium theme-text-muted">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) =>
                  updateSetting("theme", e.target.value as "dark" | "light")
                }
                className="theme-input w-full rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
              >
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium theme-text-muted">
                AI Strategy Mode
              </label>
              <select
                value={settings.aiMode}
                onChange={(e) =>
                  updateSetting(
                    "aiMode",
                    e.target.value as "balanced" | "aggressive" | "conservative"
                  )
                }
                className="theme-input w-full rounded-2xl border px-4 py-3 outline-none focus:border-cyan-400"
              >
                <option value="balanced">Balanced</option>
                <option value="aggressive">Aggressive</option>
                <option value="conservative">Conservative</option>
              </select>
            </div>
          </div>
        </div>

        <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            System Toggles
          </p>
          <h2 className="mt-2 text-3xl font-semibold theme-text">
            Runtime Controls
          </h2>

          <div className="mt-6 space-y-4">
            {[
              {
                key: "telemetryAnimations",
                label: "Telemetry Animations",
                value: settings.telemetryAnimations,
              },
              {
                key: "soundEffects",
                label: "Sound Effects",
                value: settings.soundEffects,
              },
              {
                key: "autoSaveStrategies",
                label: "Auto-save Strategies",
                value: settings.autoSaveStrategies,
              },
              {
                key: "raceNotifications",
                label: "Race Notifications",
                value: settings.raceNotifications,
              },
            ].map((item) => (
              <div
                key={item.key}
                className="theme-panel-soft flex items-center justify-between rounded-2xl border px-4 py-4"
              >
                <span className="text-sm font-medium theme-text">
                  {item.label}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateSetting(
                      item.key as keyof SettingsState,
                      !item.value as never
                    )
                  }
                  className={`relative h-8 w-14 rounded-full transition ${
                    item.value ? "bg-cyan-400" : "bg-white/15"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                      item.value ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">
              Save Preferences
            </p>
            <h2 className="mt-2 text-2xl font-semibold theme-text">
              Persist User Configuration
            </h2>
            <p className="mt-2 text-sm theme-text-muted">
              Save your theme and runtime settings for the next session.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-[1.01]"
          >
            Save Settings
          </button>
        </div>

        {saved && (
          <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            Settings saved successfully.
          </div>
        )}
      </div>
    </div>
  );
}