import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Welcome back</p>
        <h1 className="mt-2 text-3xl font-black text-navy">Login to Rivanta Realty</h1>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-slate-600">
          New here? <Link href="/register" className="font-bold text-green-700">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
