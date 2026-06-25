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
        <div className="founder-vision-reveal mx-auto max-w-5xl rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-8 lg:p-10">
          <div className="flex flex-col gap-7 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-amber-200">
                <Sparkles size={15} />
                Founder Vision
              </p>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-normal sm:text-4xl">
                A Vision by Harsh Raj
              </h2>
              <p className="mt-3 text-base font-semibold leading-7 text-cyan-100 sm:text-lg">
                Building the world's first compatibility-first travel platform.
              </p>
            </div>

            <div className="relative">
              <Quote className="mb-4 text-amber-300" size={34} strokeWidth={1.7} />
              <div className="grid gap-4 text-sm leading-7 text-slate-200 sm:text-base">
                <p>
                  MyVibeMyTrip was born from a real travel problem: people visiting the same destination, but not enjoying the journey because their vibe, pace, interests, and expectations were completely different.
                </p>
                <p className="rounded-lg border border-amber-300/25 bg-amber-300/10 p-4 text-lg font-black leading-7 text-white">
                  People don't just choose destinations. They should choose the people they travel with.
                </p>
                <p>
                  Our mission is to make group travel feel safer, more natural, and more memorable by matching like-minded travelers before the trip begins.
                </p>
              </div>

              <blockquote className="mt-6 rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-4 text-lg font-black leading-7 text-white sm:text-xl">
                "We don't just build trips. We build unforgettable journeys with the right people."
              </blockquote>

              <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-['Brush_Script_MT','Segoe_Script',cursive] text-3xl text-white sm:text-4xl">
                      Harsh Raj
                    </p>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-300 text-navy shadow-lg">
                      <BadgeCheck size={18} />
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
