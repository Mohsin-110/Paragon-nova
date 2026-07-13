import { ReviewItem } from "@/lib/types";
import { StarRating, Badge } from "@/components/ui/badge";

export function Reviews({
  reviews,
  rating,
  reviewCount,
}: {
  reviews: ReviewItem[];
  rating: number;
  reviewCount: number;
}) {
  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    return { star, pct: reviews.length ? (count / reviews.length) * 100 : 0 };
  });

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
      <div>
        <p className="font-serif text-4xl text-ink">{rating.toFixed(1)}</p>
        <StarRating rating={rating} size={16} />
        <p className="mt-1 text-sm text-muted">Based on {reviewCount} reviews</p>
        <div className="mt-5 flex flex-col gap-1.5">
          {breakdown.map((b) => (
            <div key={b.star} className="flex items-center gap-2 text-xs text-muted">
              <span className="w-8">{b.star} star</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas">
                <div className="h-full bg-brass" style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col divide-y divide-ink/8">
        {reviews.map((r) => (
          <div key={r.id} className="py-5 first:pt-0">
            <div className="flex items-center gap-2">
              <StarRating rating={r.rating} size={13} />
              {r.verified && <Badge tone="pine">Verified purchase</Badge>}
            </div>
            <p className="mt-2 text-sm font-medium text-ink">{r.title}</p>
            <p className="mt-1 text-sm text-muted">{r.body}</p>
            <p className="mt-2 text-xs text-muted/70">
              {r.author} · {new Date(r.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
