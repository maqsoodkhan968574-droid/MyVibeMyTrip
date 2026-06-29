"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

type LoginFormProps = {
  callbackUrl?: string;
  submitLabel?: string;
  identifierLabel?: string;
  identifierPlaceholder?: string;
  identifierType?: "email" | "text";
  showSocialLogin?: boolean;
  autoComplete?: "on" | "off";
};

export function LoginForm({
  callbackUrl,
  submitLabel = "Login",
  identifierLabel = "Email",
  identifierPlaceholder = "you@example.com",
  identifierType = "email",
  showSocialLogin = true,
  autoComplete = "on"
}: LoginFormProps) {
  const destination = callbackUrl ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    setMessage("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: destination
    });
    if (result?.error) setMessage("Invalid email or password.");
    if (result?.ok) window.location.href = destination;
  }

  return (
    <>
      <form className="mt-6 grid gap-4" onSubmit={(event) => { event.preventDefault(); void handleLogin(); }}>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          {identifierLabel}
          <span className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-3">
            <Mail size={18} className="text-green-600" />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type={identifierType}
              placeholder={identifierPlaceholder}
              autoComplete={autoComplete === "off" ? "off" : identifierType === "email" ? "email" : "username"}
              className="w-full outline-none"
              required
            />
          </span>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Password
          <span className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-3">
            <Lock size={18} className="text-green-600" />
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Password"
              autoComplete={autoComplete === "off" ? "new-password" : "current-password"}
              className="w-full outline-none"
              required
            />
          </span>
        </label>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" className="accent-brand" /> Remember me</label>
          <a href="/forgot-password" className="font-semibold text-green-700">Forgot password?</a>
        </div>
        {message && <p className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{message}</p>}
        <Button type="submit">{submitLabel}</Button>
      </form>
      {showSocialLogin ? (
        <div className="mt-5 grid gap-3">
          <Button type="button" variant="secondary" onClick={() => signIn("google", { callbackUrl: destination })}>
            Continue with Google
          </Button>
        </div>
      ) : null}
    </>
  );
}
