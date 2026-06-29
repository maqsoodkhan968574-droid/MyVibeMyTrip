"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

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
      body: JSON.stringify({ packageSlug })
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
          body: JSON.stringify({ packageSlug, ...response })
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
      <button
        type="button"
        onClick={startPayment}
        disabled={loading}
        className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-amber-400 px-3 py-2 text-xs font-black text-navy transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-11 sm:px-4 sm:text-sm"
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : <CreditCard size={16} />}
        {compact ? "Pay token" : "Pay booking token"}
      </button>
      {status ? <p className="mt-2 text-xs font-bold leading-5 text-slate-600">{status}</p> : null}
    </div>
  );
}
