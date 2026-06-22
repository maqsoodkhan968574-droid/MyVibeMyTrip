import { Bell, Heart, Home, Inbox, UserCircle } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/property-data";

const stats = [
  { label: "Saved properties", value: "12", icon: Heart },
  { label: "My listings", value: "4", icon: Home },
  { label: "Leads", value: "28", icon: Inbox },
  { label: "Alerts", value: "6", icon: Bell }
];

export default function DashboardPage() {
  return (
    <main className="bg-slate-50 py-10">
      <div className="container-shell">
        <div className="mb-8 flex items-center gap-4 rounded-lg bg-navy p-6 text-white">
          <UserCircle size={52} className="text-brand" />
          <div>
            <p className="text-sm text-slate-300">My Profile</p>
            <h1 className="text-3xl font-black">Welcome back, Investor</h1>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <stat.icon className="text-green-600" />
              <strong className="mt-4 block text-3xl text-navy">{stat.value}</strong>
              <span className="text-sm text-slate-500">{stat.label}</span>
            </article>
          ))}
        </div>
        <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="mb-5 text-2xl font-black text-navy">Saved Properties</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {properties.slice(0, 2).map((property) => <PropertyCard key={property.id} property={property} />)}
            </div>
          </div>
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-black text-navy">Leads and Enquiries</h2>
            <div className="mt-4 grid gap-3">
              {["Visit scheduled for Skyline Residences", "New inquiry for Green Courtyard Villa", "Agent replied to rental shortlist"].map((item) => (
                <div key={item} className="rounded-lg bg-slate-50 p-3 text-sm font-medium text-slate-700">{item}</div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
