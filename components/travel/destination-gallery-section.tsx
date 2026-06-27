import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, ImagePlus } from "lucide-react";
import type { Destination } from "@/types/travel";
import { destinationSlug } from "@/utils/destinations";

type DestinationGallerySectionProps = {
  destinations: Destination[];
};

export function DestinationGallerySection({ destinations }: DestinationGallerySectionProps) {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Destination galleries</p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-navy sm:text-4xl">
            Scenic photo previews for every Phase 1 destination.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-lg sm:leading-7">
            Clear mountain, lake, tea garden, snow route, and town views help travelers feel the experience before they book.
          </p>
        </div>

        <div className="mt-8 grid gap-5">
          {destinations.map((destination) => (
            <article key={destination.name} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-black text-navy">{destination.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{destination.region} scenic gallery</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-700">
                    <Camera size={14} />
                    {destination.gallerySlots} photos
                  </span>
                  <Link
                    href={`/destinations/${destinationSlug(destination.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-navy px-3 py-2 text-xs font-black text-white transition hover:bg-green-800"
                  >
                    All details <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
                {Array.from({ length: destination.gallerySlots }).map((_, index) => {
                  const imageSrc = destination.galleryImages?.[index];

                  if (imageSrc) {
                    return (
                      <div
                        key={`${destination.name}-${index}`}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                      >
                        <Image
                          src={imageSrc}
                          alt={`${destination.name} photo ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, 20vw"
                          className="object-cover"
                        />
                        <span className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">
                          Photo {index + 1}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={`${destination.name}-${index}`}
                      className="grid aspect-[4/3] place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-center text-slate-500"
                    >
                      <div>
                        <ImagePlus className="mx-auto text-slate-400" size={20} />
                        <p className="mt-1 text-[11px] font-black uppercase tracking-[0.12em]">Photo {index + 1}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
