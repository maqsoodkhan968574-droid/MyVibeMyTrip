import { DestinationCard } from "@/components/travel/destination-card";
import { DestinationGallerySection } from "@/components/travel/destination-gallery-section";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/travel/page-hero";
import { destinations } from "@/data/travel";

export default function DestinationsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Destinations"
        title="Phase 1 routes across Sikkim and Darjeeling."
        copy="Start with mountain destinations where shared taxis, hotel choices, and travel pace matter deeply to the final experience."
        image="/destinations/gangtok/gangtok-cover.png"
        imageAlt="Gangtok mountain road and valley view"
      />
      <section className="container-shell py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.name} destination={destination} />
          ))}
        </div>
      </section>
      <DestinationGallerySection destinations={destinations} />
      <Footer />
    </main>
  );
}
