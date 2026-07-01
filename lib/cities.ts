import citiesData1 from "./data/cities-1.json";
import citiesData2 from "./data/cities-2.json";
import citiesData3 from "./data/cities-3.json";

export interface CityFaq {
  q: string;
  a: string;
}

export interface CityDetail {
  title: string;
  body: string;
}

export interface CityContent {
  slug: string;
  name: string;
  county: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  heroSubhead: string;
  intro: string[];
  localContext: CityDetail[];
  neighborhoods: string[];
  topServiceSlugs: string[];
  faqs: CityFaq[];
  nearbySlugs: string[];
}

export const cities = [
  ...citiesData1,
  ...citiesData2,
  ...citiesData3,
] as CityContent[];

export const citySlugs = cities.map((c) => c.slug);

export function getCity(slug: string): CityContent | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCitiesBySlugs(slugs: string[]): CityContent[] {
  return slugs
    .map((slug) => getCity(slug))
    .filter((c): c is CityContent => Boolean(c));
}

export interface CityRegion {
  name: string;
  blurb: string;
  citySlugs: string[];
}

/** Cities grouped by real geographic region for the Areas We Serve hub. */
export const cityRegions: CityRegion[] = [
  {
    name: "The Westside",
    blurb:
      "Estate design and privacy landscaping from the Beverly Hills flats to the canyons of Bel Air and Brentwood.",
    citySlugs: [
      "beverly-hills",
      "bel-air",
      "brentwood",
      "pacific-palisades",
      "santa-monica",
    ],
  },
  {
    name: "Coast & Beach Cities",
    blurb:
      "Salt-air-tolerant planting, wind exposure and ocean-view framing along the coast.",
    citySlugs: ["malibu", "manhattan-beach"],
  },
  {
    name: "Palos Verdes Peninsula",
    blurb:
      "Bluff-top gardens and slope-stable hardscape with sweeping Pacific views.",
    citySlugs: ["palos-verdes-estates", "rancho-palos-verdes"],
  },
  {
    name: "Conejo Valley & the Hills",
    blurb:
      "Fire-wise, HOA-compliant estate landscapes across the oak-studded hills and gated enclaves.",
    citySlugs: [
      "calabasas",
      "hidden-hills",
      "thousand-oaks",
      "westlake-village",
    ],
  },
  {
    name: "San Gabriel Valley",
    blurb:
      "Heritage-tree stewardship and historic-estate gardens beneath the San Gabriel Mountains.",
    citySlugs: ["pasadena", "san-marino"],
  },
];

