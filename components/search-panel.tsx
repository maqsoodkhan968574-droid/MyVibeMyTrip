"use client";

import { useState } from "react";
import { Home, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = ["Buy", "Rent", "Sell"] as const;

export function SearchPanel() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Buy");

  return (
    <div className="rounded-lg bg-white p-3 shadow-soft">
      <div className="mb-3 grid grid-cols-3 rounded-lg bg-slate-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`rounded-md px-4 py-2 text-sm font-bold transition ${active === tab ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:text-navy"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <form action="/properties" className="grid gap-3 lg:grid-cols-[1.1fr_1fr_1fr_1fr_auto]">
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
          <MapPin size={18} className="text-green-600" />
          <input name="city" placeholder="City" className="w-full outline-none" />
        </label>
        <label className="rounded-lg border border-slate-200 px-4 py-3">
          <input name="locality" placeholder="Locality" className="w-full outline-none" />
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
          <Home size={18} className="text-green-600" />
          <select name="type" className="w-full bg-transparent outline-none">
            <option>Property type</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Studio</option>
            <option>Penthouse</option>
          </select>
        </label>
        <label className="rounded-lg border border-slate-200 px-4 py-3">
          <select name="price" className="w-full bg-transparent outline-none">
            <option>Price range</option>
            <option>Under ₹1 Cr</option>
            <option>₹1 Cr - ₹3 Cr</option>
            <option>₹3 Cr+</option>
          </select>
        </label>
        <input type="hidden" name="status" value={active} />
        <Button className="gap-2" type="submit">
          <Search size={18} /> Search
        </Button>
      </form>
    </div>
  );
}
