import { BarChart3, Building2, CheckCircle2, Users, XCircle } from "lucide-react";
import { properties } from "@/lib/property-data";
import { prisma } from "@/lib/prisma";

const cards = [
  { label: "Users", value: "8,420", icon: Users },
  { label: "Properties", value: "18,240", icon: Building2 },
  { label: "Approvals", value: "126", icon: CheckCircle2 },
  { label: "Rejected", value: "18", icon: XCircle }
];

export default async function AdminPage() {
  const sellerLeads = await prisma.sellerServiceLead.findMany({
    orderBy: { createdAt: "desc" },
    take: 20
  }).catch(() => []);

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
        <section className="mt-8 rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-200 p-5 sm:flex-row sm:items-center">
            <div><h2 className="font-black text-navy">Developer, broker, and owner submissions</h2><p className="mt-1 text-sm text-slate-500">New seller-service requests submitted through Rivanta Realty.</p></div>
            <span className="text-sm font-bold text-green-700">{sellerLeads.length} recent requests</span>
          </div>
          {sellerLeads.length === 0 ? (
            <p className="p-5 text-sm text-slate-500">No seller-service submissions have arrived yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-500"><tr><th className="px-5 py-3">Service</th><th className="px-5 py-3">Contact</th><th className="px-5 py-3">Location</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Submitted details</th></tr></thead>
                <tbody>
                  {sellerLeads.map((lead) => (
                    <tr key={lead.id} className="border-t border-slate-100 align-top">
                      <td className="px-5 py-4 font-bold text-navy">{lead.serviceType.toLowerCase()}</td>
                      <td className="px-5 py-4"><p className="font-bold text-navy">{lead.name}</p><p>{lead.email}</p><p>{lead.phone}</p></td>
                      <td className="px-5 py-4"><p>{lead.city}</p><p className="max-w-[220px] text-slate-500">{lead.address || "Address not provided"}</p></td>
                      <td className="px-5 py-4"><span className="bg-green-50 px-3 py-1 text-xs font-bold text-green-700">{lead.status.replace("_", " ")}</span></td>
                      <td className="px-5 py-4"><details><summary className="cursor-pointer font-bold text-green-700">View full details and images</summary><pre className="mt-3 max-w-sm whitespace-pre-wrap bg-slate-50 p-3 text-xs text-slate-600">{JSON.stringify(lead.details, null, 2)}</pre><div className="mt-3 grid max-w-sm grid-cols-2 gap-2">{lead.images.map((image) => <a key={image} href={image} target="_blank" rel="noreferrer"><img src={image} alt="Submitted property" className="aspect-video w-full object-cover" /></a>)}</div></details></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
