import Image from "next/image";
import Link from "next/link";
import { Heart, UserCircle } from "lucide-react";
import { MobileNavigation } from "@/components/mobile-navigation";

const links = [
  { href: "/properties", label: "Buy" },
  { href: "/properties?status=Rent", label: "Rent" },
  { href: "/sell", label: "Sell" },
  { href: "/#consultation", label: "Consultation" },
  { href: "/#seller-services", label: "Seller services" },
  { href: "/#services", label: "Tools" },
  { href: "/agents", label: "Agents" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-navy">
          <Image src="/brand/rivanta-mark.png" alt="Rivanta Realty" width={38} height={43} className="h-10 w-9 object-contain" priority />
          <span className="text-lg">Rivanta Realty</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
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
          <Link href="/login" className="hidden items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:inline-flex">
            <UserCircle size={18} />
            Login
          </Link>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
