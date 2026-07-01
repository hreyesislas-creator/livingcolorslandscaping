# SEO Architecture & Phase 2 Roadmap

The site is data-driven. Adding content later requires **no refactor** — you add
a data entry (or a data file + one template) and routing, sitemap, schema and
internal linking update automatically.

## How the current architecture works

| Content type | Data source | Template | Route |
| --- | --- | --- | --- |
| Services (9) | `lib/data/services.json` → `lib/services.ts` | `app/services/[slug]/page.tsx` | `/services/[slug]` |
| Cities (15) | `lib/data/cities-*.json` → `lib/cities.ts` | `app/service-areas/[city]/page.tsx` | `/service-areas/[city]` |
| Project types (10) | `lib/data/project-types.json` → `lib/project-types.ts` | `app/project-types/[slug]/page.tsx` | `/project-types/[slug]` |

Shared SEO: `lib/seo.ts` (`buildMetadata`, `organizationSchema`, `localBusinessSchema`,
`serviceSchema`, `faqPageSchema`, `breadcrumbSchema`). Sitemap: `app/sitemap.ts`.
Robots: `app/robots.ts`. Canonical base: `NEXT_PUBLIC_SITE_URL`.

## Phase 2 extension points (prepared, NOT implemented)

### 1. Additional cities
- Add objects to a new `lib/data/cities-4.json` and spread it into `lib/cities.ts`.
- `generateStaticParams`, sitemap, schema and internal links pick them up automatically.
- Optionally add them to a `cityRegions` group in `lib/cities.ts`.

### 2. Reviews  ✅ hook already wired
- `lib/reviews.ts` exports a typed `reviews: Review[]` (currently empty) and
  `getAggregateRating()`.
- `localBusinessSchema()` already conditionally emits `AggregateRating` **only when
  real reviews exist** — populate `reviews` with verifiable entries to activate it.
- Never fabricate ratings (Google structured-data policy).
- Future: a `Review` JSON-LD per testimonial + a `/reviews` page.

### 3. Case Studies
- Suggested: `lib/data/case-studies.json` → `lib/case-studies.ts`, template at
  `app/work/[slug]/page.tsx`, route `/work/[slug]`, hub `/work`.
- Schema: `CreativeWork` / `Article` + `ImageObject`. Link from city & service pages
  ("recent projects in {city}").

### 4. Blog / Guides
- Suggested: MDX or `lib/data/posts` → `app/guides/[slug]/page.tsx`, hub `/guides`.
- Topics that build topical authority: fire-wise landscaping, drought-tolerant design,
  HOA approval, coastal salt-air planting, pool-surround materials.
- Schema: `Article` + `BreadcrumbList`. Cross-link to the relevant project-type and
  service pages.

## Launch checklist
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain in Vercel.
- [ ] Add branding assets (`logo`, `favicon`, `apple-touch-icon`, `open-graph.jpg`).
- [ ] Submit `sitemap.xml` in Google Search Console; validate with the Rich Results Test.
- [ ] Create / connect Google Business Profile and add `sameAs` links in `organizationSchema`.
- [ ] Add a physical address to `localBusinessSchema()` if one becomes available.
