// app/dashboard/help/page.tsx

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-[#05070b] text-white">
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
              Each module runs real logic, not static placeholder screens.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-[11px] uppercase tracking-[0.25em] text-red-300">
              Troubleshooting
            </p>
            <h2 className="mt-2 text-lg font-semibold">Something broken?</h2>
            <p className="mt-2 text-sm text-white/70">
              If you see errors or empty data, reload the page, check your
              internet, and verify API keys in <code>.env.local</code> (OpenAI,
              weather, etc.) are set. Then restart <code>npm run dev</code> and
              retry the action.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-300">
              Data &amp; Privacy
            </p>
            <h2 className="mt-2 text-lg font-semibold">Your information</h2>
            <p className="mt-2 text-sm text-white/70">
              The app uses Google authentication for login and pulls racing and
              weather data from public APIs. It is a prototype; no sensitive F1
              team data is stored or offered as a production service.
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
              Use the Login page and click &quot;Continue with Google&quot;.
              After successful sign-in, you&apos;re redirected to the protected
              LapForgeIQ dashboard where all modules are available.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-cyan-300">
              2. Why does the AI strategy generator sometimes fail?
            </h3>
            <p className="mt-2 text-sm text-white/75">
              The strategy engine depends on external AI APIs. If the API key is
              missing, invalid, or out of quota, the request fails and LapForgeIQ
              returns a clear error instead of fake strategies. Updating the key
              and restarting the dev server usually fixes it.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-cyan-300">
              3. Is the race data live or historical?
            </h3>
            <p className="mt-2 text-sm text-white/75">
              LapForgeIQ can show near real-time information from recent sessions
              and historical races using public motorsport APIs such as OpenF1.
              True live timing may require additional authenticated access to
              supported data providers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-cyan-300">
              4. Can I use LapForgeIQ for real race engineering decisions?
            </h3>
            <p className="mt-2 text-sm text-white/75">
              No. LapForgeIQ is a learning and demo platform built for the IBM
              SkillsBuild AI Builders Challenge. It should not replace official
              team tools, official timing, or professional race engineering
              systems during real events.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-cyan-300">
              5. Why does some weather or telemetry data look like &quot;demo&quot;?
            </h3>
            <p className="mt-2 text-sm text-white/75">
              When external APIs do not provide the required data or you are
              offline, LapForgeIQ may fall back to clearly labeled demo or
              simulated values so charts and UI elements still demonstrate the
              experience.
            </p>
          </div>
        </section>

        {/* AI explanation */}
        <section className="rounded-[28px] border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">How the AI Strategy Engine Works</h2>
          <p className="mt-3 text-sm text-white/75">
            The AI strategy system takes inputs such as track, weather, tire
            compound, driver aggression, fuel load, safety car probability, and
            custom notes. It then uses large language models and racing logic to
            generate pit windows, tire plans, overtake windows, risk analysis,
            and predicted performance.
          </p>
          <p className="mt-2 text-sm text-white/75">
            It operates on public data and model reasoning rather than private
            team telemetry. All outputs are analytical suggestions for learning,
            not guaranteed race results or official advice.
          </p>
          <p className="mt-2 text-xs text-white/50">
            Powered using advanced AI technologies inspired by IBM Watson
            capabilities in the context of the IBM SkillsBuild AI Builders
            Challenge.
          </p>
        </section>

        {/* Feedback & support */}
        <section className="rounded-[28px] border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">Feedback &amp; Support</h2>
          <p className="mt-3 text-sm text-white/75">
            To report a bug or request a feature, open an issue in the project&apos;s
            Git repository or share details directly with the maintainer.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-white/75">
            <li>• Explain what you were trying to do.</li>
            <li>• Include screenshots of the dashboard or error messages.</li>
            <li>• Mention your browser and any console/terminal errors you saw.</li>
          </ul>
          <p className="mt-3 text-xs text-white/50">
            For official regulations, live timing, and race information, always
            refer to the official Formula 1 website and your data providers&apos;
            own documentation and privacy policies.
          </p>
        </section>
      </div>
    </main>
  );
}