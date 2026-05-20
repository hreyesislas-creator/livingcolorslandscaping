export const brand = {
  name: "Living Colors Landscape",
  tagline: "Premium outdoor transformations.",
  phone: "(602) 555-0188",
  email: "hello@livingcolorslandscape.com",
  cities: [
    "Scottsdale",
    "Paradise Valley",
    "Phoenix",
    "Arcadia",
    "Mesa",
    "Chandler",
    "Gilbert",
    "Tempe",
    "Cave Creek",
    "Fountain Hills",
    "Carefree",
    "North Phoenix",
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
    image:
      "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1600&q=80",
    tag: "Signature",
  },
  {
    slug: "artificial-turf",
    title: "Artificial Turf",
    blurb: "Showroom-grade turf with photo-real blades, year-round perfect.",
    image:
      "https://images.unsplash.com/photo-1592420114407-9c2d34cf18c6?auto=format&fit=crop&w=1600&q=80",
    tag: "Low maintenance",
  },
  {
    slug: "irrigation",
    title: "Smart Irrigation",
    blurb: "Weather-aware systems that cut water bills up to 50%.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80",
    tag: "Efficient",
  },
  {
    slug: "outdoor-lighting",
    title: "Outdoor Lighting",
    blurb: "Architectural lighting that makes your home glow after sunset.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    tag: "Cinematic",
  },
  {
    slug: "hardscape",
    title: "Hardscape",
    blurb: "Walls, fire features and structural elements built to last decades.",
    image:
      "https://images.unsplash.com/photo-1605146768851-eda79da39897?auto=format&fit=crop&w=1600&q=80",
    tag: "Architectural",
  },
  {
    slug: "pavers",
    title: "Pavers",
    blurb: "Designer driveways, patios and walkways with flawless installs.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
    tag: "Premium",
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    blurb: "White-glove monthly care that keeps your property pristine.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
    tag: "Recurring",
  },
  {
    slug: "outdoor-living",
    title: "Outdoor Living",
    blurb: "Pergolas, kitchens, fire features, lounges — rooms without walls.",
    image:
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1600&q=80",
    tag: "Lifestyle",
  },
  {
    slug: "custom",
    title: "Custom Projects",
    blurb: "Putting greens, water features, pools surrounds — your wildest ideas, built.",
    image:
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1600&q=80",
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
    title: "Paradise Valley Estate",
    location: "Paradise Valley, AZ",
    services: [
      "Pool surround",
      "Premium turf",
      "Architectural lighting",
      "Smart irrigation",
    ],
    before: "/before-after/project-01/before.jpg",
    after: "/before-after/project-01/after.jpg",
  },
  {
    slug: "project-02",
    title: "Modern Arcadia Frontyard",
    location: "Arcadia, AZ",
    services: [
      "Desert design",
      "CorTen edging",
      "Path lighting",
      "Modern entry pavers",
    ],
    before: "/before-after/project-02/before.jpg",
    after: "/before-after/project-02/after.jpg",
  },
  {
    slug: "project-03",
    title: "Scottsdale Resort Backyard",
    location: "Scottsdale, AZ",
    services: [
      "Travertine pavers",
      "Putting green",
      "Fire feature",
      "Designer turf lounge",
    ],
    before: "/before-after/project-03/before.jpg",
    after: "/before-after/project-03/after.jpg",
  },
];

export const process = [
  {
    step: "01",
    title: "Project Discovery",
    body: "Share your vision through our guided intake. A senior specialist personally reviews every detail.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    duration: "Day 0 – 1",
  },
  {
    step: "02",
    title: "Design & Planning",
    body: "On-site walkthrough, precise measurements, material selection and a tailored plan with transparent investment.",
    image:
      "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1600&q=80",
    duration: "Week 1 – 2",
  },
  {
    step: "03",
    title: "Build & Installation",
    body: "Our crews execute with daily progress updates, photo reports and a meticulously clean job site every night.",
    image:
      "https://images.unsplash.com/photo-1605146768851-eda79da39897?auto=format&fit=crop&w=1600&q=80",
    duration: "Week 2 – 6",
  },
  {
    step: "04",
    title: "Final Transformation",
    body: "Walkthrough, professional photography, 10-year workmanship warranty and a maintenance plan if you want it.",
    image:
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1600&q=80",
    duration: "Reveal day",
  },
];

export const testimonials = [
  {
    quote:
      "It feels like a private resort. Every detail of the design and the install was a level above what we expected.",
    name: "Sarah & Mark T.",
    location: "Paradise Valley",
  },
  {
    quote:
      "From the first quote screen to the final walkthrough, this is the most organized company we've ever worked with.",
    name: "Daniel R.",
    location: "Scottsdale",
  },
  {
    quote:
      "Our front yard is now the most photographed house on the street. Worth every dollar.",
    name: "Priya M.",
    location: "Arcadia",
  },
  {
    quote:
      "They turned a dirt lot into something cinematic. The lighting at night is unreal.",
    name: "James K.",
    location: "Cave Creek",
  },
];

export const faqs = [
  {
    q: "How fast will I hear back after submitting my project?",
    a: "Most quote requests get a response from a real specialist within one business day, often the same day. Urgent projects can be flagged in the form.",
  },
  {
    q: "Do you handle both residential and commercial work?",
    a: "Yes. We work with private homes, HOAs, multi-family communities and select commercial properties across the Valley.",
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
