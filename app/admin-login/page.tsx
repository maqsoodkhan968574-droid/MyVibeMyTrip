import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/admin";

  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center bg-slate-950 px-4 py-12">
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-white p-6 shadow-soft">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-navy text-amber-300">
            <ShieldCheck size={24} />
          </span>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Admin access</p>
            <h1 className="text-3xl font-black text-navy">MyVibe admin login</h1>
          </div>
        </div>
        <p className="rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-600">
          This secure space is only for MyVibeMyTrip admins to manage travel packages, itineraries, destination galleries, partner content, and website operations.
        </p>
        <LoginForm
          callbackUrl={callbackUrl}
          submitLabel="Enter admin panel"
          identifierLabel="Email ID"
          identifierPlaceholder=""
          identifierType="text"
          showSocialLogin={false}
          autoComplete="off"
        />
        <div className="mt-5 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm font-semibold text-slate-700">
          <LockKeyhole className="shrink-0 text-amber-600" size={17} />
          Admin routes are hidden from normal users and require an admin account.
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          Traveler login? <Link href="/login" className="font-bold text-green-700">Go to customer login</Link>
        </p>
      </section>
    </main>
  );
}
