import type { Metadata } from "next";
import Link from "next/link";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { Footer } from "@/components/footer";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/property-data";

export const metadata: Metadata = {
  title: "Property Listings",
  description: "Search premium verified homes with filters for type, price, bedrooms, bathrooms, area, and furnishing."
};

export default async function PropertiesPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string; view?: string; city?: string; locality?: string; type?: string; bedrooms?: string; bathrooms?: string; furnished?: string; minArea?: string; maxPrice?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const view = params.view === "list" ? "list" : "grid";
  const filtered = properties.filter((property) => {
    if (params.status && params.status !== "Sell" && property.status !== params.status) return false;
    if (params.city && !property.city.toLowerCase().includes(params.city.toLowerCase())) return false;
    if (params.locality && !property.locality.toLowerCase().includes(params.locality.toLowerCase())) return false;
    if (params.type && params.type !== "Property type" && property.type !== params.type) return false;
    if (params.bedrooms && Number.parseInt(params.bedrooms) > property.bedrooms) return false;
    if (params.bathrooms && Number.parseInt(params.bathrooms) > property.bathrooms) return false;
    if (params.furnished && property.furnished !== params.furnished) return false;
    if (params.minArea && Number(params.minArea) > property.area) return false;
    if (params.maxPrice && Number(params.maxPrice) < property.price) return false;
    return true;
  }).sort((a, b) => params.sort === "price-asc" ? a.price - b.price : params.sort === "price-desc" ? b.price - a.price : 0);

  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="container-shell py-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Listings</p>
          <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-black text-navy">Find your next property</h1>
              <p className="mt-3 text-slate-600">Verified listings with rich filters, map context, and direct agent enquiries.</p>
            </div>
            <div className="flex gap-2">
              <Link href="/properties?view=grid" className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold ${view === "grid" ? "bg-brand text-navy" : "border border-slate-200 bg-white text-navy"}`}><LayoutGrid size={17} /> Grid</Link>
              <Link href="/properties?view=list" className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold ${view === "list" ? "bg-brand text-navy" : "border border-slate-200 bg-white text-navy"}`}><List size={17} /> List</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <details className="group" open>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-bold text-navy"><span className="flex items-center gap-2"><SlidersHorizontal size={18} /> Advanced filters</span><span className="text-sm text-green-700 group-open:hidden">Show</span><span className="hidden text-sm text-green-700 group-open:block">Hide</span></summary>
          <form className="mt-5 grid gap-4">
            {[
              ["type", "Property type", ["Apartment", "Villa", "Studio", "Penthouse", "Plot"]],
              ["bedrooms", "Bedrooms", ["1", "2", "3", "4", "5"]],
              ["bathrooms", "Bathrooms", ["1", "2", "3", "4"]],
              ["furnished", "Furnishing", ["Furnished", "Semi-furnished", "Unfurnished"]]
            ].map(([name, label, options]) => (
              <label key={label as string} className="grid gap-2 text-sm font-semibold text-slate-700">
                {label as string}
                <select name={name as string} defaultValue={(params as Record<string, string | undefined>)[name as string] ?? ""} className="rounded-lg border border-slate-200 px-3 py-2 font-normal outline-none focus:border-brand">
                  <option value="">Any</option>
                  {(options as string[]).map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            ))}
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Price range
              <input name="maxPrice" defaultValue={params.maxPrice ?? "50000000"} type="range" min="0" max="50000000" step="100000" className="accent-brand" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Area size
              <input name="minArea" defaultValue={params.minArea} placeholder="Min sqft" className="rounded-lg border border-slate-200 px-3 py-2 font-normal outline-none focus:border-brand" />
            </label>
            <Button type="submit">Apply filters</Button>
          </form>
          </details>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-600">{filtered.length} homes found</p>
            <form className="flex gap-1"><select name="sort" defaultValue={params.sort} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"><option value="">Newest first</option><option value="price-asc">Price low to high</option><option value="price-desc">Price high to low</option></select><Button type="submit">Sort</Button></form>
          </div>
          <div className={view === "list" ? "grid gap-6" : "grid gap-6 md:grid-cols-2 xl:grid-cols-3"}>
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} view={view} />
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-2">
            {[1, 2, 3].map((page) => (
              <Link href={`/properties?page=${page}`} key={page} className={`grid h-10 w-10 place-items-center rounded-lg border text-sm font-bold ${page === 1 ? "border-brand bg-brand text-navy" : "border-slate-200 bg-white text-slate-600"}`}>
                {page}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
