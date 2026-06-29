import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Create traveler account</p>
        <h1 className="mt-2 text-3xl font-black text-navy sm:text-4xl">Save your vibe, trips, and travel cart</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Your account will help MyVibeMyTrip remember your travel style, package shortlist, future bookings, and compatibility results.
        </p>
        <RegisterForm />
        <p className="mt-6 text-center text-sm text-slate-600">
          Already registered? <Link href="/login" className="font-bold text-green-700">Login</Link>
        </p>
      </section>
    </main>
  );
}
