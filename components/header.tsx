import Link from "next/link";
import { UserRound, UserRoundCheck } from "lucide-react";
import { navigationLinks } from "@/data/travel";
import { BrandMark } from "@/components/travel/brand-mark";
import { MobileNavigation } from "@/components/mobile-navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-4">
        <Link href="/" aria-label="MyVibeMyTrip.com home">
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-5 xl:flex">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-600 transition hover:text-green-700">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-navy transition hover:border-green-300 hover:text-green-700 sm:inline-flex">
            <UserRound size={18} />
            Account
          </Link>
          <Link href="/compatibility-quiz" className="hidden items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800 sm:inline-flex">
            <UserRoundCheck size={18} />
            Match Me
          </Link>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
