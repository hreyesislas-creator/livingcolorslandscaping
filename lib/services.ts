import servicesData from "./data/services.json";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceDetail {
  title: string;
  body: string;
}

export interface ServiceContent {
  slug: string;
  name: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  heroSubhead: string;
  intro: string[];
  offerings: ServiceDetail[];
  benefits: ServiceDetail[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
  image: string;
}

export const services = servicesData as ServiceContent[];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): ServiceContent | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesBySlugs(slugs: string[]): ServiceContent[] {
  return slugs
    .map((slug) => getService(slug))
    .filter((s): s is ServiceContent => Boolean(s));
}
