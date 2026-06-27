import {
  BadgeCheck,
  Camera,
  Crown,
  Heart,
  Mountain,
  ShieldCheck,
  Sparkles,
  Users,
  UsersRound
} from "lucide-react";
import type { Destination, GroupPackage, TravelCategory } from "@/types/travel";

export const navigationLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/destinations", label: "Destinations" },
  { href: "/travel-categories", label: "Categories" },
  { href: "/compatibility-quiz", label: "Quiz" },
  { href: "/group-packages", label: "Packages" },
  { href: "/partner-with-us", label: "Partner" },
  { href: "/about-us", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const travelCategories: TravelCategory[] = [
  {
    title: "Gen Z Squad",
    slug: "gen-z-squad",
    description: "High-energy groups for reels, playlists, cafes, viewpoints, and late-night travel stories.",
    bestFor: "Friends and young solo travelers",
    icon: Sparkles
  },
  {
    title: "Couples Escape",
    slug: "couples-escape",
    description: "Privacy-aware itineraries with scenic stays, slower mornings, and romantic experiences.",
    bestFor: "Newly married and dating couples",
    icon: Heart
  },
  {
    title: "Family Explorer",
    slug: "family-explorer",
    description: "Comfortable pacing, reliable drivers, kid-friendly breaks, and practical hotel choices.",
    bestFor: "Parents, children, and family groups",
    icon: UsersRound
  },
  {
    title: "Senior Comfort",
    slug: "senior-comfort",
    description: "Easy routes, helpful partners, fewer long drives, and care-first planning.",
    bestFor: "Senior citizens and relaxed travelers",
    icon: ShieldCheck
  },
  {
    title: "Solo Explorer",
    slug: "solo-explorer",
    description: "Verified groups for independent travelers who want company without losing freedom.",
    bestFor: "Solo travelers",
    icon: Users
  },
  {
    title: "Women-Only Trips",
    slug: "women-only-trips",
    description: "Women-focused groups with verified travelers, safer stays, and clear communication.",
    bestFor: "Women travelers and friend circles",
    icon: BadgeCheck
  },
  {
    title: "Adventure Club",
    slug: "adventure-club",
    description: "Treks, snow points, early starts, higher energy, and thrill-friendly travel companions.",
    bestFor: "Adventure-first travelers",
    icon: Mountain
  },
  {
    title: "Luxury Travelers",
    slug: "luxury-travelers",
    description: "Premium stays, private moments, curated food, and elevated comfort through the route.",
    bestFor: "Premium and luxury guests",
    icon: Crown
  }
];

const unsplashImage = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1400&q=85`;

const destinationGalleries = {
  nathulaPass: [
    unsplashImage("photo-1605640840605-14ac1855827b"),
    unsplashImage("photo-1483728642387-6c3bdd6c93e5"),
    unsplashImage("photo-1464822759023-fed622ff2c3b"),
    unsplashImage("photo-1506905925346-21bda4d32df4"),
    unsplashImage("photo-1493246507139-91e8fad9978e"),
    unsplashImage("photo-1500534314209-a25ddb2bd429"),
    unsplashImage("photo-1519681393784-d120267933ba"),
    unsplashImage("photo-1519904981063-b0cf448d479e"),
    unsplashImage("photo-1500530855697-b586d89ba3ee"),
    unsplashImage("photo-1518002054494-3a6f94352e9d")
  ],
  tsomgoLake: [
    unsplashImage("photo-1544735716-392fe2489ffa"),
    unsplashImage("photo-1470770841072-f978cf4d019e"),
    unsplashImage("photo-1501785888041-af3ef285b470"),
    unsplashImage("photo-1506744038136-46273834b3fb"),
    unsplashImage("photo-1433086966358-54859d0ed716"),
    unsplashImage("photo-1464822759023-fed622ff2c3b"),
    unsplashImage("photo-1506905925346-21bda4d32df4"),
    unsplashImage("photo-1517824806704-9040b037703b"),
    unsplashImage("photo-1483728642387-6c3bdd6c93e5"),
    unsplashImage("photo-1500534314209-a25ddb2bd429")
  ],
  lachung: [
    unsplashImage("photo-1500530855697-b586d89ba3ee"),
    unsplashImage("photo-1433086966358-54859d0ed716"),
    unsplashImage("photo-1506905925346-21bda4d32df4"),
    unsplashImage("photo-1472214103451-9374bd1c798e"),
    unsplashImage("photo-1519681393784-d120267933ba"),
    unsplashImage("photo-1493246507139-91e8fad9978e"),
    unsplashImage("photo-1464822759023-fed622ff2c3b"),
    unsplashImage("photo-1518002054494-3a6f94352e9d"),
    unsplashImage("photo-1501785888041-af3ef285b470"),
    unsplashImage("photo-1483728642387-6c3bdd6c93e5")
  ],
  lachen: [
    unsplashImage("photo-1519681393784-d120267933ba"),
    unsplashImage("photo-1464822759023-fed622ff2c3b"),
    unsplashImage("photo-1483728642387-6c3bdd6c93e5"),
    unsplashImage("photo-1500530855697-b586d89ba3ee"),
    unsplashImage("photo-1506905925346-21bda4d32df4"),
    unsplashImage("photo-1518002054494-3a6f94352e9d"),
    unsplashImage("photo-1493246507139-91e8fad9978e"),
    unsplashImage("photo-1501785888041-af3ef285b470"),
    unsplashImage("photo-1500534314209-a25ddb2bd429"),
    unsplashImage("photo-1472214103451-9374bd1c798e")
  ],
  zeroPoint: [
    unsplashImage("photo-1493246507139-91e8fad9978e"),
    unsplashImage("photo-1464822759023-fed622ff2c3b"),
    unsplashImage("photo-1483728642387-6c3bdd6c93e5"),
    unsplashImage("photo-1506905925346-21bda4d32df4"),
    unsplashImage("photo-1519681393784-d120267933ba"),
    unsplashImage("photo-1519904981063-b0cf448d479e"),
    unsplashImage("photo-1518002054494-3a6f94352e9d"),
    unsplashImage("photo-1500534314209-a25ddb2bd429"),
    unsplashImage("photo-1501785888041-af3ef285b470"),
    unsplashImage("photo-1605640840605-14ac1855827b")
  ],
  darjeeling: [
    unsplashImage("photo-1576675466969-38eeae4b41f6"),
    unsplashImage("photo-1564890369478-c89ca6d9cde9"),
    unsplashImage("photo-1500534314209-a25ddb2bd429"),
    unsplashImage("photo-1506744038136-46273834b3fb"),
    unsplashImage("photo-1472214103451-9374bd1c798e"),
    unsplashImage("photo-1517824806704-9040b037703b"),
    unsplashImage("photo-1500530855697-b586d89ba3ee"),
    unsplashImage("photo-1506905925346-21bda4d32df4"),
    unsplashImage("photo-1464822759023-fed622ff2c3b"),
    unsplashImage("photo-1483728642387-6c3bdd6c93e5")
  ],
  tigerHill: [
    unsplashImage("photo-1500534314209-a25ddb2bd429"),
    unsplashImage("photo-1464822759023-fed622ff2c3b"),
    unsplashImage("photo-1506905925346-21bda4d32df4"),
    unsplashImage("photo-1483728642387-6c3bdd6c93e5"),
    unsplashImage("photo-1519681393784-d120267933ba"),
    unsplashImage("photo-1501785888041-af3ef285b470"),
    unsplashImage("photo-1472214103451-9374bd1c798e"),
    unsplashImage("photo-1493246507139-91e8fad9978e"),
    unsplashImage("photo-1519904981063-b0cf448d479e"),
    unsplashImage("photo-1518002054494-3a6f94352e9d")
  ],
  teaGardens: [
    unsplashImage("photo-1564890369478-c89ca6d9cde9"),
    unsplashImage("photo-1472214103451-9374bd1c798e"),
    unsplashImage("photo-1500530855697-b586d89ba3ee"),
    unsplashImage("photo-1441974231531-c6227db76b6e"),
    unsplashImage("photo-1506744038136-46273834b3fb"),
    unsplashImage("photo-1517824806704-9040b037703b"),
    unsplashImage("photo-1576675466969-38eeae4b41f6"),
    unsplashImage("photo-1500534314209-a25ddb2bd429"),
    unsplashImage("photo-1506905925346-21bda4d32df4"),
    unsplashImage("photo-1433086966358-54859d0ed716")
  ],
  mirik: [
    unsplashImage("photo-1517824806704-9040b037703b"),
    unsplashImage("photo-1470770841072-f978cf4d019e"),
    unsplashImage("photo-1506744038136-46273834b3fb"),
    unsplashImage("photo-1501785888041-af3ef285b470"),
    unsplashImage("photo-1441974231531-c6227db76b6e"),
    unsplashImage("photo-1500530855697-b586d89ba3ee"),
    unsplashImage("photo-1472214103451-9374bd1c798e"),
    unsplashImage("photo-1506905925346-21bda4d32df4"),
    unsplashImage("photo-1483728642387-6c3bdd6c93e5"),
    unsplashImage("photo-1433086966358-54859d0ed716")
  ]
};

export const destinations: Destination[] = [
  {
    name: "Gangtok",
    region: "Sikkim",
    description: "A lively capital base with cafes, monasteries, viewpoints, and easy access to east Sikkim.",
    detailIntro:
      "Gangtok is the easiest and most social base for a first Sikkim trip. It blends mountain views, cafe streets, monasteries, ropeway rides, local markets, and smooth access to east Sikkim routes.",
    bestFor: ["First-time Sikkim travelers", "Friends groups", "Families", "Couples", "Cafe and city-view lovers"],
    highlights: ["MG Marg evening walks", "Gangtok Ropeway", "Rumtek and Enchey monastery routes", "Tashi View Point", "Easy access to Tsomgo Lake and Nathula Pass"],
    travelTips: ["Keep Gangtok as the first base before higher-altitude routes.", "Match travelers by wake-up time because day trips often start early.", "Choose a group with similar food and cafe preferences for better evenings."],
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
    tags: ["City base", "Cafes", "Monasteries"],
    gallerySlots: 10,
    galleryImages: [
      "/destinations/gangtok/gangtok-01.jpg",
      "/destinations/gangtok/gangtok-02.jpg",
      "/destinations/gangtok/gangtok-03.jpg",
      "/destinations/gangtok/gangtok-04.jpg",
      "/destinations/gangtok/gangtok-05.jpg",
      "/destinations/gangtok/gangtok-06.jpg",
      "/destinations/gangtok/gangtok-07.jpg",
      "/destinations/gangtok/gangtok-08.jpg",
      "/destinations/gangtok/gangtok-09.jpg",
      "/destinations/gangtok/gangtok-10.jpg"
    ]
  },
  {
    name: "Nathula Pass",
    region: "Sikkim",
    description: "A dramatic high-altitude route for travelers who enjoy snow, borders, and mountain roads.",
    detailIntro:
      "Nathula Pass is a high-altitude border route known for snow, sharp mountain roads, and dramatic Himalayan scenery. It is best for travelers who enjoy early starts and crisp mountain weather.",
    bestFor: ["Adventure travelers", "Snow lovers", "Road-trip groups", "High-energy friends", "Photography-focused travelers"],
    highlights: ["High-altitude border experience", "Snowy mountain roads", "Baba Mandir route", "Permit-based travel planning", "Strong scenic photo stops"],
    travelTips: ["Permits and weather conditions decide access, so keep the plan flexible.", "Avoid grouping relaxed travelers with high-energy snow groups here.", "Carry warm layers even when Gangtok weather feels mild."],
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=900&q=80",
    tags: ["Snow", "High altitude", "Adventure"],
    gallerySlots: 10,
    galleryImages: destinationGalleries.nathulaPass
  },
  {
    name: "Tsomgo Lake",
    region: "Sikkim",
    description: "A glacial lake experience that works beautifully for families, couples, and photo lovers.",
    detailIntro:
      "Tsomgo Lake is a glacial lake surrounded by rugged slopes, prayer flags, and seasonal snow. It works well for travelers who want a scenic mountain day without losing comfort.",
    bestFor: ["Families", "Couples", "Photo lovers", "Balanced-energy groups", "First-time mountain travelers"],
    highlights: ["Glacial lake views", "Prayer flag scenery", "Snow-season landscapes", "Yak photo points", "Easy pairing with Nathula Pass when permits allow"],
    travelTips: ["Start early to avoid crowding and weather changes.", "Match groups by photography interest because people spend different time at viewpoints.", "Respect altitude comfort and do not rush senior or family groups."],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    tags: ["Lake", "Photos", "Scenic"],
    gallerySlots: 10,
    galleryImages: destinationGalleries.tsomgoLake
  },
  {
    name: "Lachung",
    region: "Sikkim",
    description: "A quiet valley stay for travelers who want mountain calm, waterfalls, and soft adventure.",
    detailIntro:
      "Lachung is a peaceful North Sikkim valley stay with rivers, waterfalls, mountain roads, and access to Yumthang Valley. It feels slower, cleaner, and more immersive than a quick city stop.",
    bestFor: ["Nature-first travelers", "Couples", "Soft adventure groups", "Calm friends groups", "Mountain photography travelers"],
    highlights: ["Yumthang Valley access", "Waterfalls and rivers", "Quiet village stays", "Snow-season routes", "Long scenic drives"],
    travelTips: ["Group people who are comfortable with longer drives.", "Keep music and rest preferences aligned for the taxi journey.", "Choose warmer stays during colder months."],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    tags: ["Valley", "Waterfalls", "Calm"],
    gallerySlots: 10,
    galleryImages: destinationGalleries.lachung
  },
  {
    name: "Lachen",
    region: "Sikkim",
    description: "A remote north Sikkim stop for guests who value raw landscapes and peaceful nights.",
    detailIntro:
      "Lachen is a remote North Sikkim base for raw Himalayan landscapes, quiet nights, and routes toward high-altitude lakes and valleys. It suits travelers who prefer nature over nightlife.",
    bestFor: ["Peaceful travelers", "Nature photographers", "Adventure groups", "Remote-location explorers", "Slow-travel couples"],
    highlights: ["Remote village atmosphere", "North Sikkim mountain views", "Quiet homestay-style stays", "Early-morning routes", "Raw landscape photography"],
    travelTips: ["Set expectations clearly because comfort is simpler than Gangtok.", "Match travelers by patience for long roads and limited facilities.", "Keep buffer time for weather and route restrictions."],
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    tags: ["Remote", "North Sikkim", "Nature"],
    gallerySlots: 10,
    galleryImages: destinationGalleries.lachen
  },
  {
    name: "Zero Point",
    region: "Sikkim",
    description: "A snow-forward experience for energetic groups comfortable with early starts and long drives.",
    detailIntro:
      "Zero Point is a high-energy snow route near the end of accessible North Sikkim roads. It is dramatic, cold, remote, and best enjoyed by groups who are excited for the journey as much as the destination.",
    bestFor: ["Snow lovers", "Adventure clubs", "Gen Z groups", "High-energy travelers", "Road-trip photographers"],
    highlights: ["Snow landscapes", "Remote high-altitude views", "Dramatic mountain roads", "Adventure photo stops", "Yumthang route combination"],
    travelTips: ["This is not ideal for very relaxed travelers or people avoiding long drives.", "Match by wake-up time and adventure level before booking.", "Weather can change quickly, so keep plans flexible."],
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
    tags: ["Snow", "Adventure", "Long drive"],
    gallerySlots: 10,
    galleryImages: destinationGalleries.zeroPoint
  },
  {
    name: "Darjeeling",
    region: "Darjeeling",
    description: "Tea, toy train charm, heritage hotels, cafes, and wide Kanchenjunga views.",
    detailIntro:
      "Darjeeling is a heritage hill town built around tea, toy train charm, cafes, viewpoints, and Kanchenjunga views. It is a strong fit for travelers who want culture and comfort with mountain scenery.",
    bestFor: ["Couples", "Families", "Cafe lovers", "Senior comfort groups", "Heritage and tea travelers"],
    highlights: ["Mall Road and cafes", "Toy Train experience", "Tea estate visits", "Batasia Loop", "Kanchenjunga viewpoints"],
    travelTips: ["Match groups by walking comfort because hill-town movement can be steep.", "Cafe and shopping preferences matter here.", "Keep sunrise plans optional for relaxed travelers."],
    image: "https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?auto=format&fit=crop&w=900&q=80",
    tags: ["Tea town", "Heritage", "Cafes"],
    gallerySlots: 10,
    galleryImages: destinationGalleries.darjeeling
  },
  {
    name: "Tiger Hill",
    region: "Darjeeling",
    description: "A sunrise classic for travelers who do not mind waking early for a serious view.",
    detailIntro:
      "Tiger Hill is Darjeeling's classic sunrise viewpoint, famous for golden light on Kanchenjunga when the sky is clear. It rewards travelers who are happy to wake up before dawn.",
    bestFor: ["Sunrise seekers", "Photographers", "Couples", "Nature lovers", "Early-riser groups"],
    highlights: ["Kanchenjunga sunrise views", "Early morning mountain atmosphere", "Photo-first experience", "Classic Darjeeling viewpoint", "Easy add-on with local sightseeing"],
    travelTips: ["Only group people who are comfortable waking very early.", "Weather decides visibility, so expectations should be realistic.", "Carry warm clothes for the pre-sunrise wait."],
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    tags: ["Sunrise", "Viewpoint", "Early start"],
    gallerySlots: 10,
    galleryImages: destinationGalleries.tigerHill
  },
  {
    name: "Tea Gardens",
    region: "Darjeeling",
    description: "Gentle walks, green landscapes, premium photos, and relaxed conversations.",
    detailIntro:
      "Darjeeling's tea gardens are calm, green, and visually premium. They are perfect for slow walks, thoughtful photos, tea tasting, and relaxed group conversations.",
    bestFor: ["Couples", "Families", "Senior travelers", "Luxury travelers", "Slow-paced photo lovers"],
    highlights: ["Tea estate landscapes", "Green hill views", "Tea tasting experiences", "Premium photo locations", "Gentle walking routes"],
    travelTips: ["This works best with relaxed or balanced-energy travelers.", "Avoid pairing people who want rush-heavy sightseeing with slow tea-estate groups.", "Morning and late afternoon light gives better photos."],
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=80",
    tags: ["Tea", "Walks", "Relaxed"],
    gallerySlots: 10,
    galleryImages: destinationGalleries.teaGardens
  },
  {
    name: "Mirik",
    region: "Darjeeling",
    description: "A softer lakeside escape with easy pacing for families, couples, and senior groups.",
    detailIntro:
      "Mirik is a gentle lakeside escape near Darjeeling with calm water views, pine surroundings, and easier pacing. It is ideal when travelers want a softer day instead of a packed route.",
    bestFor: ["Families", "Senior comfort groups", "Couples", "Relaxed travelers", "Easy-day groups"],
    highlights: ["Mirik Lake views", "Boating-style leisure", "Pine and hill scenery", "Soft-paced day trip", "Family-friendly atmosphere"],
    travelTips: ["Choose Mirik for groups that value comfort and conversation.", "Keep activity expectations light and scenic.", "It pairs well with tea gardens for a relaxed day plan."],
    image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=900&q=80",
    tags: ["Lake", "Easy pace", "Family"],
    gallerySlots: 10,
    galleryImages: destinationGalleries.mirik
  }
];

export const groupPackages: GroupPackage[] = [
  {
    title: "Gen Z Sikkim Adventure Trip",
    destination: "Gangtok, Tsomgo Lake, Nathula Pass",
    duration: "5 days / 4 nights",
    category: "Gen Z Squad",
    price: "Starting from INR 18,999",
    badge: "94% vibe match",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Romantic Darjeeling Couple Escape",
    destination: "Darjeeling, Tiger Hill, Tea Gardens",
    duration: "4 days / 3 nights",
    category: "Couples Escape",
    price: "Starting from INR 22,499",
    badge: "Privacy-first",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Family Friendly Gangtok Tour",
    destination: "Gangtok, Tsomgo Lake, local sightseeing",
    duration: "6 days / 5 nights",
    category: "Family Explorer",
    price: "Starting from INR 24,999",
    badge: "Easy pace",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Women Only Sikkim Group Trip",
    destination: "Gangtok, Lachung, Yumthang Valley",
    duration: "6 days / 5 nights",
    category: "Women-Only Trips",
    price: "Starting from INR 26,999",
    badge: "Verified group",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Senior Comfort Darjeeling Tour",
    destination: "Darjeeling, Mirik, Tea Gardens",
    duration: "5 days / 4 nights",
    category: "Senior Comfort",
    price: "Starting from INR 20,999",
    badge: "Comfort route",
    image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Luxury North-East Escape",
    destination: "Gangtok, Pelling, Darjeeling",
    duration: "7 days / 6 nights",
    category: "Luxury Travelers",
    price: "Starting from INR 54,999",
    badge: "Premium match",
    image: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=900&q=80"
  }
];

export const whyChooseUs = [
  { title: "Compatibility Score", copy: "Match travelers by vibe, personality, budget, pace, privacy, and interests.", icon: Sparkles },
  { title: "Verified Travelers", copy: "Profiles, expectations, and trip intent are checked before grouping.", icon: BadgeCheck },
  { title: "Safe Groups", copy: "Women-only preferences, age ranges, and group type filters reduce uncomfortable matches.", icon: ShieldCheck },
  { title: "Partner Agencies", copy: "Local taxi owners, hotels, guides, and agencies power the ground experience.", icon: Mountain },
  { title: "Better Experience", copy: "Music, food, wake-up time, and activity choices are aligned before the trip.", icon: Heart },
  { title: "Group Chat Before Trip", copy: "Travelers can connect, ask questions, and set expectations before departure.", icon: Camera }
];

export const testimonials = [
  {
    name: "Aarav S.",
    role: "Solo traveler",
    quote: "I wanted adventure but not a random taxi group. The match felt natural from the first call."
  },
  {
    name: "Priya and Rohan",
    role: "Couple travelers",
    quote: "The couple-focused group gave us privacy and still kept the trip social. That balance matters."
  },
  {
    name: "Meera K.",
    role: "Family traveler",
    quote: "Our group had similar pace and food preferences. The kids were comfortable and nobody felt rushed."
  }
];

export const howItWorks = [
  "Create your travel profile",
  "Take compatibility quiz",
  "Get matched with similar travelers",
  "Book verified group package",
  "Enjoy the trip"
];
