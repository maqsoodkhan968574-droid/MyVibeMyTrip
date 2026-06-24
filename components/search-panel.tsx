"use client";

import { useState } from "react";
import { Home, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = ["Buy", "Rent", "Sell"] as const;

export function SearchPanel() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Buy");

  return (
    <div className="border border-white/20 bg-white p-3 shadow-soft sm:p-4">
      <div className="mb-4 flex items-center justify-between px-1">
        <p className="text-sm font-black text-navy">Find a place that fits</p>
        <SlidersHorizontal size={17} className="text-green-700" />
      </div>
      <div className="mb-3 grid grid-cols-3 rounded-lg bg-slate-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`rounded-md px-4 py-2.5 text-sm font-bold transition ${active === tab ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-navy"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <form action="/properties" className="grid gap-3 lg:grid-cols-[1.1fr_1fr_1fr_1fr_auto]">
        <label className="flex items-center gap-2 border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-green-500 focus-within:bg-white">
          <MapPin size={18} className="text-green-600" />
          <input name="city" placeholder="City" className="w-full outline-none" />
        </label>
        <label className="border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-green-500 focus-within:bg-white">
          <input name="locality" placeholder="Locality" className="w-full outline-none" />
        </label>
        <label className="flex items-center gap-2 border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-green-500 focus-within:bg-white">
          <Home size={18} className="text-green-600" />
          <select name="type" className="w-full bg-transparent outline-none">
            <option>Property type</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Studio</option>
            <option>Penthouse</option>
          </select>
        </label>
        <label className="border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-green-500 focus-within:bg-white">
          <select name="price" className="w-full bg-transparent outline-none">
            <option>Price range</option>
            <option>Under ₹1 Cr</option>
            <option>₹1 Cr - ₹3 Cr</option>
            <option>₹3 Cr+</option>
          </select>
        </label>
        <input type="hidden" name="status" value={active} />
        <Button className="gap-2 shadow-sm" type="submit">
          <Search size={18} /> Search
        </Button>
      </form>
    </div>
  );
}
