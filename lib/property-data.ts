export type Property = {
  id: string;
  slug: string;
  title: string;
  city: string;
  locality: string;
  type: "Apartment" | "Villa" | "Studio" | "Plot" | "Penthouse";
  status: "Buy" | "Rent";
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnished: "Furnished" | "Semi-furnished" | "Unfurnished";
  rating: number;
  verified: boolean;
  featured: boolean;
  image: string;
  gallery: string[];
  amenities: string[];
  agent: {
    name: string;
    role: string;
    phone: string;
    avatar: string;
  };
  description: string;
};

export const properties: Property[] = [
  {
    id: "ps-001",
    slug: "skyline-residences-bandra-west",
    title: "Skyline Residences",
    city: "Mumbai",
    locality: "Bandra West",
    type: "Apartment",
    status: "Buy",
    price: 42500000,
    bedrooms: 4,
    bathrooms: 4,
    area: 2680,
    furnished: "Furnished",
    rating: 4.9,
    verified: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Sea-facing deck", "Clubhouse", "Gym", "Valet parking", "Power backup"],
    agent: {
      name: "Aarav Mehta",
      role: "Luxury Homes Partner",
      phone: "919999999999",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
    },
    description:
      "A refined high-floor apartment with sweeping views, private elevator access, warm interiors, and a premium amenity stack in the heart of Bandra West."
  },
  {
    id: "ps-002",
    slug: "green-courtyard-villa-whitefield",
    title: "Green Courtyard Villa",
    city: "Bengaluru",
    locality: "Whitefield",
    type: "Villa",
    status: "Buy",
    price: 31000000,
    bedrooms: 5,
    bathrooms: 5,
    area: 4200,
    furnished: "Semi-furnished",
    rating: 4.8,
    verified: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Private garden", "Solar roof", "Servant room", "Two-car garage", "Security"],
    agent: {
      name: "Nisha Rao",
      role: "Villa Specialist",
      phone: "918888888888",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    description:
      "A spacious villa built for family living, with a lush courtyard, abundant daylight, and quick access to international schools and tech parks."
  },
  {
    id: "ps-003",
    slug: "central-park-studio-gurugram",
    title: "Central Park Studio",
    city: "Gurugram",
    locality: "Golf Course Road",
    type: "Studio",
    status: "Rent",
    price: 85000,
    bedrooms: 1,
    bathrooms: 1,
    area: 720,
    furnished: "Furnished",
    rating: 4.7,
    verified: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Managed lobby", "Housekeeping", "Cowork lounge", "Metro access", "Rooftop pool"],
    agent: {
      name: "Kabir Sethi",
      role: "Rental Advisor",
      phone: "917777777777",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
    },
    description:
      "A move-in-ready studio apartment for professionals seeking serviced comfort near corporate hubs and premium retail."
  },
  {
    id: "ps-004",
    slug: "riverfront-penthouse-koregaon-park",
    title: "Riverfront Penthouse",
    city: "Pune",
    locality: "Koregaon Park",
    type: "Penthouse",
    status: "Buy",
    price: 28500000,
    bedrooms: 3,
    bathrooms: 4,
    area: 3150,
    furnished: "Unfurnished",
    rating: 4.6,
    verified: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Private terrace", "River view", "Smart access", "Pet zone", "Concierge"],
    agent: {
      name: "Ira Kapoor",
      role: "Prime Properties",
      phone: "916666666666",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    },
    description:
      "An airy penthouse with a generous terrace, open-plan shell, and rare riverfront positioning in a walkable lifestyle district."
  }
];

export const agents = [
  { name: "Aarav Mehta", market: "Mumbai Luxury", deals: "142", image: properties[0].agent.avatar },
  { name: "Nisha Rao", market: "Bengaluru Villas", deals: "118", image: properties[1].agent.avatar },
  { name: "Kabir Sethi", market: "NCR Rentals", deals: "206", image: properties[2].agent.avatar }
];

export const reviews = [
  {
    name: "Meera S.",
    quote: "Rivanta Realty helped us compare verified homes quickly and the agent follow-up was genuinely sharp.",
    city: "Mumbai"
  },
  {
    name: "Rohan P.",
    quote: "The filters were precise, the shortlist stayed clean, and scheduling visits took minutes instead of days.",
    city: "Bengaluru"
  },
  {
    name: "Ananya K.",
    quote: "We listed our villa and had qualified leads within the first week. The verification flow felt premium.",
    city: "Pune"
  }
];
