import { BadgeCheck, Plane, Quote, Sparkles } from "lucide-react";

export function FounderVision() {
  return (
    <section className="founder-vision-section relative overflow-hidden bg-[#071A2F] py-14 text-white sm:py-16">
      <div className="founder-map-texture absolute inset-0 opacity-45" />
      <div className="absolute inset-x-0 bottom-0 h-44 opacity-30">
        <div className="founder-mountain founder-mountain-back" />
        <div className="founder-mountain founder-mountain-front" />
      </div>
      <div className="absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute right-[12%] top-12 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="founder-stars absolute inset-0" />
      <Plane className="founder-plane absolute right-8 top-16 text-amber-300/80" size={24} />

      <div className="container-shell relative">
        <div className="founder-vision-reveal mx-auto max-w-4xl rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-amber-200">
                <Sparkles size={15} />
                Founder Vision
              </p>
              <h2 className="mt-5 text-2xl font-black leading-tight tracking-normal sm:text-4xl">
                A Vision by Harsh Raj
              </h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-cyan-100 sm:text-base">
                Building the world's first compatibility-first travel platform.
              </p>
            </div>

            <div className="relative">
              <Quote className="mb-3 text-amber-300" size={30} strokeWidth={1.7} />
              <p className="text-sm leading-7 text-slate-200 sm:text-base">
                MyVibeMyTrip exists because the right people can turn a normal trip into an unforgettable journey.
              </p>

              <blockquote className="mt-4 rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-4 text-base font-black leading-7 text-white sm:text-lg">
                "We don't just build trips. We build journeys with the right people."
              </blockquote>

              <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-['Brush_Script_MT','Segoe_Script',cursive] text-3xl text-white">
                      Harsh Raj
                    </p>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-300 text-navy shadow-lg">
                      <BadgeCheck size={16} />
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
                    Founder, MyVibeMyTrip.com
                  </p>
                </div>
                <span className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                  Mission-driven travel startup
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
