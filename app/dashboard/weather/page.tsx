import WeatherDashboard from "../../../components/weather/weather-dashboard";

export default function WeatherPage() {
  return (
    <main className="space-y-6 theme-text">
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
          Weather Intelligence
        </p>
        <h1 className="mt-2 text-4xl font-semibold theme-text">
          Track Climate Center
        </h1>
        <p className="mt-3 max-w-3xl text-sm theme-text-muted">
          Monitor live race-location weather, track conditions, and tactical
          weather pressure for strategy planning.
        </p>
      </div>

      <WeatherDashboard />
    </main>
  );
}