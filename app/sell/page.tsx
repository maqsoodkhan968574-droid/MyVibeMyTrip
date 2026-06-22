import { Camera, ClipboardCheck, Home, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SellPage() {
  return (
    <main className="bg-slate-50 py-10">
      <section className="container-shell">
        <div className="rounded-lg bg-navy p-8 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Sell Property</p>
          <h1 className="mt-2 text-4xl font-black">List, verify, and close with better leads</h1>
          <p className="mt-4 max-w-2xl text-slate-300">Upload images, add property details, and move through a transparent verification workflow before publishing.</p>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-2xl font-black text-navy"><Home className="text-green-600" /> Property details</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {["Title", "City", "Locality", "Price", "Bedrooms", "Bathrooms", "Area size"].map((field) => (
                <label key={field} className="grid gap-2 text-sm font-semibold text-slate-700">
                  {field}
                  <input className="rounded-lg border border-slate-200 px-3 py-3 outline-none focus:border-brand" />
                </label>
              ))}
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Property type
                <select className="rounded-lg border border-slate-200 px-3 py-3 outline-none focus:border-brand">
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Studio</option>
                  <option>Plot</option>
                </select>
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
              Description
              <textarea rows={5} className="rounded-lg border border-slate-200 px-3 py-3 outline-none focus:border-brand" />
            </label>
            <div className="mt-5 rounded-lg border border-dashed border-green-400 bg-green-50 p-6 text-center">
              <Camera className="mx-auto text-green-700" />
              <p className="mt-2 font-bold text-navy">Upload property images</p>
              <p className="text-sm text-slate-600">Drag files here or choose from your device.</p>
            </div>
            <Button type="button" className="mt-6">Submit for verification</Button>
          </form>
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-black text-navy">Verification workflow</h2>
            <div className="mt-5 grid gap-4">
              {[
                ["Draft", "Add complete property details"],
                ["Pending review", "Team checks images, ownership, and price"],
                ["Approved", "Listing goes live with verified badge"]
              ].map(([title, copy], index) => (
                <div key={title} className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand font-black text-navy">{index + 1}</span>
                  <div>
                    <p className="font-bold text-navy">{title}</p>
                    <p className="text-sm text-slate-600">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700">
              <ShieldCheck className="text-green-600" /> Verified listings receive higher lead quality.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
