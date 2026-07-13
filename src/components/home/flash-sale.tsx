"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/product-card";

function useCountdown(target?: string) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!target) return;
    const end = new Date(target).getTime();
    const tick = () => setRemaining(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  return { hours, minutes, seconds };
}

export function FlashSale() {
  const flashProducts = products.filter((p) => p.isFlashSale);
  const { hours, minutes, seconds } = useCountdown(flashProducts[0]?.flashSaleEndsAt);

  if (flashProducts.length === 0) return null;

  return (
    <section className="bg-ink py-16 text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brass">
              Ends soon
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl">Flash sale</h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-sm">
            {[hours, minutes, seconds].map((unit, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="rounded-lg bg-paper/10 px-2.5 py-1.5 tabular-nums">
                  {String(unit).padStart(2, "0")}
                </span>
                {i < 2 && <span className="text-paper/40">:</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {flashProducts.map((p) => (
            <div key={p.id} className="rounded-2xl bg-paper p-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/shop?filter=flash-sale"
            className="text-sm font-medium text-paper hover:underline underline-offset-4"
          >
            See all flash sale items →
          </Link>
        </div>
      </div>
    </section>
  );
}
