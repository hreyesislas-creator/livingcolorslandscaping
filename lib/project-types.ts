import projectTypesData from "./data/project-types.json";

export interface ProjectTypeFaq {
  q: string;
  a: string;
}

export interface ProjectTypeBenefit {
  title: string;
  body: string;
}

export interface ProjectType {
  slug: string;
  name: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  heroSubhead: string;
  intro: string[];
  benefits: ProjectTypeBenefit[];
  relatedServiceSlugs: string[];
  relatedCitySlugs: string[];
  faqs: ProjectTypeFaq[];
  image: string;
}

export const projectTypes = projectTypesData as ProjectType[];

export const projectTypeSlugs = projectTypes.map((p) => p.slug);

export function getProjectType(slug: string): ProjectType | undefined {
  return projectTypes.find((p) => p.slug === slug);
}
