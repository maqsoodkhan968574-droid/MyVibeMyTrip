import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Camera, CheckCircle2, CloudSun, IndianRupee, MapPin, Route, ShieldCheck, Sparkles, Tag, Wifi } from "lucide-react";
import { Footer } from "@/components/footer";
import { destinations } from "@/data/travel";
import { destinationSlug, getDestinationBySlug } from "@/utils/destinations";
import { getPackagesForDestination } from "@/utils/packages";

type DestinationDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destinationSlug(destination.name)
  }));
}

export async function generateMetadata({ params }: DestinationDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return {
      title: "Destination not found | MyVibeMyTrip.com"
    };
  }

  return {
    title: `${destination.name} Travel Details | MyVibeMyTrip.com`,
    description: destination.detailIntro
  };
}

export default async function DestinationDetailsPage({ params }: DestinationDetailsPageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const galleryImages = destination.galleryImages ?? [];
  const relatedPackages = getPackagesForDestination(destination.name, destination.region);
  const isHighAltitude = destination.tags.some((tag) => ["Snow", "High altitude", "Adventure", "Long drive"].includes(tag));
  const isDarjeeling = destination.region === "Darjeeling";
  const quickFacts = [
    { label: "Best season", value: isHighAltitude ? "Mar-Jun, Oct-Dec" : isDarjeeling ? "Mar-May, Oct-Nov" : "Mar-Jun, Sep-Dec", icon: CloudSun },
    { label: "Trip style", value: destination.bestFor[0] ?? "Matched groups", icon: Sparkles },
    { label: "Difficulty", value: isHighAltitude ? "Moderate to high" : "Easy to moderate", icon: Route },
    { label: "Budget range", value: isHighAltitude ? "INR 18k-32k" : "INR 12k-26k", icon: IndianRupee },
    { label: "Safety note", value: isHighAltitude ? "Permit and weather based" : "Verified local partners", icon: ShieldCheck },
    { label: "Network", value: isHighAltitude ? "Limited on route" : "Good in town areas", icon: Wifi }
  ];
  const vibeScores = [
    { label: "Photography", value: destination.tags.includes("Photos") || destination.bestFor.join(" ").includes("Photo") ? 95 : 88 },
    { label: "Adventure", value: isHighAltitude ? 94 : destination.tags.includes("Calm") || destination.tags.includes("Relaxed") ? 62 : 78 },
    { label: "Family", value: destination.bestFor.includes("Families") ? 92 : 70 },
    { label: "Couples", value: destination.bestFor.includes("Couples") ? 91 : 74 }
  ];

  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <Image src={destination.image} alt={destination.name} fill priority sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/86 to-green-950/45" />
        </div>

        <div className="container-shell relative py-14 sm:py-20">
          <Link href="/destinations" className="inline-flex items-center gap-2 text-sm font-black text-green-100 transition hover:text-amber-300">
            <ArrowLeft size={17} />
            Back to destinations
          </Link>
          <div className="page-hero-copy mt-8 max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-amber-200">
              <MapPin size={15} />
              {destination.region}
            </span>
            <h1 className="page-hero-title mt-5 text-4xl font-black leading-tight sm:text-6xl">{destination.name}</h1>
            <p className="page-hero-subtitle mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">{destination.detailIntro}</p>
          </div>
        </div>
      </section>

      <section className="container-shell -mt-6 relative z-10">
        <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 sm:grid-cols-2 lg:grid-cols-6">
          {quickFacts.map((fact) => (
            <article key={fact.label} className="rounded-lg bg-slate-50 p-4">
              <fact.icon className="text-green-700" size={19} />
              <p className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">{fact.label}</p>
              <p className="mt-1 text-sm font-black leading-5 text-navy">{fact.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell py-10 sm:py-14">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <p className="eyebrow">Place details</p>
            <h2 className="mt-2 text-2xl font-black text-navy sm:text-3xl">Why this destination fits vibe-matched travel</h2>
            <p className="mt-4 leading-7 text-slate-700">{destination.description}</p>
            <div className="mt-5 rounded-lg border border-green-100 bg-green-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-green-800">AI trip fit summary</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                Best for {destination.bestFor.slice(0, 3).join(", ").toLowerCase()}. Avoid this plan if your group wants a completely different pace, privacy level, or wake-up routine.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {destination.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-800">
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <p className="eyebrow">Best matched for</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {destination.bestFor.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700">
                  <Sparkles className="mt-0.5 shrink-0 text-amber-500" size={16} />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {vibeScores.map((score) => (
                <div key={score.label}>
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                    <span>{score.label}</span>
                    <span>{score.value}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-green-700 to-amber-400" style={{ width: `${score.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-xl font-black text-navy sm:text-2xl">Top highlights</h2>
            <div className="mt-4 grid gap-3">
              {destination.highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3 rounded-lg border border-slate-100 p-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-green-700" size={18} />
                  <p className="text-sm font-semibold leading-6 text-slate-700">{highlight}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-xl font-black text-navy sm:text-2xl">Travel matching tips</h2>
            <div className="mt-4 grid gap-3">
              {destination.travelTips.map((tip) => (
                <div key={tip} className="rounded-lg bg-amber-50 p-3 text-sm font-semibold leading-6 text-slate-800">
                  {tip}
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-xl font-black text-navy">Best time to go</h2>
            <div className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-slate-700">
              <p><span className="font-black text-green-800">Peak:</span> March to June for clear hill weather and easy sightseeing.</p>
              <p><span className="font-black text-amber-700">Scenic:</span> October to December for crisp views and stronger mountain light.</p>
              <p><span className="font-black text-slate-900">Plan smart:</span> Monsoon routes can be beautiful but slower, so match patient travelers together.</p>
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-xl font-black text-navy">Local experience picks</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Photo stops", "Cafe break", "Local food", "Viewpoint time", "Slow evening"].map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-700">{item}</span>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-xl font-black text-navy">Before you book</h2>
            <div className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-slate-700">
              <p>Confirm permits, road condition, hotel category, pickup point, and group age mix before final payment.</p>
              <Link href="/compatibility-quiz" className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-navy px-4 py-2 text-sm font-black text-white transition hover:bg-green-800">
                Check my vibe match
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="container-shell">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Book this place</p>
              <h2 className="mt-2 text-2xl font-black text-navy sm:text-4xl">Packages matched for {destination.name}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Exact destination packages appear first, followed by nearby {destination.region} routes that fit the same travel region.
              </p>
            </div>
            <Link href="/group-packages" className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-black text-navy transition hover:border-green-700 hover:text-green-800">
              View all packages
            </Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {relatedPackages.slice(0, 3).map((trip) => (
              <article key={trip.slug} className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-green-800">
                  {trip.badge}
                </span>
                <h3 className="mt-4 text-lg font-black leading-snug text-navy">{trip.title}</h3>
                <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600">
                  <span className="flex gap-2"><MapPin size={16} className="shrink-0 text-green-700" /> {trip.destination}</span>
                  <span className="flex gap-2"><CalendarDays size={16} className="shrink-0 text-green-700" /> {trip.duration}</span>
                  <span className="flex gap-2"><Tag size={16} className="shrink-0 text-green-700" /> {trip.category}</span>
                </div>
                <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <strong className="text-sm text-navy">{trip.price}</strong>
                  <Link
                    href={`/group-packages/${trip.slug}`}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-black text-white transition hover:bg-green-800"
                  >
                    Book now <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="container-shell">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Photo gallery</p>
              <h2 className="mt-2 text-2xl font-black text-navy sm:text-4xl">{destination.name} scenery</h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-700">
              <Camera size={14} />
              {galleryImages.length || destination.gallerySlots} photos
            </span>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: destination.gallerySlots }).map((_, index) => {
              const imageSrc = galleryImages[index];

              return (
                <div key={`${destination.name}-detail-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 shadow-sm">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={`${destination.name} scenery ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-xs font-black uppercase tracking-[0.12em] text-slate-400">Photo {index + 1}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
