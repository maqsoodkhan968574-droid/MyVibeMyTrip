import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Ruler, ShieldCheck, Star } from "lucide-react";
import type { Property } from "@/lib/property-data";
import { cn, formatCurrency } from "@/lib/utils";

export function PropertyCard({ property, view = "grid" }: { property: Property; view?: "grid" | "list" }) {
  const isList = view === "list";
  return (
    <article className={cn("overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft", isList && "grid md:grid-cols-[320px_1fr]")}>
      <Link href={`/properties/${property.slug}`} className="relative block aspect-[4/3] min-h-64 overflow-hidden bg-slate-100">
        <Image src={property.image} alt={property.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute left-3 top-3 flex gap-2">
          {property.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-green-700 shadow">
              <ShieldCheck size={14} /> Verified
            </span>
          )}
          <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{property.status}</span>
        </div>
      </Link>
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <Link href={`/properties/${property.slug}`} className="text-lg font-bold text-navy hover:text-green-700">
              {property.title}
            </Link>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MapPin size={15} /> {property.locality}, {property.city}
            </p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700">
            <Star size={13} fill="currentColor" /> {property.rating}
          </span>
        </div>
        <p className="text-2xl font-extrabold text-navy">
          {formatCurrency(property.price)}
          {property.status === "Rent" && <span className="text-sm font-semibold text-slate-500">/mo</span>}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-slate-600">
          <span className="flex items-center gap-1"><BedDouble size={16} /> {property.bedrooms} Beds</span>
          <span className="flex items-center gap-1"><Bath size={16} /> {property.bathrooms} Baths</span>
          <span className="flex items-center gap-1"><Ruler size={16} /> {property.area} sqft</span>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">{property.description}</p>
      </div>
    </article>
  );
}
