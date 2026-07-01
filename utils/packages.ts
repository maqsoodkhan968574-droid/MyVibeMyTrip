import { groupPackages } from "@/data/travel";

export const packageSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getPackageBySlug = (slug: string) =>
  groupPackages.find((trip) => trip.slug === slug || packageSlug(trip.title) === slug);

export const getPackagesForDestination = (destinationName: string, region?: string) => {
  const normalizedName = destinationName.toLowerCase();
  const normalizedRegion = region?.toLowerCase();

  return groupPackages
    .map((trip) => {
      const destinationText = `${trip.destination} ${trip.title} ${trip.overview}`.toLowerCase();
      const exactMatch = destinationText.includes(normalizedName);
      const regionMatch = normalizedRegion ? destinationText.includes(normalizedRegion) : false;

      return {
        trip,
        score: exactMatch ? 2 : regionMatch ? 1 : 0
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.trip);
};
