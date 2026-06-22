import type { Metadata } from "next";
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
  searchParams: Promise<{ status?: string; view?: string; city?: string; type?: string }>;
}) {
  const params = await searchParams;
  const view = params.view === "list" ? "list" : "grid";
  const filtered = properties.filter((property) => {
    if (params.status && params.status !== "Sell" && property.status !== params.status) return false;
    if (params.city && !property.city.toLowerCase().includes(params.city.toLowerCase())) return false;
    if (params.type && params.type !== "Property type" && property.type !== params.type) return false;
    return true;
  });

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
              <Button variant={view === "grid" ? "primary" : "secondary"} className="gap-2"><LayoutGrid size={17} /> Grid</Button>
              <Button variant={view === "list" ? "primary" : "secondary"} className="gap-2"><List size={17} /> List</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 font-bold text-navy"><SlidersHorizontal size={18} /> Advanced filters</h2>
          <form className="mt-5 grid gap-4">
            {[
              ["Property type", ["Apartment", "Villa", "Studio", "Penthouse", "Plot"]],
              ["Bedrooms", ["1+", "2+", "3+", "4+", "5+"]],
              ["Bathrooms", ["1+", "2+", "3+", "4+"]],
              ["Furnishing", ["Furnished", "Semi-furnished", "Unfurnished"]]
            ].map(([label, options]) => (
              <label key={label as string} className="grid gap-2 text-sm font-semibold text-slate-700">
                {label as string}
                <select className="rounded-lg border border-slate-200 px-3 py-2 font-normal outline-none focus:border-brand">
                  <option>Any</option>
                  {(options as string[]).map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            ))}
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Price range
              <input type="range" min="0" max="50000000" className="accent-brand" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Area size
              <input placeholder="Min sqft" className="rounded-lg border border-slate-200 px-3 py-2 font-normal outline-none focus:border-brand" />
            </label>
            <Button type="button">Apply filters</Button>
          </form>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-600">{filtered.length} homes found</p>
            <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
              <option>Newest first</option>
              <option>Price low to high</option>
              <option>Price high to low</option>
            </select>
          </div>
          <div className={view === "list" ? "grid gap-6" : "grid gap-6 md:grid-cols-2 xl:grid-cols-3"}>
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} view={view} />
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-2">
            {[1, 2, 3].map((page) => (
              <button key={page} className={`h-10 w-10 rounded-lg border text-sm font-bold ${page === 1 ? "border-brand bg-brand text-navy" : "border-slate-200 bg-white text-slate-600"}`}>
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
