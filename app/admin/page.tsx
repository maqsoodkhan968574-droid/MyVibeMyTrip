import { BarChart3, Building2, CheckCircle2, Users, XCircle } from "lucide-react";
import { properties } from "@/lib/property-data";

const cards = [
  { label: "Users", value: "8,420", icon: Users },
  { label: "Properties", value: "18,240", icon: Building2 },
  { label: "Approvals", value: "126", icon: CheckCircle2 },
  { label: "Rejected", value: "18", icon: XCircle }
];

export default function AdminPage() {
  return (
    <main className="bg-slate-50 py-10">
      <div className="container-shell">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Admin Panel</p>
            <h1 className="mt-2 text-4xl font-black text-navy">Marketplace operations</h1>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
            <BarChart3 className="text-green-600" /> Analytics dashboard
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {cards.map((card) => (
            <article key={card.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <card.icon className="text-green-600" />
              <strong className="mt-4 block text-3xl text-navy">{card.value}</strong>
              <span className="text-sm text-slate-500">{card.label}</span>
            </article>
          ))}
        </div>
        <section className="mt-8 rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="font-black text-navy">Approve or reject listings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-3">Property</th>
                  <th className="px-5 py-3">City</th>
                  <th className="px-5 py-3">Agent</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-bold text-navy">{property.title}</td>
                    <td className="px-5 py-4">{property.city}</td>
                    <td className="px-5 py-4">{property.agent.name}</td>
                    <td className="px-5 py-4"><span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Approved</span></td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="rounded-lg bg-brand px-3 py-2 font-bold text-navy">Approve</button>
                        <button className="rounded-lg bg-red-50 px-3 py-2 font-bold text-red-700">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
