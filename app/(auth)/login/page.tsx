"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import GoogleLoginButton from "@/components/auth/google-login-button";

const Spline = dynamic(
  () => import("@splinetool/react-spline"),
  {
    ssr: false,
  }
);

export default function LoginPage() {
  const [loginVisible, setLoginVisible] = useState(false);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-black" />
          }
        >
          <Spline
            scene="https://prod.spline.design/LGA3vLxFHarDz4d9/scene.splinecode"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Suspense>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Login Button */}
      {!loginVisible && (
        <div className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2">
          <button
            onClick={() => setLoginVisible(true)}
            className="group relative overflow-hidden rounded-full border border-red-500/30 bg-red-500/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-red-400 hover:bg-red-500/20"
          >
            <span className="relative z-10">
              Enter LapForgeIQ
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </button>
        </div>
      )}

      {/* Login Modal */}
      <AnimatePresence>
        {loginVisible && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          >
            {/* Background Blur */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setLoginVisible(false)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-black/80 p-8 shadow-2xl backdrop-blur-2xl">
              <div className="grid overflow-hidden rounded-[28px] border border-white/10 bg-white/5 lg:grid-cols-2">
                {/* Left Side */}
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <p className="mb-4 text-sm uppercase tracking-[0.3em] text-red-400">
                    LapForgeIQ
                  </p>

                  <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                    AI-powered motorsport intelligence platform.
                  </h1>

                  <p className="mt-6 text-sm leading-relaxed text-white/70">
                    Access telemetry systems, race simulations,
                    AI strategy generation, replay intelligence,
                    and adaptive F1 analytics.
                  </p>

                  {/* Stats */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase text-white/40">
                        Telemetry
                      </p>

                      <p className="mt-2 text-lg font-semibold text-white">
                        Live
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase text-white/40">
                        AI Engine
                      </p>

                      <p className="mt-2 text-lg font-semibold text-white">
                        Granite
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase text-white/40">
                        Strategy
                      </p>

                      <p className="mt-2 text-lg font-semibold text-white">
                        Dynamic
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase text-white/40">
                        Replay
                      </p>

                      <p className="mt-2 text-lg font-semibold text-white">
                        AI Simulation
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center border-t border-white/10 p-8 lg:border-l lg:border-t-0 lg:p-12">
                  <div className="w-full max-w-md">
                    <h2 className="mb-2 text-3xl font-semibold text-white">
                      Welcome back
                    </h2>

                    <p className="mb-8 text-sm text-white/60">
                      Continue securely with your Google account.
                    </p>

                    <GoogleLoginButton />

                    {/* Close */}
                    <button
                      onClick={() => setLoginVisible(false)}
                      className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}