import { CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/travel/page-hero";
import { SectionHeading } from "@/components/travel/section-heading";
import { TrustGrid } from "@/components/travel/trust-grid";
import { howItWorks } from "@/data/travel";

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        eyebrow="How it works"
        title="From travel profile to compatible group in five steps."
        copy="The platform converts personal travel preferences into better group chemistry before anyone enters the taxi, hotel, or itinerary."
        image="/destinations/tiger-hill-cover.png"
        imageAlt="Travelers watching a mountain sunrise"
      />
      <section className="container-shell py-16">
        <div className="grid gap-5 md:grid-cols-5">
          {howItWorks.map((step, index) => (
            <article key={step} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-green-50 text-lg font-black text-green-700">{index + 1}</span>
              <h2 className="mt-5 text-lg font-black text-navy">{step}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {index === 0 && "Share who you are, where you want to go, and what kind of travel experience feels right."}
                {index === 1 && "Answer practical questions about pace, food, music, budget, privacy, and safety needs."}
                {index === 2 && "Receive a compatibility-based group suggestion with travelers who share similar expectations."}
                {index === 3 && "Choose a verified group package powered by trusted local partners."}
                {index === 4 && "Meet your group before departure and travel with clearer expectations."}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="container-shell">
          <SectionHeading eyebrow="What we match" title="The small preferences that make or break a group trip." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Age group", "Travel energy", "Budget", "Food preference", "Music taste", "Wake-up style", "Adventure level", "Language preference"].map((item) => (
              <p key={item} className="flex items-center gap-2 rounded-lg bg-white p-4 text-sm font-bold text-navy shadow-sm">
                <CheckCircle2 size={18} className="text-green-700" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="container-shell py-16">
        <SectionHeading eyebrow="Trust layer" title="Built for safer, more predictable group travel." />
        <div className="mt-8">
          <TrustGrid />
        </div>
      </section>
      <Footer />
    </main>
  );
}
