import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Bath, BedDouble, CalendarDays, Check, MapPin, MessageCircle, Ruler, Share2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { formatCurrency } from "@/lib/utils";
import { properties } from "@/lib/property-data";
import { PropertyActions } from "@/components/property-actions";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);
  if (!property) return {};
  return {
    title: property.title,
    description: property.description,
    openGraph: {
      title: `${property.title} in ${property.locality}`,
      description: property.description,
      images: [property.image]
    }
  };
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);
  if (!property) notFound();
  const whatsapp = `https://wa.me/${property.agent.phone}?text=${encodeURIComponent(`I am interested in ${property.title} on Rivanta Realty`)}`;
  const share = `mailto:?subject=${encodeURIComponent(property.title)}&body=${encodeURIComponent(`View ${property.title} on Rivanta Realty: ${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/properties/${property.slug}`)}`;

  return (
    <main>
      <section className="container-shell py-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">{property.status} / {property.type}</p>
            <h1 className="mt-2 text-4xl font-black text-navy">{property.title}</h1>
            <p className="mt-2 flex items-center gap-2 text-slate-600"><MapPin size={18} /> {property.locality}, {property.city}</p>
          </div>
          <a href={share} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-navy"><Share2 size={17} /> Share</a>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-slate-100">
            <Image src={property.gallery[0]} alt={property.title} fill priority className="object-cover" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {property.gallery.slice(1).map((image) => (
              <div key={image} className="relative min-h-48 overflow-hidden rounded-lg bg-slate-100">
                <Image src={image} alt={property.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <article>
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex flex-wrap gap-2"><span className="inline-flex items-center gap-1 bg-green-50 px-3 py-1 text-xs font-black text-green-700"><BadgeCheck size={14} /> Verified Property</span><span className="bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">Documents checked</span><span className="bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">Last verified: 18 Jun 2026</span></div>
              <p className="text-3xl font-black text-navy">
                {formatCurrency(property.price)}
                {property.status === "Rent" && <span className="text-base text-slate-500">/mo</span>}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                <span className="flex items-center gap-2 font-semibold"><BedDouble className="text-green-600" /> {property.bedrooms} Beds</span>
                <span className="flex items-center gap-2 font-semibold"><Bath className="text-green-600" /> {property.bathrooms} Baths</span>
                <span className="flex items-center gap-2 font-semibold"><Ruler className="text-green-600" /> {property.area} sqft</span>
                <span className="font-semibold">{property.furnished}</span>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="text-2xl font-black text-navy">Description</h2>
              <p className="mt-3 max-w-3xl leading-8 text-slate-600">{property.description}</p>
            </section>

            <section className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="border border-slate-200 bg-white p-5"><h2 className="text-xl font-black text-navy">Property facts</h2><div className="mt-4 grid gap-3 text-sm text-slate-600"><p><strong className="text-navy">RERA number:</strong> BRERAP00000-1/123/2026</p><p><strong className="text-navy">Plot dimensions:</strong> 40 ft x 67 ft</p><p><strong className="text-navy">Main road:</strong> 450 m away</p><p><strong className="text-navy">Loan eligibility:</strong> Available from partner banks</p></div></div>
              <div className="border border-slate-200 bg-white p-5"><h2 className="text-xl font-black text-navy">Neighbourhood</h2><div className="mt-4 grid gap-3 text-sm text-slate-600"><p><strong className="text-navy">Schools:</strong> 1.2 km</p><p><strong className="text-navy">Hospitals:</strong> 2.1 km</p><p><strong className="text-navy">Markets:</strong> 800 m</p><p><strong className="text-navy">Video tour:</strong> Available on request</p></div></div>
            </section>
            <section className="mt-8 grid gap-4 sm:grid-cols-2"><div className="border border-green-200 bg-green-50 p-5"><h2 className="font-black text-navy">Registry cost calculator</h2><p className="mt-2 text-sm text-slate-600">Estimate registration charges before you buy.</p></div><div className="border border-green-200 bg-green-50 p-5"><h2 className="font-black text-navy">Stamp duty calculator</h2><p className="mt-2 text-sm text-slate-600">Calculate an indicative Bihar stamp duty amount.</p></div></section>

            <section className="mt-8">
              <h2 className="text-2xl font-black text-navy">Amenities</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <span key={amenity} className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm font-semibold">
                    <Check size={18} className="text-green-600" /> {amenity}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-black text-navy">Location</h2>
              <div className="mt-4 h-72 overflow-hidden border border-slate-200 bg-slate-100"><iframe title={`Map for ${property.title}`} src={`https://www.google.com/maps?q=${encodeURIComponent(`${property.locality}, ${property.city}`)}&output=embed`} className="h-full w-full border-0" loading="lazy" /></div>
            </section>
          </article>

          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-4">
              <Image src={property.agent.avatar} alt={property.agent.name} width={72} height={72} className="h-16 w-16 rounded-lg object-cover" />
              <div>
                <h2 className="font-black text-navy">{property.agent.name}</h2>
                <p className="text-sm text-slate-500">{property.agent.role}</p>
                <Link href={`/dealers/${property.agent.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-green-700"><BadgeCheck size={14} /> Verified dealer</Link>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-navy hover:bg-green-400">
                <MessageCircle size={18} /> WhatsApp agent
              </a>
              <Link href="/#consultation" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy"><CalendarDays size={18} /> Schedule visit</Link>
              <PropertyActions propertyId={property.id} />
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
