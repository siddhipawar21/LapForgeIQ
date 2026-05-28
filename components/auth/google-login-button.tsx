"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <button
      onClick={handleLogin}
      className="relative flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-[1.02]"
    >
      {loading ? "Signing in..." : "Continue with Google"}
    </button>
  );
}