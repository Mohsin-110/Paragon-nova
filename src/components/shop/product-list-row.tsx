import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { PriceTag } from "@/components/ui/price-tag";
import { StarRating, Badge } from "@/components/ui/badge";

export function ProductListRow({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex gap-5 rounded-2xl border border-ink/8 p-4 transition-colors hover:border-ink/20"
    >
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-canvas sm:h-36 sm:w-36">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="150px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          <div className="flex items-center gap-2">
            {product.isFlashSale && <Badge tone="brass">Flash sale</Badge>}
            {product.isNew && <Badge tone="pine">New</Badge>}
          </div>
          <p className="mt-1.5 text-xs uppercase tracking-wide text-muted">
            {product.brand}
          </p>
          <p className="text-sm font-medium text-ink sm:text-base">{product.name}</p>
          <div className="mt-1.5">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
        </div>
        <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} />
      </div>
    </Link>
  );
}
