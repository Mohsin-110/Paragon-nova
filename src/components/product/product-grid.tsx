import { Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/format";

export function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 py-20 text-center">
        <p className="font-serif text-lg text-ink">No products match those filters</p>
        <p className="mt-1 text-sm text-muted">Try widening your search.</p>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
