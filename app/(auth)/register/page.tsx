import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Create account</p>
        <h1 className="mt-2 text-3xl font-black text-navy">Start your property journey</h1>
        <RegisterForm />
        <p className="mt-6 text-center text-sm text-slate-600">
          Already registered? <Link href="/login" className="font-bold text-green-700">Login</Link>
        </p>
      </section>
    </main>
  );
}
