import { formatPrice, discountPercent } from "@/lib/format";
import { cn } from "@/lib/format";

interface PriceTagProps {
  price: number;
  compareAtPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceTag({
  price,
  compareAtPrice,
  currency = "USD",
  size = "md",
  className,
}: PriceTagProps) {
  const off = discountPercent(price, compareAtPrice);
  const sizes = {
    sm: "text-sm gap-1",
    md: "text-base gap-1.5",
    lg: "text-2xl gap-2",
  };

  return (
    <span className={cn("relative inline-flex items-center", sizes[size], className)}>
      <span className="relative inline-flex items-center rounded-[4px] border border-ink/15 bg-paper pl-3 pr-2 py-0.5">
        {/* punched notch */}
        <span className="absolute -left-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-canvas border border-ink/15" />
        <span className="font-mono font-medium text-ink tabular-nums">
          {formatPrice(price, currency)}
        </span>
      </span>
      {off > 0 && compareAtPrice && (
        <>
          <span className="font-mono text-muted line-through tabular-nums text-[0.85em]">
            {formatPrice(compareAtPrice, currency)}
          </span>
          <span className="rounded-full bg-pine/10 px-1.5 py-0.5 text-[0.7em] font-medium text-pine">
            −{off}%
          </span>
        </>
      )}
    </span>
  );
}
