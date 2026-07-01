"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeIndianRupee,
  CheckCircle2,
  Copy,
  CreditCard,
  Edit3,
  Eye,
  ImageIcon,
  MapPin,
  PackageCheck,
  Plus,
  RefreshCcw,
  Save,
  Settings2,
  ShieldCheck,
  Trash2
} from "lucide-react";
import type { Destination, GroupPackage } from "@/types/travel";

type AdminControlCenterProps = {
  packages: GroupPackage[];
  destinations: Destination[];
};

type PaymentRecord = {
  id: string;
  packageTitle: string;
  customer: string;
  amount: string;
  status: "Paid" | "Pending" | "Refund review";
  method: string;
};

const paymentRecords: PaymentRecord[] = [
  {
    id: "PAY-MVMT-1041",
    packageTitle: "Gen Z Sikkim Adventure Trip",
    customer: "Demo traveler",
    amount: "INR 1,100",
    status: "Paid",
    method: "Razorpay test"
  },
  {
    id: "PAY-MVMT-1042",
    packageTitle: "Women Only Sikkim Group Trip",
    customer: "Pending lead",
    amount: "INR 1,100",
    status: "Pending",
    method: "Booking token"
  },
  {
    id: "PAY-MVMT-1043",
    packageTitle: "Luxury North-East Escape",
    customer: "Premium inquiry",
    amount: "INR 1,100",
    status: "Refund review",
    method: "Razorpay test"
  }
];

const moduleTabs = [
  { id: "packages", label: "Packages", icon: PackageCheck },
  { id: "destinations", label: "Destinations", icon: MapPin },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings2 }
] as const;

type ModuleTab = (typeof moduleTabs)[number]["id"];

export function AdminControlCenter({ packages, destinations }: AdminControlCenterProps) {
  const [activeTab, setActiveTab] = useState<ModuleTab>("packages");
  const [editablePackages, setEditablePackages] = useState(packages);
  const [editableDestinations, setEditableDestinations] = useState(destinations);
  const [payments, setPayments] = useState(paymentRecords);
  const [selectedPackageSlug, setSelectedPackageSlug] = useState(packages[0]?.slug ?? "");
  const [selectedDestinationName, setSelectedDestinationName] = useState(destinations[0]?.name ?? "");
  const [message, setMessage] = useState("");

  const selectedPackage = useMemo(
    () => editablePackages.find((trip) => trip.slug === selectedPackageSlug) ?? editablePackages[0],
    [editablePackages, selectedPackageSlug]
  );

  const selectedDestination = useMemo(
    () => editableDestinations.find((destination) => destination.name === selectedDestinationName) ?? editableDestinations[0],
    [editableDestinations, selectedDestinationName]
  );

  const updatePackage = (updater: (trip: GroupPackage) => GroupPackage) => {
    if (!selectedPackage) return;
    setEditablePackages((current) => current.map((trip) => (trip.slug === selectedPackage.slug ? updater(trip) : trip)));
    setMessage("");
  };

  const updateDestination = (updater: (destination: Destination) => Destination) => {
    if (!selectedDestination) return;
    setEditableDestinations((current) =>
      current.map((destination) => (destination.name === selectedDestination.name ? updater(destination) : destination))
    );
    setMessage("");
  };

  const copyAdminJson = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(
        {
          packages: editablePackages,
          destinations: editableDestinations,
          payments
        },
        null,
        2
      )
    );
    setMessage("Admin data copied as JSON. This is ready for a backend save API.");
  };

  const resetAll = () => {
    setEditablePackages(packages);
    setEditableDestinations(destinations);
    setPayments(paymentRecords);
    setMessage("Reset to current website data.");
  };

  const markPayment = (paymentId: string, status: PaymentRecord["status"]) => {
    setPayments((current) => current.map((payment) => (payment.id === paymentId ? { ...payment, status } : payment)));
    setMessage("Payment status updated in admin preview.");
  };

  return (
    <section className="mt-8 rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Admin control center</p>
            <h2 className="mt-2 text-2xl font-black text-navy sm:text-3xl">Edit travel business operations</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-600">
              Packages, destinations, gallery content, payment status, and website settings can be managed here. Current saves are frontend preview and JSON export, ready for API/database wiring.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={copyAdminJson}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-black text-white transition hover:bg-green-800"
            >
              <Copy size={16} />
              Export admin JSON
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {moduleTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-black transition ${
                activeTab === tab.id ? "bg-navy text-white" : "bg-slate-50 text-slate-700 hover:bg-green-50 hover:text-green-800"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {activeTab === "packages" && selectedPackage ? (
          <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
            <aside className="grid h-fit gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
              {editablePackages.map((trip) => (
                <button
                  key={trip.slug}
                  type="button"
                  onClick={() => setSelectedPackageSlug(trip.slug)}
                  className={`rounded-lg px-3 py-3 text-left text-sm font-black transition ${
                    selectedPackage.slug === trip.slug ? "bg-navy text-white" : "bg-white text-slate-700 hover:bg-green-50"
                  }`}
                >
                  {trip.title}
                  <span className="mt-1 block text-xs font-semibold opacity-75">{trip.price}</span>
                </button>
              ))}
              <button
                type="button"
                className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-dashed border-green-300 bg-white px-3 py-2 text-sm font-black text-green-700"
              >
                <Plus size={16} />
                Add package
              </button>
            </aside>

            <div className="grid gap-4">
              <div className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">Package editor</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">Edit visible package content, pricing, matching badge, images, inclusions, and itinerary data.</p>
                </div>
                <Link href={`/group-packages/${selectedPackage.slug}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-black text-white">
                  <Eye size={16} />
                  Preview
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <AdminInput label="Package title" value={selectedPackage.title} onChange={(value) => updatePackage((trip) => ({ ...trip, title: value }))} />
                <AdminInput label="Starting price" value={selectedPackage.price} onChange={(value) => updatePackage((trip) => ({ ...trip, price: value }))} />
                <AdminInput label="Duration" value={selectedPackage.duration} onChange={(value) => updatePackage((trip) => ({ ...trip, duration: value }))} />
                <AdminInput label="Compatibility badge" value={selectedPackage.badge} onChange={(value) => updatePackage((trip) => ({ ...trip, badge: value }))} />
                <AdminInput label="Destination route" value={selectedPackage.destination} onChange={(value) => updatePackage((trip) => ({ ...trip, destination: value }))} />
                <AdminInput label="Category" value={selectedPackage.category} onChange={(value) => updatePackage((trip) => ({ ...trip, category: value }))} />
              </div>

              <AdminTextarea label="Overview" value={selectedPackage.overview} rows={4} onChange={(value) => updatePackage((trip) => ({ ...trip, overview: value }))} />
              <AdminTextarea
                label="Inclusions, one per line"
                value={selectedPackage.inclusions.join("\n")}
                rows={4}
                onChange={(value) => updatePackage((trip) => ({ ...trip, inclusions: value.split("\n").filter(Boolean) }))}
              />

              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-black text-navy">Itinerary days</h3>
                  <button type="button" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-green-700 px-3 py-2 text-xs font-black text-white">
                    <Plus size={15} />
                    Add day
                  </button>
                </div>
                <div className="mt-4 grid gap-3">
                  {selectedPackage.itinerary.map((day) => (
                    <article key={day.day} className="rounded-lg bg-slate-50 p-3">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.14em] text-green-700">Day {day.day}</p>
                          <h4 className="mt-1 font-black text-navy">{day.title}</h4>
                          <p className="mt-1 text-sm font-semibold text-slate-600">{day.location} | Stay: {day.stay}</p>
                        </div>
                        <div className="flex gap-2">
                          <button type="button" className="grid h-10 w-10 place-items-center rounded-lg bg-white text-green-700">
                            <Edit3 size={16} />
                          </button>
                          <button type="button" className="grid h-10 w-10 place-items-center rounded-lg bg-white text-rose-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "destinations" && selectedDestination ? (
          <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
            <aside className="grid h-fit gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
              {editableDestinations.map((destination) => (
                <button
                  key={destination.name}
                  type="button"
                  onClick={() => setSelectedDestinationName(destination.name)}
                  className={`rounded-lg px-3 py-3 text-left text-sm font-black transition ${
                    selectedDestination.name === destination.name ? "bg-navy text-white" : "bg-white text-slate-700 hover:bg-green-50"
                  }`}
                >
                  {destination.name}
                  <span className="mt-1 block text-xs font-semibold opacity-75">{destination.region}</span>
                </button>
              ))}
              <button type="button" className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-dashed border-green-300 bg-white px-3 py-2 text-sm font-black text-green-700">
                <Plus size={16} />
                Add destination
              </button>
            </aside>

            <div className="grid gap-4">
              <div className="flex flex-col gap-3 rounded-lg border border-green-200 bg-green-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-green-700">Destination editor</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">Edit destination copy, tags, best-for groups, gallery slots, and image URLs.</p>
                </div>
                <Link href={`/destinations/${selectedDestination.name.toLowerCase().replaceAll(" ", "-")}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-black text-white">
                  <Eye size={16} />
                  Preview
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <AdminInput label="Destination name" value={selectedDestination.name} onChange={(value) => updateDestination((destination) => ({ ...destination, name: value }))} />
                <AdminInput label="Region" value={selectedDestination.region} onChange={(value) => updateDestination((destination) => ({ ...destination, region: value as Destination["region"] }))} />
                <AdminInput label="Hero image URL" value={selectedDestination.image} onChange={(value) => updateDestination((destination) => ({ ...destination, image: value }))} />
                <AdminInput
                  label="Gallery slots"
                  value={String(selectedDestination.gallerySlots)}
                  onChange={(value) => updateDestination((destination) => ({ ...destination, gallerySlots: Number(value) || 0 }))}
                />
              </div>
              <AdminTextarea label="Short card description" value={selectedDestination.description} rows={3} onChange={(value) => updateDestination((destination) => ({ ...destination, description: value }))} />
              <AdminTextarea label="Detail intro" value={selectedDestination.detailIntro} rows={4} onChange={(value) => updateDestination((destination) => ({ ...destination, detailIntro: value }))} />
              <AdminTextarea label="Tags, one per line" value={selectedDestination.tags.join("\n")} rows={3} onChange={(value) => updateDestination((destination) => ({ ...destination, tags: value.split("\n").filter(Boolean) }))} />
              <AdminTextarea label="Gallery image URLs, one per line" value={(selectedDestination.galleryImages ?? []).join("\n")} rows={6} onChange={(value) => updateDestination((destination) => ({ ...destination, galleryImages: value.split("\n").filter(Boolean) }))} />
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2 text-sm font-black text-navy">
                  <ImageIcon size={17} className="text-green-700" />
                  Gallery controls
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
                  {(selectedDestination.galleryImages ?? []).slice(0, 8).map((image) => (
                    <div key={image} className="truncate rounded-lg bg-slate-50 p-3 text-xs font-bold text-slate-600">
                      {image}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "payments" ? (
          <div className="grid gap-4">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">Payment admin</p>
              <h3 className="mt-2 text-xl font-black text-navy">Razorpay booking tokens</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">Track order IDs, token status, refund review, and manual confirmation. Real payment data will connect through the Razorpay verification API.</p>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              {payments.map((payment) => (
                <article key={payment.id} className="grid gap-3 border-b border-slate-200 p-4 last:border-b-0 lg:grid-cols-[1fr_160px_220px] lg:items-center">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{payment.id}</p>
                    <h4 className="mt-1 font-black text-navy">{payment.packageTitle}</h4>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{payment.customer} | {payment.method}</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-sm font-black text-navy"><BadgeIndianRupee size={17} className="text-green-700" /> {payment.amount}</p>
                    <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-black ${payment.status === "Paid" ? "bg-green-50 text-green-700" : payment.status === "Pending" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Paid", "Pending", "Refund review"] as const).map((status) => (
                      <button key={status} type="button" onClick={() => markPayment(payment.id, status)} className="min-h-10 rounded-lg bg-slate-50 px-2 text-xs font-black text-slate-700 hover:bg-green-50">
                        {status}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "settings" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {[
              ["Website mode", "Phase 1: Sikkim and Darjeeling"],
              ["Booking token", "INR 1,100 through Razorpay"],
              ["Admin login", "Private MyVibe admin route"],
              ["Project boundary", "Rivanta Realty is separate"]
            ].map(([title, copy]) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 text-green-700" size={21} />
                  <div>
                    <h3 className="font-black text-navy">{title}</h3>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
                  </div>
                </div>
              </article>
            ))}
            <article className="rounded-lg border border-slate-200 bg-white p-4 lg:col-span-2">
              <h3 className="text-lg font-black text-navy">Admin save system</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                Current admin edits are live-preview only in the browser. The UI is structured for future backend save endpoints: packages, destinations, payments, user bookings, and media library can each become database tables.
              </p>
            </article>
          </div>
        ) : null}

        {message ? (
          <p className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-bold text-green-700">
            <CheckCircle2 size={16} />
            {message}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-5 sm:flex-row">
          <button type="button" onClick={() => setMessage("Preview saved. Connect backend API to persist this permanently.")} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-black text-white transition hover:bg-green-800">
            <Save size={16} />
            Save preview
          </button>
          <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-sm font-black text-slate-700">
            <CheckCircle2 size={16} />
            API/database ready
          </span>
        </div>
      </div>
    </section>
  );
}

function AdminInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-green-600"
      />
    </label>
  );
}

function AdminTextarea({
  label,
  value,
  rows,
  onChange
}: {
  label: string;
  value: string;
  rows: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-slate-200 p-3 text-sm leading-6 outline-none transition focus:border-green-600"
      />
    </label>
  );
}
