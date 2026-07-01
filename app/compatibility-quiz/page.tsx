import { CompatibilityQuizForm } from "@/components/travel/compatibility-quiz-form";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/travel/page-hero";
import { SectionHeading } from "@/components/travel/section-heading";

export default function CompatibilityQuizPage() {
  return (
    <main>
      <PageHero
        eyebrow="Compatibility quiz"
        title="Discover your travel vibe and recommended group."
        copy="Answer a few practical questions about how you like to travel. The result shows a sample vibe score and group recommendations."
        image="/hero/myvibemytrip-home-hero.png"
        imageAlt="Compatibility-first mountain travel"
      />
      <section className="container-shell py-16">
        <SectionHeading title="Tell us what makes a trip feel right for you." copy="No backend is connected yet, so this frontend version calculates a sample result instantly and can be wired to an API later." />
        <div className="mt-8">
          <CompatibilityQuizForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
