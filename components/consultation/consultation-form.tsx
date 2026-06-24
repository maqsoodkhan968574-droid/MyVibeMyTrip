"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const inputClassName =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-green-100";

export function ConsultationForm() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });

    setSubmitting(false);
    if (!response.ok) {
      setMessage("Please check your details and try again.");
      return;
    }

    const { consultation } = await response.json() as { consultation: { id: string } };
    router.push(`/consultation/payment/${consultation.id}`);
    return;
    setMessage("Your consultation request is confirmed. Our executive will contact you to arrange the ₹1,100 token payment and meeting.");
  }

  return (
    <form onSubmit={handleSubmit} className="border border-slate-200 bg-white p-5 text-navy shadow-soft sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">Priority consultation</p>
          <h3 className="mt-1 text-2xl font-black">Meet a senior executive</h3>
        </div>
        <span className="shrink-0 rounded-lg bg-green-50 px-3 py-2 text-sm font-black text-green-700">₹1,100</span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          I want to
          <select name="purpose" className={inputClassName} defaultValue="BUY">
            <option value="BUY">Buy a property</option>
            <option value="SELL">Sell a property</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Full name
          <input name="name" required placeholder="Your name" className={inputClassName} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Phone number
          <input name="phone" required type="tel" placeholder="+91 98765 43210" className={inputClassName} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Email
          <input name="email" required type="email" placeholder="you@example.com" className={inputClassName} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          District / city
          <input name="district" required placeholder="e.g. Pune, Maharashtra" className={inputClassName} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Preferred meeting date
          <input name="preferredDate" required type="date" className={inputClassName} />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
        Full address
        <textarea name="address" required rows={3} placeholder="House / building, street, locality, PIN code" className={inputClassName} />
      </label>

      <div className="mt-5 flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
        <ShieldCheck className="shrink-0 text-green-700" size={22} />
        <p className="text-sm leading-6 text-slate-700">
          <strong className="text-navy">100% refundable token.</strong> If you are not satisfied with the one-to-one consultation, your ₹1,100 token is refunded.
        </p>
      </div>
      {message && <p className="mt-4 rounded-lg bg-slate-100 p-3 text-sm font-semibold text-slate-700">{message}</p>}
      <Button type="submit" disabled={submitting} className="mt-5 w-full gap-2 shadow-sm">
        <CalendarDays size={18} /> {submitting ? "Sending request..." : "Request one-to-one meeting"}
      </Button>
      <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <CheckCircle2 size={15} className="text-green-600" /> Fast-track support for serious buying and selling decisions.
      </p>
    </form>
  );
}
