import { BadgeCheck, Megaphone, TrendingUp, UsersRound } from "lucide-react";
import { Footer } from "@/components/footer";
import { LeadForm } from "@/components/travel/lead-form";
import { PageHero } from "@/components/travel/page-hero";

export default function PartnerWithUsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partner with us"
        title="We are not competing with travel agencies. We make group travel easier to sell."
        copy="Local partners get verified customers, better group matching, more bookings, and digital reach while continuing to operate the ground experience."
        image="/destinations/tea-gardens-cover.png"
        imageAlt="Local travel partners in hill destinations"
      />
      <section className="container-shell grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="grid gap-4">
            {[
              ["Verified customers", "Travelers arrive with clearer budgets, expectations, and intent.", BadgeCheck],
              ["Better group matching", "Reduce conflict inside shared taxis and fixed departures.", UsersRound],
              ["More bookings", "Turn solo travelers and small parties into compatible group demand.", TrendingUp],
              ["Digital reach", "Show packages to travelers searching for modern, safer group options.", Megaphone]
            ].map(([title, copy, Icon]) => (
              <article key={title as string} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Icon className="text-green-700" size={24} />
                <h2 className="mt-3 text-xl font-black text-navy">{title as string}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy as string}</p>
              </article>
            ))}
          </div>
        </div>
        <LeadForm type="partner" />
      </section>
      <Footer />
    </main>
  );
}
