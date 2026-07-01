"use client";

import { Check, Download, Share2 } from "lucide-react";
import { useState } from "react";

type TripToolsProps = {
  title: string;
  slug: string;
};

const savedTripsKey = "myvibemytrip-saved-trips";

export function TripTools({ title, slug }: TripToolsProps) {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  const saveTrip = () => {
    const existing = JSON.parse(window.localStorage.getItem(savedTripsKey) ?? "[]") as Array<{ title: string; slug: string }>;
    const next = existing.some((trip) => trip.slug === slug) ? existing : [...existing, { title, slug }];
    window.localStorage.setItem(savedTripsKey, JSON.stringify(next));
    setSaved(true);
  };

  const shareTrip = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await navigator.clipboard.writeText(url);
    }

    setShared(true);
    window.setTimeout(() => setShared(false), 1800);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={saveTrip}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-200"
      >
        {saved ? <Check size={15} /> : <Download size={15} />}
        {saved ? "Saved" : "Save"}
      </button>
      <button
        type="button"
        onClick={shareTrip}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-200"
      >
        {shared ? <Check size={15} /> : <Share2 size={15} />}
        {shared ? "Copied" : "Share"}
      </button>
    </div>
  );
}
