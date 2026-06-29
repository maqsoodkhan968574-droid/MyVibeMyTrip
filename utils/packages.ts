import { groupPackages } from "@/data/travel";

export const packageSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getPackageBySlug = (slug: string) =>
  groupPackages.find((trip) => trip.slug === slug || packageSlug(trip.title) === slug);
