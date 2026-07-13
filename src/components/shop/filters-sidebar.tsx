"use client";

import { categories, brands } from "@/lib/mock-data";
import { cn } from "@/lib/format";

export interface ShopFilters {
  category: string | null;
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
}

export function FiltersSidebar({
  filters,
  onChange,
}: {
  filters: ShopFilters;
  onChange: (next: ShopFilters) => void;
}) {
  return (
    <aside className="flex flex-col gap-8">
      <div>
        <h3 className="mb-3 text-sm font-medium text-ink">Category</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onChange({ ...filters, category: null })}
            className={cn(
              "text-left text-sm",
              !filters.category ? "font-medium text-ink" : "text-muted hover:text-ink"
            )}
          >
            All categories
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => onChange({ ...filters, category: c.slug })}
              className={cn(
                "text-left text-sm",
                filters.category === c.slug
                  ? "font-medium text-ink"
                  : "text-muted hover:text-ink"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-ink">Price</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(e) =>
              onChange({ ...filters, minPrice: Number(e.target.value) || 0 })
            }
            className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brass"
          />
          <span className="text-muted">–</span>
          <input
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({ ...filters, maxPrice: Number(e.target.value) || 0 })
            }
            className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brass"
          />
        </div>
        <input
          type="range"
          min={0}
          max={300}
          step={5}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="mt-3 w-full accent-brass"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-ink">Rating</h3>
        <div className="flex flex-col gap-2">
          {[4, 3, 0].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...filters, minRating: r })}
              className={cn(
                "text-left text-sm",
                filters.minRating === r
                  ? "font-medium text-ink"
                  : "text-muted hover:text-ink"
              )}
            >
              {r === 0 ? "Any rating" : `${r}+ stars`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-ink">Brand</h3>
        <div className="flex flex-col gap-2">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={filters.brands.includes(b)}
                onChange={() =>
                  onChange({
                    ...filters,
                    brands: filters.brands.includes(b)
                      ? filters.brands.filter((x) => x !== b)
                      : [...filters.brands, b],
                  })
                }
                className="h-4 w-4 rounded border-ink/25 accent-ink"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-ink">Availability</h3>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() =>
              onChange({ ...filters, inStockOnly: !filters.inStockOnly })
            }
            className="h-4 w-4 rounded border-ink/25 accent-ink"
          />
          In stock only
        </label>
      </div>
    </aside>
  );
}
