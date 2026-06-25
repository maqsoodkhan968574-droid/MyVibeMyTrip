import type { TravelCategory } from "@/types/travel";

type CategoryCardProps = {
  category: TravelCategory;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <article className="group h-full rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-soft sm:p-5">
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-green-50 text-green-700 transition group-hover:bg-navy group-hover:text-white sm:h-12 sm:w-12">
          <Icon size={20} />
        </span>
        <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-black text-amber-800 sm:px-3 sm:text-xs">Vibe fit</span>
      </div>
      <h3 className="mt-4 text-base font-black leading-tight text-navy sm:mt-5 sm:text-xl">{category.title}</h3>
      <p className="mt-3 hidden text-sm leading-6 text-slate-600 sm:block">{category.description}</p>
      <p className="mt-3 hidden text-xs font-bold uppercase tracking-[0.16em] text-green-700 sm:mt-4 sm:block">{category.bestFor}</p>
    </article>
  );
}
