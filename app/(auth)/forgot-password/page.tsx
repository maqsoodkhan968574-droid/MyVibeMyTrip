import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Reset access</p>
        <h1 className="mt-2 text-3xl font-black text-navy">Forgot password</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Enter your email and Rivanta Realty will send reset instructions.</p>
        <ForgotPasswordForm />
        <Link href="/login" className="mt-5 block text-center text-sm font-bold text-green-700">Back to login</Link>
      </section>
    </main>
  );
}
