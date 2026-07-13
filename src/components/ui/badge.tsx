import { cn } from "@/lib/format";
import { FiStar } from "react-icons/fi";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brass" | "pine" | "ink";
  className?: string;
}) {
  const tones = {
    neutral: "bg-canvas text-muted border-ink/10",
    brass: "bg-brass/15 text-brass-dark border-brass/30",
    pine: "bg-pine/10 text-pine border-pine/25",
    ink: "bg-ink text-paper border-ink",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StarRating({
  rating,
  reviewCount,
  size = 14,
}: {
  rating: number;
  reviewCount?: number;
  size?: number;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted">
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <FiStar
              key={i}
              size={size}
              className={filled ? "fill-brass text-brass" : "text-ink/15"}
            />
          );
        })}
      </span>
      <span className="text-xs tabular-nums">
        {rating.toFixed(1)}
        {reviewCount !== undefined && ` (${reviewCount})`}
      </span>
    </span>
  );
}
