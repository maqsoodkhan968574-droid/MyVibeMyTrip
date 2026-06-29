import { getServerSession } from "next-auth";
import Link from "next/link";
import { Bell, Heart, Luggage, ShoppingBag, Sparkles, UserCircle } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { groupPackages } from "@/data/travel";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const recommendedTrips = groupPackages.slice(0, 3);

  const stats = [
    { label: "Saved trips", value: 0, icon: Heart },
    { label: "Trip cart", value: 0, icon: ShoppingBag },
    { label: "Bookings", value: 0, icon: Luggage },
    { label: "Alerts", value: 0, icon: Bell }
  ];

  return (
    <main className="bg-slate-50 py-10">
      <div className="container-shell">
        <section className="rounded-lg bg-navy p-6 text-white shadow-soft sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <UserCircle size={56} className="text-amber-300" />
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-200">Traveler dashboard</p>
              <h1 className="mt-1 text-3xl font-black">Welcome back, {session?.user?.name ?? "MyVibe traveler"}</h1>
              <p className="mt-1 text-sm text-slate-300">{session?.user?.email}</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <stat.icon className="text-green-700" size={23} />
              <strong className="mt-4 block text-3xl font-black text-navy">{stat.value}</strong>
              <span className="text-sm font-semibold text-slate-500">{stat.label}</span>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.62fr_0.38fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">Saved travel data</p>
                <h2 className="mt-2 text-2xl font-black text-navy">Your trip cart and saved packages</h2>
              </div>
              <Link href="/group-packages" className="inline-flex min-h-10 items-center justify-center rounded-lg bg-navy px-4 py-2 text-sm font-black text-white">
                Browse packages
              </Link>
            </div>
            <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-6 text-slate-600">
              No saved trips yet. Soon this space will store packages you add to cart, compatibility results, selected dates, group preferences, and booking status.
            </div>
            <Link href="/my-bookings" className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-green-700 px-5 py-2 text-sm font-black text-white transition hover:bg-green-800">
              Open My Bookings
            </Link>
          </div>

          <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm sm:p-6">
            <Sparkles className="text-amber-600" size={28} />
            <h2 className="mt-3 text-xl font-black text-navy">Compatibility profile</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              Take the quiz to save your travel vibe, budget, group preference, wake-up style, food choice, and adventure level.
            </p>
            <Link href="/compatibility-quiz" className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-amber-400 px-4 py-2 text-sm font-black text-navy">
              Take Compatibility Quiz
            </Link>
          </aside>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Recommended</p>
              <h2 className="mt-2 text-2xl font-black text-navy">Trips you can add later</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendedTrips.map((trip) => (
              <Link key={trip.slug} href={`/group-packages/${trip.slug}`} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-green-700">{trip.category}</p>
                <h3 className="mt-2 text-lg font-black text-navy">{trip.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{trip.duration} | {trip.destination}</p>
                <p className="mt-3 text-sm font-black text-navy">{trip.price}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
