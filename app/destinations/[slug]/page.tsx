import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Camera, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { destinations } from "@/data/travel";
import { destinationSlug, getDestinationBySlug } from "@/utils/destinations";

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
          <div className="mt-8 max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-amber-200">
              <MapPin size={15} />
              {destination.region}
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">{destination.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">{destination.detailIntro}</p>
          </div>
        </div>
      </section>

      <section className="container-shell py-10 sm:py-14">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <p className="eyebrow">Place details</p>
            <h2 className="mt-2 text-2xl font-black text-navy sm:text-3xl">Why this destination fits vibe-matched travel</h2>
            <p className="mt-4 leading-7 text-slate-700">{destination.description}</p>
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
