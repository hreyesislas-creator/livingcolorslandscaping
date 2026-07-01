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
