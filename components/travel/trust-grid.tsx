import { whyChooseUs } from "@/data/travel";

export function TrustGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {whyChooseUs.map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-green-50 text-green-700 sm:h-11 sm:w-11">
              <Icon size={20} />
            </span>
            <h3 className="mt-3 text-sm font-black leading-tight text-navy sm:mt-4 sm:text-lg">{item.title}</h3>
            <p className="mt-2 hidden text-sm leading-6 text-slate-600 sm:block">{item.copy}</p>
          </article>
        );
      })}
    </div>
  );
}
