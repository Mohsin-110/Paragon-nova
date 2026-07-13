"use client";

import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { Product } from "@/lib/types";
import { PriceTag } from "@/components/ui/price-tag";
import { StarRating } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const wished = has(product.id);

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-2xl bg-canvas"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isFlashSale && <Badge tone="brass">Flash sale</Badge>}
          {product.isNew && <Badge tone="pine">New</Badge>}
          {product.isBestSeller && <Badge tone="ink">Bestseller</Badge>}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 backdrop-blur transition-transform hover:scale-105"
        >
          <FiHeart
            size={16}
            className={cn(wished ? "fill-brass text-brass" : "text-ink")}
          />
        </button>
      </Link>

      <div className="mt-3 flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-muted">
          {product.brand}
        </span>
        <Link
          href={`/product/${product.slug}`}
          className="text-sm font-medium text-ink hover:underline underline-offset-4"
        >
          {product.name}
        </Link>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-1 flex items-center justify-between">
          <PriceTag
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            size="sm"
          />
          <button
            onClick={() => addItem(product, 1)}
            className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink opacity-100 transition-opacity duration-200 hover:bg-ink hover:text-paper sm:opacity-0 sm:group-hover:opacity-100"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
