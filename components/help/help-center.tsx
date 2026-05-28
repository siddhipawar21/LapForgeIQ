// components/help/help-center.tsx

export default function HelpCenter() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 space-y-10">
      {/* Hero */}
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
          Help Center
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold">
          LapForgeIQ Support &amp; Documentation
        </h1>
        <p className="mt-3 text-sm md:text-base text-white/70">
          Understand how to use LapForgeIQ, how the AI strategy systems behave,
          and what to do when something breaks in your motorsport
          intelligence workspace.
        </p>
      </section>

      {/* Quick overview cards */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-300">
            Getting Started
          </p>
          <h2 className="mt-2 text-lg font-semibold">New to LapForgeIQ?</h2>
          <p className="mt-2 text-sm text-white/70">
            Log in with Google, then use the dashboard cards to open
            Telemetry, Strategy, Replay, Weather, Analytics, and News modules.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-[11px] uppercase tracking-[0.25em] text-red-300">
            Troubleshooting
          </p>
          <h2 className="mt-2 text-lg font-semibold">Something broken?</h2>
          <p className="mt-2 text-sm text-white/70">
            If you see an error or empty data, reload the page, check your
            internet, and verify API keys in <code>.env.local</code> are set
            correctly, then restart the dev server.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-300">
            Data &amp; Privacy
          </p>
          <h2 className="mt-2 text-lg font-semibold">Your information</h2>
          <p className="mt-2 text-sm text-white/70">
            The app uses Google authentication and public racing/weather APIs.
            It is a prototype; no sensitive F1 team data is stored as a
            production service.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-8 space-y-6">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>

        <div>
          <h3 className="text-sm font-semibold text-cyan-300">
            1. How do I log in and reach the dashboard?
          </h3>
          <p className="mt-2 text-sm text-white/75">
            Use the Login screen and click &quot;Continue with Google&quot;.
            After successful sign-in, you are redirected to the protected
            LapForgeIQ dashboard.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-cyan-300">
            2. Why does the AI strategy generator sometimes fail?
          </h3>
          <p className="mt-2 text-sm text-white/75">
            The strategy engine depends on external AI APIs. If the API key is
            missing, invalid, or out of quota, the request fails and LapForgeIQ
            returns a clear error instead of fake strategies.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-cyan-300">
            3. Is the race data live or historical?
          </h3>
          <p className="mt-2 text-sm text-white/75">
            LapForgeIQ can show near real-time information from recent sessions and
            historical races using public motorsport APIs such as OpenF1.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-cyan-300">
            4. Can I use LapForgeIQ for real race engineering decisions?
          </h3>
          <p className="mt-2 text-sm text-white/75">
            No. LapForgeIQ is a learning and demo platform and should not replace
            official team tools or professional engineering systems.
          </p>
        </div>
      </section>

      {/* AI explanation + feedback */}
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-8 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            How the AI Strategy Engine Works
          </h2>
          <p className="mt-3 text-sm text-white/75">
            The AI strategy system takes inputs such as track, weather, tire
            compound, driver aggression, fuel load, safety car probability,
            and custom notes, then uses large language models and racing logic
            to generate pit windows, tire plans, overtake windows, risk
            analysis, and predicted performance.
          </p>
          <p className="mt-2 text-sm text-white/75">
            It operates on public data and model reasoning rather than private
            team telemetry. Outputs are analytical suggestions, not guaranteed
            race results.
          </p>
          <p className="mt-2 text-xs text-white/50">
            Powered using advanced AI technologies inspired by IBM Watson
            capabilities in the context of the IBM SkillsBuild AI Builders
            Challenge.
          </p>
        </div>

        <div>
          <h2 className="mt-4 text-xl font-semibold">Feedback &amp; Support</h2>
          <p className="mt-3 text-sm text-white/75">
            To report issues or request features, open an issue in the project
            repository and include what you were doing, screenshots, and any
            console or terminal errors you saw.
          </p>
        </div>
      </section>
    </div>
  );
}