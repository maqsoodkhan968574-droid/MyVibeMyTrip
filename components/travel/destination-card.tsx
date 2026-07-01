import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import type { Destination } from "@/types/travel";
import { destinationSlug } from "@/utils/destinations";
import { getPackagesForDestination } from "@/utils/packages";

type DestinationCardProps = {
  destination: Destination;
};

export function DestinationCard({ destination }: DestinationCardProps) {
  const detailsHref = `/destinations/${destinationSlug(destination.name)}`;
  const relatedPackage = getPackagesForDestination(destination.name, destination.region)[0];
  const bookingHref = relatedPackage ? `/group-packages/${relatedPackage.slug}` : "/group-packages";

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3]">
        <Image src={destination.image} alt={destination.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-black text-navy shadow-sm sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
          <MapPin size={13} />
          {destination.region}
        </div>
      </div>
      <div className="p-3 sm:p-5">
        <h3 className="text-base font-black leading-tight text-navy sm:text-xl">{destination.name}</h3>
        <p className="mt-2 hidden text-sm leading-6 text-slate-600 sm:block">{destination.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
          {destination.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700 sm:px-3 sm:text-xs">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link
            href={detailsHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-black text-navy transition hover:border-green-700 hover:text-green-800 sm:min-h-11 sm:text-sm"
          >
            Details <ArrowUpRight size={15} />
          </Link>
          <Link
            href={bookingHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-navy px-3 py-2 text-xs font-black text-white transition hover:bg-green-800 sm:min-h-11 sm:text-sm"
          >
            Book now <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
