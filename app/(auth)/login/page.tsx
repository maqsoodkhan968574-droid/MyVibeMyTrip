import Link from "next/link";
import { BriefcaseBusiness, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/dashboard";

  return (
    <main className="bg-slate-50 px-4 py-10 sm:py-14">
      <section className="mx-auto grid w-full max-w-5xl gap-5 lg:grid-cols-[1fr_0.72fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-green-700">
            <Sparkles size={14} />
            Traveler account
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight text-navy sm:text-4xl">Login to MyVibeMyTrip.com</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Save your compatibility profile, shortlisted group packages, trip cart, and future bookings in one private traveler space.
          </p>
          <LoginForm callbackUrl={callbackUrl} />
          <p className="mt-6 text-center text-sm text-slate-600">
            New here? <Link href="/register" className="font-bold text-green-700">Create a traveler account</Link>
          </p>
        </div>

        <aside className="grid gap-4">
          <div className="rounded-lg bg-navy p-6 text-white shadow-soft">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/10 text-amber-300">
              <HeartHandshake size={24} />
            </span>
            <h2 className="mt-4 text-2xl font-black">Your travel space</h2>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
              <p>Save vibe quiz results and matching preferences.</p>
              <p>Keep selected packages in a trip cart for later booking.</p>
              <p>Return anytime to compare groups, durations, and budgets.</p>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white text-navy">
                <ShieldCheck size={22} />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Admin only</p>
                <h2 className="mt-1 font-black text-navy">MyVibe control room</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Manage packages, itineraries, destinations, and travel content from the separate admin login.
                </p>
                <Link href="/admin-login" className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-black text-white transition hover:bg-green-800">
                  <BriefcaseBusiness size={16} />
                  Admin login
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
