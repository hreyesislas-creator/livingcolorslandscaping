export const brand = {
  name: "Living Colors Landscape",
  tagline: "Premium outdoor transformations.",
  phone: "(323) 854-5237",
  email: "hello@livingcolorslandscape.com",
  cities: [
    "Beverly Hills",
    "Bel Air",
    "Brentwood",
    "Pacific Palisades",
    "Malibu",
    "Santa Monica",
    "Manhattan Beach",
    "Palos Verdes Estates",
    "Rancho Palos Verdes",
    "Calabasas",
    "Hidden Hills",
    "Thousand Oaks",
    "Westlake Village",
    "Pasadena",
    "San Marino",
  ],
  stats: [
    { value: "18+", label: "Years designing" },
    { value: "1,200+", label: "Properties transformed" },
    { value: "4.9★", label: "Google rating" },
    { value: "100%", label: "Licensed & insured" },
  ],
};

export const services = [
  {
    slug: "landscape-design",
    title: "Landscape Design",
    blurb: "Bespoke outdoor environments engineered around how you live.",
    image: "/images/services/landscape-design.jpg",
    tag: "Signature",
  },
  {
    slug: "artificial-turf",
    title: "Artificial Turf",
    blurb: "Showroom-grade turf with photo-real blades, year-round perfect.",
    image: "/images/services/artificial-turf.jpg",
    tag: "Low maintenance",
  },
  {
    slug: "irrigation",
    title: "Smart Irrigation",
    blurb: "Weather-aware systems that cut water bills up to 50%.",
    image: "/images/services/smart-irrigation.jpg",
    tag: "Efficient",
  },
  {
    slug: "outdoor-lighting",
    title: "Outdoor Lighting",
    blurb: "Architectural lighting that makes your home glow after sunset.",
    image: "/images/services/outdoor-lighting.jpg",
    tag: "Cinematic",
  },
  {
    slug: "hardscape",
    title: "Hardscape",
    blurb: "Walls, fire features and structural elements built to last decades.",
    image: "/images/services/hardscape.jpg",
    tag: "Architectural",
  },
  {
    slug: "pavers",
    title: "Pavers",
    blurb: "Designer driveways, patios and walkways with flawless installs.",
    image: "/images/services/pavers.jpg",
    tag: "Premium",
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    blurb: "White-glove monthly care that keeps your property pristine.",
    image: "/images/services/maintenance.jpg",
    tag: "Recurring",
  },
  {
    slug: "outdoor-living",
    title: "Outdoor Living",
    blurb: "Pergolas, kitchens, fire features, lounges — rooms without walls.",
    image: "/images/services/outdoor-living.jpg",
    tag: "Lifestyle",
  },
  {
    slug: "custom",
    title: "Custom Projects",
    blurb: "Putting greens, water features, pools surrounds — your wildest ideas, built.",
    image: "/images/services/custom-projects.jpg",
    tag: "Signature",
  },
] as const;

export interface TransformationProject {
  slug: string;
  title: string;
  location: string;
  services: string[];
  before: string;
  after: string;
}

export const beforeAfter: TransformationProject[] = [
  {
    slug: "project-01",
    title: "Beverly Hills Estate",
    location: "Beverly Hills, CA",
    services: [
      "Pool surround",
      "Premium turf",
      "Architectural lighting",
      "Smart irrigation",
    ],
    before: "/images/before-after/project-01/before.jpg",
    after: "/images/before-after/project-01/after.jpg",
  },
  {
    slug: "project-02",
    title: "Modern Palisades Frontyard",
    location: "Pacific Palisades, CA",
    services: [
      "Desert design",
      "CorTen edging",
      "Path lighting",
      "Modern entry pavers",
    ],
    before: "/images/before-after/project-02/before.jpg",
    after: "/images/before-after/project-02/after.jpg",
  },
  {
    slug: "project-03",
    title: "Malibu Resort Backyard",
    location: "Malibu, CA",
    services: [
      "Travertine pavers",
      "Putting green",
      "Fire feature",
      "Designer turf lounge",
    ],
    before: "/images/before-after/project-03/before.jpg",
    after: "/images/before-after/project-03/after.jpg",
  },
];

export const process = [
  {
    step: "01",
    title: "Project Discovery",
    body: "Share your vision through our guided intake. A senior specialist personally reviews every detail.",
    image: "/images/process/step-01.jpg",
    duration: "Day 0 – 1",
  },
  {
    step: "02",
    title: "Design & Planning",
    body: "On-site walkthrough, precise measurements, material selection and a tailored plan with transparent investment.",
    image: "/images/process/step-02.jpg",
    duration: "Week 1 – 2",
  },
  {
    step: "03",
    title: "Build & Installation",
    body: "Our crews execute with daily progress updates, photo reports and a meticulously clean job site every night.",
    image: "/images/process/step-03.jpg",
    duration: "Week 2 – 6",
  },
  {
    step: "04",
    title: "Final Transformation",
    body: "Walkthrough, professional photography, 10-year workmanship warranty and a maintenance plan if you want it.",
    image: "/images/process/step-04.jpg",
    duration: "Reveal day",
  },
];

export const testimonials = [
  {
    quote:
      "It feels like a private resort. Every detail of the design and the install was a level above what we expected.",
    name: "Sarah & Mark T.",
    location: "Beverly Hills",
  },
  {
    quote:
      "From the first quote screen to the final walkthrough, this is the most organized company we've ever worked with.",
    name: "Daniel R.",
    location: "Pacific Palisades",
  },
  {
    quote:
      "Our front yard is now the most photographed house on the street. Worth every dollar.",
    name: "Priya M.",
    location: "San Marino",
  },
  {
    quote:
      "They turned a dirt lot into something cinematic. The lighting at night is unreal.",
    name: "James K.",
    location: "Calabasas",
  },
];

export const faqs = [
  {
    q: "How fast will I hear back after submitting my project?",
    a: "Most quote requests get a response from a real specialist within one business day, often the same day. Urgent projects can be flagged in the form.",
  },
  {
    q: "Do you handle both residential and commercial work?",
    a: "Yes. We work with private homes, HOAs, multi-family communities and select commercial properties across Greater Los Angeles.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Fully licensed, bonded and insured. Documentation is shared before any work begins.",
  },
  {
    q: "What does a typical project investment look like?",
    a: "Projects range from focused refreshes to full estate transformations. After your quick intake, we provide transparent itemized pricing tailored to your scope.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes. Flexible monthly options are available for qualifying projects and we'll walk you through them during your consultation.",
  },
];
