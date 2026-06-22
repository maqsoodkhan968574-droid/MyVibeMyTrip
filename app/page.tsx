import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Quote, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { ConsultationForm } from "@/components/consultation/consultation-form";
import { Footer } from "@/components/footer";
import { PropertyCard } from "@/components/property-card";
import { SearchPanel } from "@/components/search-panel";
import { Button } from "@/components/ui/button";
import { agents, properties, reviews } from "@/lib/property-data";

export default function HomePage() {
  const featured = properties.filter((property) => property.featured);

  return (
    <main>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85"
            alt="Premium modern home"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/35" />
        </div>
        <div className="container-shell relative grid min-h-[720px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-green-100">
              <Sparkles size={16} /> Verified homes across India
            </span>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-normal sm:text-6xl lg:text-7xl">
              Rivanta Realty
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              Building Trust, Creating Homes. Buy, rent, or sell premium properties with deep search, trusted agents, and listing intelligence built for confident decisions.
            </p>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
              {[
                ["18K+", "verified homes"],
                ["4.8/5", "buyer rating"],
                ["32", "active cities"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/15 bg-white/10 p-4">
                  <strong className="block text-2xl text-brand">{value}</strong>
                  <span className="text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <SearchPanel />
        </div>
      </section>

      <section id="consultation" className="bg-slate-50 py-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Executive desk</p>
            <h2 className="mt-2 max-w-xl text-4xl font-black leading-tight text-navy">A one-to-one meeting for decisions that need to move quickly.</h2>
            <p className="mt-5 max-w-xl leading-7 text-slate-600">
              Whether you are buying your next home or selling a property, our senior executive gives you dedicated guidance, a clear action plan, and a faster route forward.
            </p>
            <div className="mt-7 grid gap-4">
              {[
                ["Personal strategy", "Discuss your budget, location, timeline, and property requirements privately."],
                ["Fast-track action", "Get the right next steps for a purchase, sale, shortlist, valuation, or listing."],
                ["Refund assurance", "The ₹1,100 consultation token is fully refundable if you are not satisfied with the meeting."]
              ].map(([title, copy]) => (
                <div key={title} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy text-brand"><Clock3 size={19} /></span>
                  <div>
                    <h3 className="font-black text-navy">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ConsultationForm />
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Featured</p>
            <h2 className="mt-2 text-3xl font-black text-navy">Handpicked premium homes</h2>
          </div>
          <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-bold text-green-700">
            Browse all listings <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-shell">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Latest</p>
              <h2 className="mt-2 text-3xl font-black text-navy">Fresh listings this week</h2>
            </div>
            <Button variant="secondary">Set alerts</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {properties.slice(0, 2).map((property) => (
              <PropertyCard key={property.id} property={property} view="list" />
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-12 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Agents</p>
          <h2 className="mt-2 text-3xl font-black text-navy">Trusted local experts</h2>
          <p className="mt-4 text-slate-600">
            Every featured agent is reviewed for market knowledge, response quality, and listing accuracy.
          </p>
          <div className="mt-6 grid gap-3">
            {["Verified inventory", "Visit scheduling", "Deal-stage lead tracking"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 size={18} className="text-green-600" /> {item}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {agents.map((agent) => (
            <article key={agent.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Image src={agent.image} alt={agent.name} width={96} height={96} className="h-20 w-20 rounded-lg object-cover" />
              <h3 className="mt-4 font-bold text-navy">{agent.name}</h3>
              <p className="text-sm text-slate-500">{agent.market}</p>
              <p className="mt-3 flex items-center gap-2 text-sm font-bold text-green-700">
                <TrendingUp size={16} /> {agent.deals} closed deals
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy py-16 text-white">
        <div className="container-shell">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Reviews</p>
              <h2 className="mt-2 text-3xl font-black">Customers who moved smarter</h2>
            </div>
            <ShieldCheck className="hidden text-brand sm:block" size={38} />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-lg border border-white/10 bg-white/10 p-6">
                <Quote className="text-brand" />
                <p className="mt-4 leading-7 text-slate-200">{review.quote}</p>
                <p className="mt-5 font-bold">{review.name}</p>
                <p className="text-sm text-slate-400">{review.city}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
