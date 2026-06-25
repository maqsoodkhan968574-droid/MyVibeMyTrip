import { CategoryCard } from "@/components/travel/category-card";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/travel/page-hero";
import { SectionHeading } from "@/components/travel/section-heading";
import { travelCategories } from "@/data/travel";

export default function TravelCategoriesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Travel categories"
        title="Different travelers need different groups."
        copy="A couple, a senior citizen, a solo traveler, and a Gen Z friend group can all love the same destination but need very different trip design."
      />
      <section className="container-shell py-12 sm:py-16">
        <SectionHeading title="Find the category that matches how you travel." copy="Categories help us design safer groups, better itineraries, and clearer expectations before booking." />
        <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">
          {travelCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
