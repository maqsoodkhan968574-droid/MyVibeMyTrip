import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { navigationLinks } from "@/data/travel";
import { BrandMark } from "@/components/travel/brand-mark";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/myvibemytrip", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/myvibemytrip", icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/@myvibemytrip", icon: Youtube },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/myvibemytrip", icon: Linkedin }
];

export function Footer() {
  return (
    <footer className="mt-16 bg-navy text-white sm:mt-20">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="inline-flex rounded-lg bg-white p-2">
            <BrandMark size="large" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
            We match travelers by vibe, personality, and travel style so shared trips feel safer, smoother, and more memorable.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-black">Explore</h3>
          <div className="grid gap-2 text-sm text-slate-300">
            {navigationLinks.slice(0, 5).map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-black">Company</h3>
          <div className="grid gap-2 text-sm text-slate-300">
            <Link href="/partner-with-us" className="hover:text-white">Partner With Us</Link>
            <Link href="/about-us" className="hover:text-white">About Us</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-black">Contact</h3>
          <div className="grid gap-3 text-sm text-slate-300">
            <span className="flex gap-2"><Phone size={16} /> +91 88091 55543</span>
            <span className="flex gap-2"><Mail size={16} /> myvibemytrip@gmail.com</span>
            <span className="flex gap-2"><MapPin size={16} /> Sikkim, Darjeeling, and beyond</span>
          </div>
          <div className="mt-5">
            <h3 className="mb-3 font-black">Follow us</h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/10 text-slate-200 transition hover:border-amber-300/50 hover:bg-amber-300 hover:text-navy"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        MyVibeMyTrip.com. Compatibility-based group travel for modern explorers.
      </div>
    </footer>
  );
}
