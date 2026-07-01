import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({ eyebrow, title, copy, image = "/hero/myvibemytrip-home-hero.png", imageAlt = "Mountain travel experience" }: PageHeroProps) {
  return (
    <section className="page-hero-animated relative overflow-hidden bg-navy py-14 text-white sm:py-20">
      <div className="absolute inset-0 opacity-70">
        <div className="page-hero-glow absolute left-[-10%] top-[-30%] h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="page-hero-glow-delayed absolute bottom-[-30%] right-[-8%] h-96 w-96 rounded-full bg-green-400/20 blur-3xl" />
        <div className="page-hero-route absolute inset-0" />
      </div>
      <div className="container-shell relative grid items-center gap-8 lg:grid-cols-[0.95fr_0.65fr]">
        <div className="page-hero-copy max-w-4xl">
          <p className="eyebrow text-amber-300">{eyebrow}</p>
          <h1 className="page-hero-title mt-3 text-4xl font-black leading-tight sm:text-6xl">{title}</h1>
          <p className="page-hero-subtitle mt-5 max-w-3xl text-lg leading-8 text-slate-300">{copy}</p>
        </div>
        <div className="page-hero-image-wrap relative hidden aspect-[4/3] overflow-hidden rounded-lg border border-white/15 bg-white/10 shadow-2xl shadow-black/25 lg:block">
          <Image src={image} alt={imageAlt} fill priority sizes="34vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-white/5" />
          <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-navy/75 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-amber-200 backdrop-blur">
            Vibe matched
          </div>
        </div>
      </div>
    </section>
  );
}
