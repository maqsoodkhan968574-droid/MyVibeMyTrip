import Link from "next/link";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 bg-navy text-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Building2 className="text-brand" /> Rivanta Realty
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-300">
            Building Trust, Creating Homes. Premium homes, verified agents, and a smoother path from discovery to deal.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Explore</h3>
          <div className="grid gap-2 text-sm text-slate-300">
            <Link href="/properties">Buy homes</Link>
            <Link href="/properties?status=Rent">Rent homes</Link>
            <Link href="/sell">List property</Link>
            <Link href="/#consultation">Executive consultation</Link>
            <Link href="/#seller-services">Seller services</Link>
            <Link href="/#services">EMI and value tools</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Company</h3>
          <div className="grid gap-2 text-sm text-slate-300">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Contact</h3>
          <div className="grid gap-3 text-sm text-slate-300">
            <span className="flex gap-2"><Phone size={16} /> +91 99999 99999</span>
            <span className="flex gap-2"><Mail size={16} /> hello@rivanta-realty.in</span>
            <span className="flex gap-2"><MapPin size={16} /> Mumbai, Bengaluru, Pune, NCR</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        Rivanta Realty: Building Trust, Creating Homes. Proudly developed by a young entrepreneur from Bihar.
      </div>
    </footer>
  );
}
