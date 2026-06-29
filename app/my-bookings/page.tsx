import { getServerSession } from "next-auth";
import Link from "next/link";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  Headphones,
  Luggage,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { authOptions } from "@/lib/auth";
import { groupPackages } from "@/data/travel";

const managedBookings = [
  {
    trip: groupPackages[0],
    bookingId: "MVMT-SIK-2401",
    date: "12 Aug - 16 Aug",
    status: "Matching in progress",
    payment: "Booking token pending",
    travelers: "1 traveler profile saved",
    nextStep: "Pay booking token inside itinerary page"
  },
  {
    trip: groupPackages[1],
    bookingId: "MVMT-DAR-1188",
    date: "21 Sep - 24 Sep",
    status: "Vibe match ready",
    payment: "Token received",
    travelers: "2 travelers verified",
    nextStep: "Confirm room preference"
  }
];

const actionCards = [
  {
    title: "Saved trips",
    copy: "Shortlist packages and compare vibe, budget, pace, and duration before booking.",
    icon: Luggage,
    href: "/group-packages"
  },
  {
    title: "Compatibility profile",
    copy: "Update your age group, travel energy, food style, music, language, and group preferences.",
    icon: Sparkles,
    href: "/compatibility-quiz"
  },
  {
    title: "Documents and travelers",
    copy: "Keep traveler names, contact details, and ID status organized for final confirmation.",
    icon: FileText,
    href: "/contact"
  },
  {
    title: "Support and updates",
    copy: "Message the MyVibe team for booking help, partner coordination, and trip changes.",
    icon: Headphones,
    href: "/contact"
  }
];

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="bg-slate-50 py-8 sm:py-12">
      <div className="container-shell">
        <section className="overflow-hidden rounded-lg bg-navy text-white shadow-soft">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.64fr_0.36fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">Traveler-only space</p>
              <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">Manage your bookings</h1>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-slate-200 sm:text-base sm:leading-7">
                Track booking tokens, matched groups, traveler details, trip dates, support messages, and package status from one private MyVibe account area.
              </p>
              <p className="mt-3 text-sm text-green-100">{session?.user?.email}</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-green-200" size={28} />
                <div>
                  <p className="text-sm font-black">Private user dashboard</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-300">Only logged-in travelers can open this section.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            { label: "Active bookings", value: "2", icon: CalendarDays },
            { label: "Matched groups", value: "1", icon: UsersRound },
            { label: "Payments", value: "1 pending", icon: CreditCard },
            { label: "Trip alerts", value: "3", icon: Bell }
          ].map((item) => (
            <article key={item.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <item.icon className="text-green-700" size={22} />
              <strong className="mt-4 block text-2xl font-black text-navy sm:text-3xl">{item.value}</strong>
              <span className="text-xs font-bold text-slate-500 sm:text-sm">{item.label}</span>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Your trips</p>
              <h2 className="mt-2 text-2xl font-black text-navy sm:text-3xl">Booking management</h2>
            </div>
            <Link href="/group-packages" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-navy px-5 py-2 text-sm font-black text-white transition hover:bg-slate-800">
              Add another trip
            </Link>
          </div>

          <div className="grid gap-4">
            {managedBookings.map((booking) => (
              <article key={booking.bookingId} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-green-700">{booking.status}</span>
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-amber-700">{booking.payment}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-black text-navy">{booking.trip.title}</h3>
                    <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-3">
                      <span className="flex items-center gap-2"><MapPin size={16} className="text-green-700" /> {booking.trip.destination}</span>
                      <span className="flex items-center gap-2"><CalendarDays size={16} className="text-green-700" /> {booking.date}</span>
                      <span className="flex items-center gap-2"><UsersRound size={16} className="text-green-700" /> {booking.travelers}</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">Next step: {booking.nextStep}</p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:min-w-52 lg:grid-cols-1">
                    <Link href={`/group-packages/${booking.trip.slug}`} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-amber-400 px-4 py-2 text-sm font-black text-navy transition hover:bg-amber-300">
                      Open itinerary
                    </Link>
                    <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-black text-navy transition hover:border-green-300 hover:text-green-700">
                      <MessageCircle size={16} />
                      Ask support
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {actionCards.map((card) => (
            <Link key={card.title} href={card.href} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <card.icon className="text-green-700" size={25} />
              <h3 className="mt-4 text-lg font-black text-navy">{card.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{card.copy}</p>
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-lg border border-green-200 bg-green-50 p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-1 shrink-0 text-green-700" size={24} />
              <div>
                <h2 className="text-lg font-black text-navy">Backend-ready structure</h2>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
                  This page is ready to connect with real saved trips, Razorpay payments, traveler documents, and booking records when the backend database flow is added.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
