import Image from "next/image";
import { agents } from "@/lib/property-data";

export default function AgentsPage() {
  return (
    <main className="container-shell py-10">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Trusted Agents</p>
      <h1 className="mt-2 text-4xl font-black text-navy">Work with verified experts</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {agents.map((agent) => (
          <article key={agent.name} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <Image src={agent.image} alt={agent.name} width={120} height={120} className="h-24 w-24 rounded-lg object-cover" />
            <h2 className="mt-4 text-xl font-black text-navy">{agent.name}</h2>
            <p className="text-slate-600">{agent.market}</p>
            <p className="mt-3 text-sm font-bold text-green-700">{agent.deals} closed deals</p>
          </article>
        ))}
      </div>
    </main>
  );
}
