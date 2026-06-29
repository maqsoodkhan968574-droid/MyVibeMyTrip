import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Camera,
  ClipboardList,
  Compass,
  FileText,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { destinations, groupPackages, travelCategories } from "@/data/travel";

const adminActions = [
  {
    title: "Package itineraries",
    copy: "Edit day-wise package plans, inclusions, duration, and admin-ready itinerary JSON.",
    href: "/admin/package-itineraries",
    icon: ClipboardList,
    status: "Editable now"
  },
  {
    title: "Public packages",
    copy: "Review all customer-facing group packages and open each itinerary detail page.",
    href: "/group-packages",
    icon: PackageCheck,
    status: "Public preview"
  },
  {
    title: "Destinations",
    copy: "Check Phase 1 Sikkim and Darjeeling destination galleries and detail pages.",
    href: "/destinations",
    icon: MapPin,
    status: "Photo library"
  },
  {
    title: "Compatibility quiz",
    copy: "Preview the traveler matching quiz and sample vibe result shown to customers.",
    href: "/compatibility-quiz",
    icon: Sparkles,
    status: "Lead funnel"
  },
  {
    title: "Partner page",
    copy: "Review local agency, taxi owner, hotel, guide, and operator partner messaging.",
    href: "/partner-with-us",
    icon: UsersRound,
    status: "Partner funnel"
  },
  {
    title: "Contact page",
    copy: "Check customer contact forms, trust copy, and direct reach-out information.",
    href: "/contact",
    icon: MessageCircle,
    status: "Support"
  }
];

export default function AdminPage() {
  const stats = [
    { label: "Phase 1 destinations", value: destinations.length, icon: Compass },
    { label: "Group packages", value: groupPackages.length, icon: PackageCheck },
    { label: "Traveler categories", value: travelCategories.length, icon: UsersRound },
    {
      label: "Gallery photos",
      value: destinations.reduce((total, destination) => total + (destination.galleryImages?.length ?? destination.gallerySlots), 0),
      icon: Camera
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="container-shell">
        <section className="relative overflow-hidden rounded-lg bg-navy p-6 text-white shadow-soft sm:p-8">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-green-400/10 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-amber-200">
                <ShieldCheck size={15} />
                Protected admin
              </p>
              <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">MyVibeMyTrip.com Admin</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                Manage the compatibility-first travel website from one private control center. This page is protected by admin login and is not visible to normal users.
              </p>
            </div>
            <Link href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-black text-navy transition hover:bg-amber-300">
              View live website <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <stat.icon className="text-green-700" size={24} />
              <strong className="mt-4 block text-3xl font-black text-navy">{stat.value}</strong>
              <span className="text-sm font-semibold text-slate-500">{stat.label}</span>
            </article>
          ))}
        </section>

        <section className="mt-8">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Control center</p>
              <h2 className="mt-2 text-2xl font-black text-navy sm:text-3xl">Travel-site admin tools</h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-green-700">
              <BarChart3 size={14} />
              MyVibe only
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {adminActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-green-50 text-green-700">
                    <action.icon size={22} />
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-600">
                    {action.status}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black text-navy">{action.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{action.copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-green-700">
                  Open <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.62fr_0.38fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <FileText className="mt-1 text-green-700" size={24} />
              <div>
                <h2 className="text-xl font-black text-navy">Admin editing roadmap</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Package itineraries are editable now as structured frontend data. Next backend step: connect this admin workspace to database/API save actions for live content updates.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-black text-navy">Project boundary</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              Rivanta Realty is separate. This admin page is only for MyVibeMyTrip travel operations.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
