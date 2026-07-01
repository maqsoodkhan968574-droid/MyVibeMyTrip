"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import type { QuizAnswers } from "@/types/travel";
import { getCompatibilityResult } from "@/utils/compatibility";

const defaultAnswers: QuizAnswers = {
  ageGroup: "18-24",
  travelType: "Friends",
  preferredGroup: "Same age group",
  budget: "Standard",
  energy: "High energy",
  music: "Pop",
  food: "Cafe hopping",
  adventure: "High",
  wakeUp: "Early sunrise",
  photography: "High",
  language: "Hindi",
  womenOnly: "No",
  duration: "5-6 days"
};

const quickFields = [
  { key: "ageGroup", label: "Age", options: ["18-24", "25-34", "35-44", "45-54", "55+"] },
  { key: "travelType", label: "Type", options: ["Solo", "Friends", "Couple", "Family"] },
  { key: "budget", label: "Budget", options: ["Budget", "Standard", "Premium", "Luxury"] },
  { key: "energy", label: "Energy", options: ["Relaxed", "Balanced", "High energy"] },
  { key: "adventure", label: "Adventure", options: ["Low", "Medium", "High"] },
  { key: "photography", label: "Reels", options: ["Low", "Medium", "High"] }
] as const;

export function HomeLiveMatcher() {
  const [answers, setAnswers] = useState<QuizAnswers>(defaultAnswers);
  const result = getCompatibilityResult(answers);

  return (
    <div className="rounded-lg border border-white/15 bg-white/95 p-4 text-navy shadow-soft sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Live matching preview</p>
          <h2 className="mt-2 text-xl font-black sm:text-2xl">Find your group vibe instantly</h2>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-green-50 text-green-700">
          <Sparkles size={20} />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5">
        {quickFields.map((field) => (
          <label key={field.key} className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
            {field.label}
            <select
              value={answers[field.key]}
              onChange={(event) => setAnswers((current) => ({ ...current, [field.key]: event.target.value }))}
              className="min-h-10 rounded-lg border border-slate-200 bg-slate-50 px-2 text-sm font-bold normal-case tracking-normal text-slate-800 outline-none transition focus:border-green-600 focus:bg-white"
            >
              {field.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-navy p-4 text-white">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-300">Your live match</p>
        <h3 className="mt-2 text-xl font-black leading-tight">{result.vibe}</h3>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-slate-300">Compatibility Score</p>
            <strong className="text-4xl font-black text-green-300">{result.score}%</strong>
          </div>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-gradient-to-r from-green-300 to-amber-300 transition-all duration-500" style={{ width: `${result.score}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {result.groups.slice(0, 2).map((group) => (
          <p key={group} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700">
            <CheckCircle2 size={17} className="shrink-0 text-green-700" />
            {group}
          </p>
        ))}
      </div>

      <Link href="/compatibility-quiz" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-amber-400 px-4 py-2 text-sm font-black text-navy transition hover:bg-amber-300">
        Take full quiz
      </Link>
    </div>
  );
}
