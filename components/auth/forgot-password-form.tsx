"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm() {
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });
    setMessage("If an account exists, reset instructions will be sent.");
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Email
        <span className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-3">
          <Mail size={18} className="text-green-600" />
          <input name="email" type="email" placeholder="you@example.com" className="w-full outline-none" required />
        </span>
      </label>
      {message && <p className="rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-700">{message}</p>}
      <Button type="submit">Send reset link</Button>
    </form>
  );
}
