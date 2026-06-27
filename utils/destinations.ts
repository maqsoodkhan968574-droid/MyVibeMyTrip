import { destinations } from "@/data/travel";

export const destinationSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getDestinationBySlug = (slug: string) =>
  destinations.find((destination) => destinationSlug(destination.name) === slug);
