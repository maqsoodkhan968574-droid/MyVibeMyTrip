"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Sparkles, X } from "lucide-react";

const hiddenRoutes = ["/login", "/register", "/admin-login", "/admin", "/dashboard"];
const promptStorageKey = "myvibemytrip-login-prompt-seen-v2";

export function LoginPromptModal() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  function dismissPrompt() {
    window.localStorage.setItem(promptStorageKey, "true");
    setVisible(false);
  }

  useEffect(() => {
    const shouldHide = hiddenRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
    const alreadySeen = window.localStorage.getItem(promptStorageKey) === "true";
    const hasSessionCookie = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("next-auth.session-token=") || cookie.trim().startsWith("__Secure-next-auth.session-token="));

    if (shouldHide || alreadySeen || hasSessionCookie) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(promptStorageKey, "true");
      setVisible(false);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-3 top-20 z-50 mx-auto max-w-md sm:top-24">
      <section className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
        <button
          type="button"
          aria-label="Close login popup"
          onClick={dismissPrompt}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-navy"
        >
          <X size={18} />
        </button>

        <div className="pr-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-green-700">
            <Sparkles size={13} />
            Save your travel vibe
          </p>
          <h2 className="mt-3 text-xl font-black leading-tight text-navy">Login to save trips and compatibility results</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Create your traveler space for saved packages, trip cart, quiz profile, and future bookings.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href="/login"
            onClick={dismissPrompt}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-black text-white transition hover:bg-green-800"
          >
            <LogIn size={16} />
            Login
          </Link>
          <Link
            href="/register"
            onClick={dismissPrompt}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-black text-navy transition hover:border-green-300 hover:text-green-700"
          >
            Signup
          </Link>
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
          <div className="login-prompt-progress h-full rounded-full bg-amber-400" />
        </div>
      </section>
    </div>
  );
}
