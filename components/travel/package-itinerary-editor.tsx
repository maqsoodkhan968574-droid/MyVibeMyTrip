"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Copy, RotateCcw, Save } from "lucide-react";
import type { GroupPackage } from "@/types/travel";

type PackageItineraryEditorProps = {
  packages: GroupPackage[];
};

export function PackageItineraryEditor({ packages }: PackageItineraryEditorProps) {
  const [editablePackages, setEditablePackages] = useState<GroupPackage[]>(packages);
  const [selectedSlug, setSelectedSlug] = useState(packages[0]?.slug ?? "");
  const [savedMessage, setSavedMessage] = useState("");

  const selectedPackage = useMemo(
    () => editablePackages.find((trip) => trip.slug === selectedSlug) ?? editablePackages[0],
    [editablePackages, selectedSlug]
  );

  const updatePackage = (updater: (trip: GroupPackage) => GroupPackage) => {
    if (!selectedPackage) return;

    setEditablePackages((current) =>
      current.map((trip) => (trip.slug === selectedPackage.slug ? updater(trip) : trip))
    );
    setSavedMessage("");
  };

  const exportJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(editablePackages, null, 2));
    setSavedMessage("Editable itinerary JSON copied. Backend save can use this exact structure.");
  };

  const resetChanges = () => {
    setEditablePackages(packages);
    setSelectedSlug(packages[0]?.slug ?? "");
    setSavedMessage("Reset to current website itinerary data.");
  };

  if (!selectedPackage) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <p className="eyebrow">Package itinerary admin</p>
        <h1 className="mt-2 text-3xl font-black text-navy">Editable itinerary workspace</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          Edit package overview, inclusions, and day-wise activities here. For now changes are frontend-only and export as JSON, so a backend/API save can be added cleanly later.
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-slate-200 p-4 lg:border-b-0 lg:border-r">
          <div className="grid gap-2">
            {editablePackages.map((trip) => (
              <button
                key={trip.slug}
                type="button"
                onClick={() => setSelectedSlug(trip.slug)}
                className={`rounded-lg px-3 py-3 text-left text-sm font-black transition ${
                  selectedPackage.slug === trip.slug ? "bg-navy text-white" : "bg-slate-50 text-slate-700 hover:bg-green-50"
                }`}
              >
                {trip.title}
                <span className="mt-1 block text-xs font-semibold opacity-75">{trip.duration}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="p-4 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Package title
              <input
                value={selectedPackage.title}
                onChange={(event) => updatePackage((trip) => ({ ...trip, title: event.target.value }))}
                className="min-h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-green-600"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Duration
              <input
                value={selectedPackage.duration}
                onChange={(event) => updatePackage((trip) => ({ ...trip, duration: event.target.value }))}
                className="min-h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-green-600"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Destination
              <input
                value={selectedPackage.destination}
                onChange={(event) => updatePackage((trip) => ({ ...trip, destination: event.target.value }))}
                className="min-h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-green-600"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Category
              <input
                value={selectedPackage.category}
                onChange={(event) => updatePackage((trip) => ({ ...trip, category: event.target.value }))}
                className="min-h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-green-600"
              />
            </label>
          </div>

          <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
            Overview
            <textarea
              value={selectedPackage.overview}
              onChange={(event) => updatePackage((trip) => ({ ...trip, overview: event.target.value }))}
              rows={4}
              className="rounded-lg border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-green-600"
            />
          </label>

          <div className="mt-6">
            <h2 className="text-xl font-black text-navy">Day-wise itinerary</h2>
            <div className="mt-4 grid gap-4">
              {selectedPackage.itinerary.map((day, dayIndex) => (
                <article key={day.day} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <label className="grid gap-2 text-sm font-bold text-slate-700">
                      Day title
                      <input
                        value={day.title}
                        onChange={(event) =>
                          updatePackage((trip) => ({
                            ...trip,
                            itinerary: trip.itinerary.map((item, index) =>
                              index === dayIndex ? { ...item, title: event.target.value } : item
                            )
                          }))
                        }
                        className="min-h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-green-600"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-bold text-slate-700">
                      Location
                      <input
                        value={day.location}
                        onChange={(event) =>
                          updatePackage((trip) => ({
                            ...trip,
                            itinerary: trip.itinerary.map((item, index) =>
                              index === dayIndex ? { ...item, location: event.target.value } : item
                            )
                          }))
                        }
                        className="min-h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-green-600"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-bold text-slate-700">
                      Stay
                      <input
                        value={day.stay}
                        onChange={(event) =>
                          updatePackage((trip) => ({
                            ...trip,
                            itinerary: trip.itinerary.map((item, index) =>
                              index === dayIndex ? { ...item, stay: event.target.value } : item
                            )
                          }))
                        }
                        className="min-h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-green-600"
                      />
                    </label>
                  </div>
                  <label className="mt-3 grid gap-2 text-sm font-bold text-slate-700">
                    Activities, one per line
                    <textarea
                      value={day.activities.join("\n")}
                      onChange={(event) =>
                        updatePackage((trip) => ({
                          ...trip,
                          itinerary: trip.itinerary.map((item, index) =>
                            index === dayIndex ? { ...item, activities: event.target.value.split("\n").filter(Boolean) } : item
                          )
                        }))
                      }
                      rows={4}
                      className="rounded-lg border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-green-600"
                    />
                  </label>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row">
            <button type="button" onClick={exportJson} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-black text-white transition hover:bg-green-800">
              <Copy size={16} />
              Copy editable JSON
            </button>
            <button type="button" onClick={resetChanges} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-50">
              <RotateCcw size={16} />
              Reset
            </button>
            <span className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
              <Save size={16} />
              API-ready structure
            </span>
          </div>

          {savedMessage && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-bold text-green-700">
              <CheckCircle2 size={16} />
              {savedMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
