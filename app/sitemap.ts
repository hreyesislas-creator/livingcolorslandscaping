import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { services } from "@/lib/services";
import { cities } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/services", 0.9, "monthly"),
    entry("/service-areas", 0.8, "monthly"),
    entry("/quote", 0.6, "monthly"),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.8, "monthly")),
    ...cities.map((c) => entry(`/service-areas/${c.slug}`, 0.7, "monthly")),
  ];
}
