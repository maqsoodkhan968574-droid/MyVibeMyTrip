import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, IndianRupee, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Footer } from "@/components/footer";
import { PackagePaymentButton } from "@/components/travel/package-payment-button";
import { TripTools } from "@/components/travel/trip-tools";
import { groupPackages } from "@/data/travel";
import { getPackageBySlug } from "@/utils/packages";

type PackageDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return groupPackages.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: PackageDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = getPackageBySlug(slug);

  if (!trip) {
    return {
      title: "Package not found | MyVibeMyTrip.com"
    };
  }

  return {
    title: `${trip.title} Itinerary | MyVibeMyTrip.com`,
    description: trip.overview
  };
}

export default async function PackageDetailsPage({ params }: PackageDetailsPageProps) {
  const { slug } = await params;
  const trip = getPackageBySlug(slug);

  if (!trip) {
    notFound();
  }

  const exclusions = ["Flights or train tickets", "Personal shopping and cafe bills", "Entry tickets unless confirmed", "Anything not listed in inclusions"];
  const tripFit = [
    { label: "Group vibe", value: trip.category, icon: Users },
    { label: "Daily pace", value: trip.duration.includes("7") ? "Premium relaxed" : trip.category.includes("Adventure") || trip.category.includes("Gen Z") ? "High energy" : "Balanced", icon: Clock },
    { label: "Token", value: "INR 1,100", icon: IndianRupee }
  ];

  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <Image src={trip.image} alt={trip.title} fill priority sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-green-950/45" />
        </div>

        <div className="container-shell relative py-14 sm:py-20">
          <Link href="/group-packages" className="inline-flex items-center gap-2 text-sm font-black text-green-100 transition hover:text-amber-300">
            <ArrowLeft size={17} />
            Back to packages
          </Link>

          <div className="mt-8 max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-amber-200">
              <ShieldCheck size={15} />
              {trip.badge}
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">{trip.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">{trip.overview}</p>
          </div>
        </div>
      </section>

      <section className="container-shell py-10 sm:py-14">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Destination", value: trip.destination, icon: MapPin },
            { label: "Duration", value: trip.duration, icon: CalendarDays },
            { label: "Category", value: trip.category, icon: Sparkles },
            { label: "Price", value: trip.price, icon: CheckCircle2 }
          ].map((item) => (
            <article key={item.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <item.icon className="text-green-700" size={22} />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
              <h2 className="mt-1 text-sm font-black leading-6 text-navy">{item.value}</h2>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {tripFit.map((item) => (
            <article key={item.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <item.icon className="text-green-700" size={21} />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
              <p className="mt-1 text-sm font-black leading-6 text-navy">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Day-wise plan</p>
                <h2 className="mt-2 text-2xl font-black text-navy sm:text-4xl">{trip.duration} itinerary</h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {trip.itinerary.map((day) => (
                <article key={day.day} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-700">
                        Day {day.day}
                      </span>
                      <h3 className="mt-3 text-xl font-black text-navy">{day.title}</h3>
                      <p className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-500"><MapPin size={15} /> {day.location}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3 text-xs font-bold text-slate-600">
                      <p>Stay: {day.stay}</p>
                      <p className="mt-1">Meals: {day.meals}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2 rounded-lg bg-slate-50 p-3 text-xs font-bold leading-5 text-slate-600 sm:grid-cols-3">
                    <p>Start: Morning plan</p>
                    <p>Best for: {trip.category}</p>
                    <p>Group matched plan</p>
                  </div>
                  <div className="mt-4 grid gap-2">
                    {day.activities.map((activity) => (
                      <div key={activity} className="flex gap-2 rounded-lg border border-slate-100 p-3 text-sm font-semibold leading-6 text-slate-700">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-green-700" size={17} />
                        {activity}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="grid h-fit gap-4">
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-navy">Included in this package</h2>
              <div className="mt-4 grid gap-3">
                {trip.inclusions.map((item) => (
                  <div key={item} className="flex gap-2 text-sm font-semibold leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-green-700" size={17} />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-slate-100 pt-5">
                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">Not included</h3>
                <div className="mt-3 grid gap-2">
                  {exclusions.map((item) => (
                    <p key={item} className="text-sm font-semibold leading-6 text-slate-600">{item}</p>
                  ))}
                </div>
              </div>
              <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Secure booking token</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                  Pay INR 1,100 through Razorpay to reserve your matching request. Final package confirmation happens after vibe and group availability checks.
                </p>
              </div>
              <PackagePaymentButton className="mt-4" packageSlug={trip.slug} packageTitle={trip.title} />
              <Link href="/compatibility-quiz" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-amber-400 px-5 py-3 text-sm font-black text-navy transition hover:bg-amber-300">
                Check My Compatibility
              </Link>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-navy">Traveler tools</h2>
              <div className="mt-4">
                <TripTools title={trip.title} slug={trip.slug} />
              </div>
              <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">Save this trip on this device or share the itinerary link before booking.</p>
            </article>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
