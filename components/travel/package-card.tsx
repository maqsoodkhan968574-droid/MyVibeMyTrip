import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, ShieldCheck, Tag } from "lucide-react";
import type { GroupPackage } from "@/types/travel";
import { packageSlug } from "@/utils/packages";

type PackageCardProps = {
  trip: GroupPackage;
};

export function PackageCard({ trip }: PackageCardProps) {
  const itineraryHref = `/group-packages/${trip.slug || packageSlug(trip.title)}`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[16/10]">
        <Image src={trip.image} alt={trip.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-black text-white">
          <ShieldCheck size={14} />
          {trip.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="text-sm font-black leading-snug text-navy sm:text-xl">{trip.title}</h3>
        <div className="mt-3 grid gap-2 text-xs text-slate-600 sm:mt-4 sm:gap-3 sm:text-sm">
          <span className="hidden gap-2 sm:flex"><MapPin size={17} className="shrink-0 text-green-700" /> {trip.destination}</span>
          <span className="flex gap-1.5 sm:gap-2"><CalendarDays size={15} className="shrink-0 text-green-700 sm:size-[17px]" /> {trip.duration}</span>
          <span className="flex gap-1.5 sm:gap-2"><Tag size={15} className="shrink-0 text-green-700 sm:size-[17px]" /> {trip.category}</span>
        </div>
        <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-5">
          <strong className="text-xs leading-5 text-navy sm:text-sm">{trip.price}</strong>
          <Link
            href={itineraryHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg bg-navy px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 sm:min-h-10 sm:gap-2 sm:px-4 sm:text-sm"
          >
            Itinerary <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
