"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiFilter, FiX } from "react-icons/fi";
import { products } from "@/lib/mock-data";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductListRow } from "@/components/shop/product-list-row";
import { FiltersSidebar, ShopFilters } from "@/components/shop/filters-sidebar";
import { SortBar, SortOption } from "@/components/shop/sort-bar";
import { Pagination } from "@/components/shop/pagination";

const PAGE_SIZE = 8;

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialFilter = searchParams.get("filter");

  const [filters, setFilters] = useState<ShopFilters>({
    category: initialCategory,
    brands: [],
    minPrice: 0,
    maxPrice: 300,
    minRating: 0,
    inStockOnly: false,
  });
  const [sort, setSort] = useState<SortOption>("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand))
        return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      if (p.rating < filters.minRating) return false;
      if (filters.inStockOnly && p.stock <= 0) return false;
      if (initialFilter === "flash-sale" && !p.isFlashSale) return false;
      if (
        query &&
        !`${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
    }
    return result;
  }, [filters, sort, query, initialFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-ink">Shop</h1>
        <p className="mt-1 text-sm text-muted">
          {filters.category
            ? `Browsing ${filters.category}`
            : "All categories, curated"}
        </p>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search products or brands…"
          className="mt-4 w-full max-w-md rounded-full border border-ink/15 px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brass"
        />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <div className="hidden lg:block">
          <FiltersSidebar
            filters={filters}
            onChange={(f) => {
              setFilters(f);
              setPage(1);
            }}
          />
        </div>

        <div>
          <div className="mb-4 lg:hidden">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm"
            >
              <FiFilter size={14} /> Filters
            </button>
          </div>

          <SortBar
            count={filtered.length}
            sort={sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
          />

          {view === "grid" ? (
            <ProductGrid products={pageItems} />
          ) : (
            <div className="flex flex-col gap-4">
              {pageItems.map((p) => (
                <ProductListRow key={p.id} product={p} />
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-paper p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-lg text-ink">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close">
                <FiX size={20} />
              </button>
            </div>
            <FiltersSidebar
              filters={filters}
              onChange={(f) => {
                setFilters(f);
                setPage(1);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}
