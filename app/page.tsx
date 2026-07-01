import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { CategoryCard } from "@/components/travel/category-card";
import { DestinationCard } from "@/components/travel/destination-card";
import { Footer } from "@/components/footer";
import { FounderVision } from "@/components/travel/founder-vision";
import { PackageCard } from "@/components/travel/package-card";
import { SectionHeading } from "@/components/travel/section-heading";
import { TrustGrid } from "@/components/travel/trust-grid";
import { destinations, groupPackages, howItWorks, testimonials, travelCategories } from "@/data/travel";

export default function HomePage() {
  return (
    <main className="pb-20 md:pb-0">
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <Image
            src="/hero/myvibemytrip-home-hero.png"
            alt="Sikkim and Darjeeling mountain road travel"
            fill
            priority
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-green-950/45" />
        </div>
        <div className="container-shell relative grid min-h-[620px] items-center gap-7 py-8 sm:min-h-[760px] sm:gap-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold text-green-100 sm:px-4 sm:text-sm">
              <Sparkles size={16} /> Compatibility-first group travel
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-normal sm:mt-6 sm:text-6xl lg:text-7xl">
              Travel With People Who Match Your Vibe
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:mt-5 sm:text-lg sm:leading-8">
              A smart group travel platform that matches you with like-minded travelers for Sikkim, Darjeeling, and beyond.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link href="/compatibility-quiz" className="hero-cta-primary inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-lg bg-amber-400 px-5 py-3 text-sm font-black text-navy transition hover:bg-amber-300">
                Take Compatibility Quiz <ArrowRight size={18} />
              </Link>
              <Link href="/group-packages" className="hero-cta-secondary inline-flex min-h-12 items-center justify-center overflow-hidden rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white hover:text-navy">
                Explore Trips
              </Link>
            </div>
            <div className="mt-6 grid max-w-2xl grid-cols-3 gap-2 text-[11px] sm:mt-8 sm:gap-3 sm:text-sm">
              {[
                ["92%", "sample match score"],
                ["10", "phase 1 destinations"],
                ["8", "traveler categories"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/15 bg-white/10 p-3 sm:p-4">
                  <strong className="block text-xl text-amber-300 sm:text-2xl">{value}</strong>
                  <span className="text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/95 p-4 text-navy shadow-soft sm:p-5">
            <p className="eyebrow">Live matching preview</p>
            <h2 className="mt-2 text-xl font-black sm:text-2xl">From random group to right group</h2>
            <div className="mt-4 grid gap-2 sm:mt-5 sm:gap-3">
              {[
                ["Age and trip type", "18-24, friends, high energy"],
                ["Travel style", "Adventure, reels, local cafes"],
                ["Budget and comfort", "Standard stays, shared verified taxi"],
                ["Result", "Gen Z Adventure Explorer, 92% match"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-green-700">{label}</p>
                  <p className="mt-1 font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="container-shell grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-lg bg-red-50 p-5 sm:p-6">
            <p className="eyebrow text-red-700">The problem</p>
            <h2 className="mt-2 text-2xl font-black text-navy sm:text-3xl">Random shared taxis quietly ruin good trips.</h2>
            <p className="mt-4 leading-7 text-slate-700">
              One group wants loud music and snow points, another wants a quiet ride and slow breakfast. Families, couples, solo travelers, seniors, and adventure travelers often get mixed without matching energy, privacy needs, food choices, and pace.
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-5 sm:p-6">
            <p className="eyebrow">The solution</p>
            <h2 className="mt-2 text-2xl font-black text-navy sm:text-3xl">Vibe-based traveler matching before booking.</h2>
            <p className="mt-4 leading-7 text-slate-700">
              We group travelers by age group, travel style, budget, interests, wake-up preference, adventure level, language, and safety preferences, then connect them to verified local travel partners.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <SectionHeading eyebrow="Travel categories" title="Choose a group that feels like your people." copy="Each category is designed around how travelers actually behave on a trip, not only where they want to go." />
        <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">
          {travelCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="container-shell">
          <SectionHeading eyebrow="How it works" title="A smarter path from profile to perfect group." align="center" />
          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-5">
            {howItWorks.map((step, index) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm">
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-navy text-sm font-black text-amber-300">{index + 1}</span>
                <p className="mt-4 text-sm font-black leading-6 text-navy">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Phase 1 destinations" title="Sikkim and Darjeeling, built for matched group travel." />
          <Link href="/destinations" className="inline-flex items-center gap-2 text-sm font-black text-green-700">
            View all destinations <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 6).map((destination) => (
            <DestinationCard key={destination.name} destination={destination} />
          ))}
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-shell">
          <SectionHeading eyebrow="Why choose us" title="Trust and compatibility are the product." copy="The platform is designed for better group chemistry, safer decisions, and stronger local execution." />
          <div className="mt-8">
            <TrustGrid />
          </div>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Group packages" title="Sample trips designed around traveler compatibility." />
          <Link href="/group-packages" className="inline-flex items-center gap-2 text-sm font-black text-green-700">
            Browse packages <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groupPackages.slice(0, 3).map((trip) => (
            <PackageCard key={trip.title} trip={trip} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="container-shell">
          <SectionHeading eyebrow="Traveler reviews" title="Sample feedback from matched group experiences." align="center" />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
            {testimonials.map((review) => (
              <article key={review.name} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <MessageCircle className="text-green-700" size={26} />
                <p className="mt-4 text-sm leading-6 text-slate-700">"{review.quote}"</p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <h3 className="font-black text-navy">{review.name}</h3>
                  <p className="text-sm text-slate-500">{review.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-12 text-white sm:py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow text-amber-300">For partners</p>
            <h2 className="mt-2 text-2xl font-black leading-tight sm:text-4xl">More verified customers for local travel businesses.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              We work with travel agencies, taxi owners, hotels, guides, and adventure operators. You handle the ground experience; we bring better-matched groups, digital reach, and clearer expectations before the trip begins.
            </p>
            <Link href="/partner-with-us" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-amber-400 px-6 py-3 text-sm font-black text-navy hover:bg-amber-300">
              Partner With Us
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Verified customers", "Better group matching", "More bookings", "Digital reach"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/10 p-5">
                <CheckCircle2 className="text-green-300" size={24} />
                <h3 className="mt-3 font-black">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-12 sm:py-16">
        <div className="rounded-lg bg-gradient-to-r from-green-700 to-navy p-6 text-white shadow-soft sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <ShieldCheck size={30} className="text-amber-300" />
              <h2 className="mt-4 text-2xl font-black sm:text-3xl">Find your tribe before the trip starts.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-200">
                Start with the compatibility quiz and see what kind of traveler group fits your energy, comfort, and travel goals.
              </p>
            </div>
            <Link href="/compatibility-quiz" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-amber-400 px-6 py-3 text-sm font-black text-navy hover:bg-amber-300">
              Take Compatibility Quiz
            </Link>
          </div>
        </div>
      </section>

      <FounderVision />

      <Footer />
    </main>
  );
}
