"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";

export function ProductRail({
  title,
  eyebrow,
  products,
  viewAllHref,
}: {
  title: string;
  eyebrow: string;
  products: Product[];
  viewAllHref?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-brass-dark">
            {eyebrow}
          </p>
          <h2 className="mt-1 font-serif text-2xl text-ink sm:text-3xl">{title}</h2>
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="hidden text-sm font-medium text-ink hover:underline underline-offset-4 sm:block"
          >
            View all
          </Link>
        )}
      </div>
      <Swiper
        modules={[FreeMode]}
        freeMode
        spaceBetween={20}
        slidesPerView={2.1}
        breakpoints={{
          640: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
        }}
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
