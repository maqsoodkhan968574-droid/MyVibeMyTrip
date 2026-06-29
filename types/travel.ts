import type { LucideIcon } from "lucide-react";

export type TravelCategory = {
  title: string;
  slug: string;
  description: string;
  bestFor: string;
  icon: LucideIcon;
};

export type Destination = {
  name: string;
  region: "Sikkim" | "Darjeeling";
  description: string;
  detailIntro: string;
  bestFor: string[];
  highlights: string[];
  travelTips: string[];
  image: string;
  tags: string[];
  gallerySlots: number;
  galleryImages?: string[];
};

export type GroupPackage = {
  title: string;
  slug: string;
  destination: string;
  duration: string;
  category: string;
  price: string;
  badge: string;
  image: string;
  overview: string;
  inclusions: string[];
  itinerary: PackageItineraryDay[];
};

export type PackageItineraryDay = {
  day: number;
  title: string;
  location: string;
  activities: string[];
  stay: string;
  meals: string;
};

export type QuizAnswers = {
  ageGroup: string;
  travelType: string;
  preferredGroup: string;
  budget: string;
  energy: string;
  music: string;
  food: string;
  adventure: string;
  wakeUp: string;
  photography: string;
  language: string;
  womenOnly: string;
  duration: string;
};
