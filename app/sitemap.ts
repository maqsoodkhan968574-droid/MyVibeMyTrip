import type { MetadataRoute } from "next";
import { properties } from "@/lib/property-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const routes = ["", "/properties", "/sell", "/dashboard", "/admin", "/login", "/register"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));

  const propertyRoutes = properties.map((property) => ({
    url: `${baseUrl}/properties/${property.slug}`,
    lastModified: new Date()
  }));

  return [...routes, ...propertyRoutes];
}
