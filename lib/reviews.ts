/**
 * PHASE 2 EXTENSION POINT — Reviews.
 *
 * Populate `reviews` with real, verifiable customer reviews. When at least one
 * exists, `getAggregateRating()` returns a value and LocalBusiness JSON-LD
 * automatically includes an AggregateRating. While empty, NO rating is emitted
 * (never fabricate ratings — it violates Google's structured-data policy).
 */
export interface Review {
  author: string;
  rating: number; // 1–5
  body: string;
  date: string; // ISO date
  city?: string;
}

export const reviews: Review[] = [];

export function getAggregateRating():
  | { ratingValue: number; reviewCount: number }
  | undefined {
  if (reviews.length === 0) return undefined;
  const ratingValue =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return {
    ratingValue: Number(ratingValue.toFixed(1)),
    reviewCount: reviews.length,
  };
}
