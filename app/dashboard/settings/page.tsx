import SettingsPanel from "../../../components/settings/settings-panel";

export default function SettingsPage() {
  return (
    <main className="space-y-6 theme-text">
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] theme-text-faint">
          Settings
        </p>
        <h1 className="mt-2 text-4xl font-semibold theme-text">
          Platform Configuration Center
        </h1>
        <p className="mt-3 max-w-3xl text-sm theme-text-muted">
          Personalize LapForgeIQ with theme controls, AI behavior settings, and
          runtime interaction preferences.
        </p>
      </div>

      <SettingsPanel />
    </main>
  );
}