"use client";

import { useState } from "react";
import { CreditCard, Loader2, Minus, Plus, UsersRound } from "lucide-react";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => { open: () => void };
  }
}

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
};

type RazorpayPaymentResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type PackagePaymentButtonProps = {
  packageSlug: string;
  packageTitle: string;
  className?: string;
  compact?: boolean;
};

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function PackagePaymentButton({ packageSlug, packageTitle, className = "", compact = false }: PackagePaymentButtonProps) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const tokenPerAdult = 1100;
  const tokenAmount = adults * tokenPerAdult;

  const updateAdults = (change: number) => {
    setAdults((current) => Math.min(20, Math.max(1, current + change)));
  };

  const updateChildren = (change: number) => {
    setChildren((current) => Math.min(20, Math.max(0, current + change)));
  };

  async function startPayment() {
    setLoading(true);
    setStatus("");

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setStatus("Unable to load Razorpay. Please try again.");
      setLoading(false);
      return;
    }

    const orderResponse = await fetch("/api/packages/payment-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packageSlug, adults, children })
    }).catch(() => null);

    const orderData = orderResponse ? await orderResponse.json() : { error: "Payment server is not reachable." };

    if (!orderResponse?.ok) {
      setStatus(orderData.error ?? "Payment is not available yet.");
      setLoading(false);
      return;
    }

    const Razorpay = window.Razorpay;

    if (!Razorpay) {
      setStatus("Razorpay checkout is not ready. Please try again.");
      setLoading(false);
      return;
    }

    const checkout = new Razorpay({
      key: orderData.keyId,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: "MyVibeMyTrip.com",
      description: `${packageTitle} booking token`,
      order_id: orderData.order.id,
      theme: { color: "#071A2F" },
      handler: async (response) => {
        const verifyResponse = await fetch("/api/packages/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ packageSlug, adults, children, ...response })
        }).catch(() => null);
        const verifyData = verifyResponse ? await verifyResponse.json() : { error: "Payment verification is not reachable." };

        if (!verifyResponse?.ok) {
          setStatus(verifyData.error ?? "Payment verification failed.");
          setLoading(false);
          return;
        }

        setStatus("Payment received. Our team will confirm your matched group shortly.");
        setLoading(false);
      },
      modal: {
        ondismiss: () => setLoading(false)
      }
    });

    checkout.open();
  }

  return (
    <div className={className}>
      {!compact ? (
        <div className="mb-4 rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <UsersRound size={18} className="text-green-700" />
            <div>
              <p className="text-sm font-black text-navy">Who are you booking for?</p>
              <p className="text-xs font-semibold text-slate-500">Children are waived off for booking token.</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Adults</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => updateAdults(-1)}
                  disabled={adults <= 1 || loading}
                  className="grid size-9 place-items-center rounded-lg bg-white text-navy shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Reduce adults"
                >
                  <Minus size={15} />
                </button>
                <span className="text-xl font-black text-navy">{adults}</span>
                <button
                  type="button"
                  onClick={() => updateAdults(1)}
                  disabled={adults >= 20 || loading}
                  className="grid size-9 place-items-center rounded-lg bg-white text-navy shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase adults"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Children</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => updateChildren(-1)}
                  disabled={children <= 0 || loading}
                  className="grid size-9 place-items-center rounded-lg bg-white text-navy shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Reduce children"
                >
                  <Minus size={15} />
                </button>
                <span className="text-xl font-black text-navy">{children}</span>
                <button
                  type="button"
                  onClick={() => updateChildren(1)}
                  disabled={children >= 20 || loading}
                  className="grid size-9 place-items-center rounded-lg bg-white text-navy shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase children"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-amber-50 p-3 text-sm font-bold text-slate-700">
            Token amount: <span className="font-black text-navy">INR {tokenAmount.toLocaleString("en-IN")}</span>
            <span className="block text-xs font-semibold text-slate-500">INR {tokenPerAdult.toLocaleString("en-IN")} per adult. Children: INR 0.</span>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={startPayment}
        disabled={loading}
        className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-amber-400 px-3 py-2 text-xs font-black text-navy transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-11 sm:px-4 sm:text-sm"
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : <CreditCard size={16} />}
        {compact ? "Pay token" : `Pay booking token - INR ${tokenAmount.toLocaleString("en-IN")}`}
      </button>
      {status ? <p className="mt-2 text-xs font-bold leading-5 text-slate-600">{status}</p> : null}
    </div>
  );
}
