"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Building, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const data = await response.json();
      setMessage(data.error ?? "Unable to register.");
      return;
    }
    await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      callbackUrl: "/dashboard"
    });
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Full name
          <span className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-3">
            <User size={18} className="text-green-600" />
            <input name="name" placeholder="Your name" className="w-full outline-none" required />
          </span>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Account type
          <span className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-3">
            <Building size={18} className="text-green-600" />
            <select name="role" className="w-full bg-transparent outline-none">
              <option value="USER">Buyer / Tenant</option>
              <option value="USER">Seller</option>
              <option value="AGENT">Agent</option>
            </select>
          </span>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Email
        <span className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-3">
          <Mail size={18} className="text-green-600" />
          <input name="email" type="email" placeholder="you@example.com" className="w-full outline-none" required />
        </span>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Password
        <input name="password" type="password" placeholder="Create a strong password" className="rounded-lg border border-slate-200 px-3 py-3 outline-none focus:border-brand" required />
      </label>
      {message && <p className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{message}</p>}
      <Button type="submit">Register</Button>
    </form>
  );
}
