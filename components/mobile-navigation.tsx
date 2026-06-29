"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigationLinks } from "@/data/travel";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="grid h-11 w-11 place-items-center rounded-lg text-navy transition hover:bg-slate-100"
      >
        {open ? <X size={23} /> : <Menu size={24} />}
      </button>
      {open ? (
        <nav aria-label="Mobile navigation" className="absolute left-0 top-full max-h-[calc(100vh-64px)] w-full overflow-y-auto border-b border-slate-200 bg-white p-4 shadow-lg">
          <div className="container-shell grid gap-1 pb-3">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3.5 text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-navy">
                {link.label}
              </Link>
            ))}
            <Link href="/compatibility-quiz" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-navy px-4 py-3 text-center text-sm font-bold text-white">
              Take Compatibility Quiz
            </Link>
            <Link href="/login" onClick={() => setOpen(false)} className="rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-bold text-navy">
              Account
            </Link>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
