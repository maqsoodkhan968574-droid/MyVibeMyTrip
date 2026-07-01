import { Mail, MapPin, Phone } from "lucide-react";
import { Footer } from "@/components/footer";
import { LeadForm } from "@/components/travel/lead-form";
import { PageHero } from "@/components/travel/page-hero";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Planning a trip, partnership, or pilot launch?"
        copy="Reach out for traveler onboarding, agency partnerships, destination expansion, or investor conversations."
        image="/destinations/mirik-cover.png"
        imageAlt="Peaceful hill destination for travel planning"
      />
      <section className="container-shell grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg bg-navy p-6 text-white shadow-soft">
          <h2 className="text-2xl font-black">Contact details</h2>
          <div className="mt-6 grid gap-4 text-sm text-slate-300">
            <span className="flex gap-3"><Phone className="text-amber-300" size={18} /> +91 88091 55543</span>
            <span className="flex gap-3"><Mail className="text-amber-300" size={18} /> myvibemytrip@gmail.com</span>
            <span className="flex gap-3"><MapPin className="text-amber-300" size={18} /> Sikkim, Darjeeling, and beyond</span>
          </div>
        </div>
        <LeadForm type="contact" />
      </section>
      <Footer />
    </main>
  );
}
