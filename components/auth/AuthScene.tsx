// components/auth/AuthScene.tsx
"use client";

import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

const CarCanvas = dynamic(() => import("@/components/three/CarCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

type Props = {
  children: ReactNode;
};

export default function AuthScene({ children }: Props) {
  const [loginVisible, setLoginVisible] = useState(false);

  const handleCarClick = () => {
    setLoginVisible(true);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black">
      {/* 3D car - always mounted, never re-created */}
      <div className="absolute inset-0">
        <CarCanvas onCarClick={handleCarClick} />
      </div>

      {/* hint */}
      {!loginVisible && (
        <p className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/50">
          Click the car to enter
        </p>
      )}

      {/* login card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div
          className={`w-full max-w-5xl rounded-3xl border border-white/10 bg-black/80 p-8 backdrop-blur-2xl transition-all duration-700 ${
            loginVisible
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}