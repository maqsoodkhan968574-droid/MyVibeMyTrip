import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Clock3, Home, Landmark, Quote, ShieldCheck, Sparkles, TrendingUp, UserRoundCheck } from "lucide-react";
import { ConsultationForm } from "@/components/consultation/consultation-form";
import { FinanceTools } from "@/components/finance-tools";
import { Footer } from "@/components/footer";
import { PropertyCard } from "@/components/property-card";
import { SearchPanel } from "@/components/search-panel";
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
        <div className="container-shell relative grid min-h-[640px] items-center gap-10 py-12 sm:min-h-[720px] sm:py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-green-100">
              <Sparkles size={16} /> Verified homes across India
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-6xl lg:text-7xl">
              Rivanta Realty
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              Building Trust, Creating Homes. Buy, rent, or sell premium properties with deep search, trusted agents, and listing intelligence built for confident decisions.
            </p>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-2 text-xs sm:gap-3 sm:text-sm">
              {[
                ["18K+", "verified homes"],
                ["4.8/5", "buyer rating"],
                ["32", "active cities"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/15 bg-white/10 p-3 sm:p-4">
                  <strong className="block text-xl text-brand sm:text-2xl">{value}</strong>
                  <span className="text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <SearchPanel />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-5">
        <div className="container-shell grid gap-4 text-sm sm:grid-cols-3">
          {["Verified listings and real local experts", "Dedicated support from search to paperwork", "A clear, refundable consultation promise"].map((item) => <p key={item} className="flex items-center gap-2 font-bold text-slate-700"><CheckCircle2 size={18} className="shrink-0 text-green-600" /> {item}</p>)}
        </div>
      </section>

      <section id="consultation" className="bg-slate-50 py-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Executive desk</p>
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
            <p className="eyebrow">Featured</p>
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

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="container-shell">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Latest</p>
              <h2 className="mt-2 text-3xl font-black text-navy">Fresh listings this week</h2>
            </div>
            <Link href="/login" className="inline-flex min-h-11 items-center justify-center border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:border-green-500 hover:text-green-700">Set listing alerts</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {properties.slice(0, 2).map((property) => (
              <PropertyCard key={property.id} property={property} view="list" />
            ))}
          </div>
        </div>
      </section>

      <section id="updates" className="container-shell py-12 sm:py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">News and live updates</p>
            <h2 className="mt-2 text-3xl font-black text-navy">Stay close to the market</h2>
          </div>
          <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-bold text-green-700">Explore live listings <ArrowRight size={16} /></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Market watch", "Buyer demand is rising for ready-to-move premium homes in well-connected neighbourhoods.", "Updated today"],
            ["Seller insight", "A verified listing with professional photos and a clear price attracts more serious enquiries.", "Seller guide"],
            ["Local pulse", "Track new listings, price movement, and high-interest localities before your next property decision.", "Live intelligence"]
          ].map(([label, copy, meta]) => (
            <article key={label} className="border-l-4 border-green-500 bg-slate-50 p-6">
              <p className="text-sm font-bold text-green-700">{meta}</p>
              <h3 className="mt-3 text-xl font-black text-navy">{label}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="seller-services" className="bg-navy py-12 text-white sm:py-16">
        <div className="container-shell">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Seller services</p>
            <h2 className="mt-2 text-3xl font-black">A stronger route to the right buyer</h2>
            <p className="mt-4 leading-7 text-slate-300">Choose the service that matches how you sell. Every route is supported by verified enquiries and local market guidance.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              [Building2, "For developers", "Launch projects with qualified leads, inventory visibility, and market-ready campaigns.", "/seller-services/developers"],
              [UserRoundCheck, "For brokers", "Manage listings, strengthen your local reach, and respond to serious prospects faster.", "/seller-services/brokers"],
              [Home, "For owners", "List your home with expert support, pricing guidance, and a clear verification journey.", "/seller-services/owners"]
            ].map(([Icon, title, copy, href]) => {
              const ServiceIcon = Icon as typeof Building2;
              return (
                <article key={title as string} className="border border-white/15 bg-white/5 p-6">
                  <ServiceIcon className="text-brand" size={28} />
                  <h3 className="mt-5 text-xl font-black">{title as string}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{copy as string}</p>
                  <Link href={href as string} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">Add your details <ArrowRight size={16} /></Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="services" className="bg-slate-50 py-12 sm:py-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Services and tools</p>
            <h2 className="mt-2 text-3xl font-black text-navy">Plan your property move with clarity</h2>
            <div className="mt-7 grid gap-4">
              <article className="flex gap-4 border-b border-slate-200 pb-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center bg-green-100 text-green-700"><Landmark size={21} /></span>
                <div><h3 className="font-black text-navy">Home loan support</h3><p className="mt-1 text-sm leading-6 text-slate-600">Understand your affordability and begin your financing journey with confidence.</p></div>
              </article>
              <article className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center bg-navy text-brand"><Building2 size={21} /></span>
                <div><h3 className="font-black text-navy">Rivanta Realty assistance</h3><p className="mt-1 text-sm leading-6 text-slate-600">One team for property search, seller strategy, verified visits, and negotiations.</p></div>
              </article>
            </div>
          </div>
          <FinanceTools />
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

      <section className="bg-green-600 py-14 text-white">
        <div className="container-shell text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-100">Built in Bihar, for India</p>
          <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black leading-tight sm:text-4xl">Building trust, creating homes, and opening bigger possibilities for every property dream.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-green-50">Rivanta Realty is proudly developed by a young entrepreneur from Bihar, with a belief that honest guidance can move India forward.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
