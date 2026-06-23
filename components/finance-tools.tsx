"use client";

import { useMemo, useState } from "react";
import { Calculator, IndianRupee } from "lucide-react";

const formatRupees = (amount: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.max(0, Math.round(amount)));

export function FinanceTools() {
  const [tool, setTool] = useState<"emi" | "value">("emi");
  const [loan, setLoan] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [currentValue, setCurrentValue] = useState(7500000);
  const [growth, setGrowth] = useState(6);
  const [valueYears, setValueYears] = useState(5);

  const emi = useMemo(() => {
    const monthlyRate = rate / 1200;
    const months = years * 12;
    if (!monthlyRate) return months ? loan / months : 0;
    return (loan * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
  }, [loan, rate, years]);
  const futureValue = useMemo(() => currentValue * (1 + growth / 100) ** valueYears, [currentValue, growth, valueYears]);
  const numberInput = (label: string, value: number, onChange: (value: number) => void, suffix?: string) => (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <div className="flex items-center border border-slate-200 bg-white">
        <input className="w-full bg-transparent px-3 py-3 outline-none" min="0" type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} />
        {suffix && <span className="pr-3 text-sm text-slate-500">{suffix}</span>}
      </div>
    </label>
  );

  return (
    <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-green-700">Tools</p><h3 className="mt-1 text-2xl font-black text-navy">Property calculators</h3></div>
        <Calculator className="text-green-600" size={30} />
      </div>
      <div className="mt-6 grid grid-cols-2 border border-slate-200 p-1">
        {(["emi", "value"] as const).map((item) => (
          <button key={item} type="button" onClick={() => setTool(item)} className={`px-3 py-2 text-sm font-bold ${tool === item ? "bg-navy text-white" : "text-slate-600"}`}>
            {item === "emi" ? "EMI calculator" : "Property value"}
          </button>
        ))}
      </div>
      {tool === "emi" ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {numberInput("Loan amount", loan, setLoan)}
          {numberInput("Interest rate", rate, setRate, "%")}
          {numberInput("Loan term", years, setYears, "years")}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {numberInput("Current property value", currentValue, setCurrentValue)}
          {numberInput("Expected annual growth", growth, setGrowth, "%")}
          {numberInput("After", valueYears, setValueYears, "years")}
        </div>
      )}
      <div className="mt-6 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-600">{tool === "emi" ? "Estimated monthly EMI" : `Estimated value after ${valueYears} years`}</p>
        <p className="mt-1 flex items-center gap-1 text-3xl font-black text-navy"><IndianRupee size={24} />{formatRupees(tool === "emi" ? emi : futureValue)}</p>
        <p className="mt-2 text-xs leading-5 text-slate-500">This is an illustration. Actual financing and property values may vary.</p>
      </div>
    </div>
  );
}
