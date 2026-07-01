import { HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/travel/page-hero";
import { SectionHeading } from "@/components/travel/section-heading";

export default function AboutUsPage() {
  return (
    <main>
      <PageHero
        eyebrow="About us"
        title="A travel startup built around group chemistry."
        copy="MyVibeMyTrip.com exists because shared travel should feel social, safe, and enjoyable, not like a random compromise."
        image="/hero/myvibemytrip-home-hero.png"
        imageAlt="MyVibeMyTrip mountain travel vision"
      />
      <section className="container-shell py-16">
        <SectionHeading
          title="Our belief is simple: the right people can make the same destination feel completely different."
          copy="Phase 1 focuses on Sikkim and Darjeeling because these trips often involve shared taxis, changing weather, early starts, and mixed expectations. Compatibility turns those variables into a better experience."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["Compatibility first", "We match travelers by vibe, personality, and travel style before the trip starts.", Sparkles],
            ["Safety and trust", "Verified travelers, women-only preferences, and partner checks help create better groups.", ShieldCheck],
            ["Local-first growth", "We work with agencies, drivers, hotels, and guides instead of replacing them.", HeartHandshake]
          ].map(([title, copy, Icon]) => (
            <article key={title as string} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <Icon className="text-green-700" size={28} />
              <h2 className="mt-4 text-xl font-black text-navy">{title as string}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{copy as string}</p>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
