import { Footer } from "@/components/footer";
import { PackageCard } from "@/components/travel/package-card";
import { PageHero } from "@/components/travel/page-hero";
import { groupPackages } from "@/data/travel";

export default function GroupPackagesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Group packages"
        title="Sample packages built around compatibility, not randomness."
        copy="Every package includes destination, duration, category, starting price placeholder, and a compatibility badge."
        image="/destinations/tsomgo-lake-cover.jpg"
        imageAlt="Tsomgo Lake package route"
      />
      <section className="container-shell py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groupPackages.map((trip) => (
            <PackageCard key={trip.title} trip={trip} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
