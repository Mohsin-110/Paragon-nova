"use client";

import { FiGrid, FiList } from "react-icons/fi";
import { cn } from "@/lib/format";

export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

export function SortBar({
  count,
  sort,
  onSortChange,
  view,
  onViewChange,
}: {
  count: number;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-ink/8 pb-4">
      <p className="text-sm text-muted">{count} results</p>
      <div className="flex items-center gap-3">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-brass"
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="rating">Highest rated</option>
          <option value="newest">Newest</option>
        </select>
        <div className="flex items-center gap-1 rounded-full border border-ink/15 p-1">
          <button
            onClick={() => onViewChange("grid")}
            aria-label="Grid view"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full",
              view === "grid" && "bg-ink text-paper"
            )}
          >
            <FiGrid size={14} />
          </button>
          <button
            onClick={() => onViewChange("list")}
            aria-label="List view"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full",
              view === "list" && "bg-ink text-paper"
            )}
          >
            <FiList size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
