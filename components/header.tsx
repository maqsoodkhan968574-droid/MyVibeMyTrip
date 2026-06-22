import Link from "next/link";
import { Building2, Heart, UserCircle } from "lucide-react";

const links = [
  { href: "/properties", label: "Buy" },
  { href: "/properties?status=Rent", label: "Rent" },
  { href: "/sell", label: "Sell" },
  { href: "/#consultation", label: "Consultation" },
  { href: "/agents", label: "Agents" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-navy">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-brand">
            <Building2 size={20} />
          </span>
          <span className="text-lg">Rivanta Realty</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-navy">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link aria-label="Saved properties" href="/dashboard" className="hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 sm:block">
            <Heart size={20} />
          </Link>
          <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            <UserCircle size={18} />
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
