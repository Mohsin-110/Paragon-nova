"use client";

import { useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";
import { FiHeart, FiShare2, FiBarChart2, FiCheck, FiTruck } from "react-icons/fi";
import { getProductBySlug, getRelatedProducts, reviews as allReviews } from "@/lib/mock-data";
import { PriceTag } from "@/components/ui/price-tag";
import { StarRating, Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/product/image-gallery";
import { Reviews } from "@/components/product/reviews";
import { ProductGrid } from "@/components/product/product-grid";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/format";

type Tab = "description" | "specifications" | "shipping" | "reviews";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const product = getProductBySlug(params.slug);

  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(product?.variants?.[0]?.label);
  const [tab, setTab] = useState<Tab>("description");
  const [copied, setCopied] = useState(false);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);
  const productReviews = allReviews[product.id] ?? [];
  const wished = has(product.id);

  function handleShare() {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-ink">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="capitalize hover:text-ink">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ImageGallery images={product.images} alt={product.name} />

        <div>
          <div className="flex items-center gap-2">
            {product.isFlashSale && <Badge tone="brass">Flash sale</Badge>}
            {product.isNew && <Badge tone="pine">New</Badge>}
            {product.isBestSeller && <Badge tone="ink">Bestseller</Badge>}
          </div>
          <p className="mt-3 text-xs uppercase tracking-wide text-muted">
            {product.brand}
          </p>
          <h1 className="mt-1 font-serif text-3xl text-ink sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size={16} />
          </div>

          <div className="mt-5">
            <PriceTag
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
            />
          </div>

          <p
            className={cn(
              "mt-3 flex items-center gap-1.5 text-sm",
              product.stock > 5 ? "text-pine" : product.stock > 0 ? "text-brass-dark" : "text-red-600"
            )}
          >
            <FiCheck size={14} />
            {product.stock > 5
              ? "In stock, ready to ship"
              : product.stock > 0
              ? `Only ${product.stock} left in stock`
              : "Out of stock"}
          </p>

          {product.variants && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-ink">
                Finish: <span className="font-normal text-muted">{variant}</span>
              </p>
              <div className="flex gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    disabled={!v.inStock}
                    onClick={() => setVariant(v.label)}
                    aria-label={v.label}
                    className={cn(
                      "h-9 w-9 rounded-full border-2 disabled:cursor-not-allowed disabled:opacity-30",
                      variant === v.label ? "border-ink" : "border-transparent"
                    )}
                    style={{ backgroundColor: v.swatch }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3 rounded-full border border-ink/15 px-2 py-1 w-fit">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center text-ink"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-6 text-center text-sm tabular-nums">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-8 w-8 items-center justify-center text-ink"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="flex-1"
              disabled={product.stock === 0}
              onClick={() => addItem(product, quantity, variant)}
            >
              Add to cart
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="flex-1"
              disabled={product.stock === 0}
              onClick={() => {
                addItem(product, quantity, variant);
                router.push("/cart");
              }}
            >
              Buy now
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => toggle(product.id)}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-ink"
            >
              <FiHeart size={15} className={cn(wished && "fill-brass text-brass")} />
              {wished ? "Saved" : "Save"}
            </button>
            <Link
              href={`/compare?add=${product.id}`}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-ink"
            >
              <FiBarChart2 size={15} /> Compare
            </Link>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-ink"
            >
              <FiShare2 size={15} /> {copied ? "Link copied" : "Share"}
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-ink/8 p-4 text-sm text-muted">
            <FiTruck size={16} className="text-ink" />
            {product.shipping.estimate} · Free shipping over ${product.shipping.freeOver}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-6 border-b border-ink/8">
          {(["description", "specifications", "shipping", "reviews"] as Tab[]).map(
            (t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "border-b-2 pb-3 text-sm font-medium capitalize -mb-px",
                  tab === t ? "border-ink text-ink" : "border-transparent text-muted"
                )}
              >
                {t === "reviews" ? `Reviews (${product.reviewCount})` : t}
              </button>
            )
          )}
        </div>

        <div className="py-8">
          {tab === "description" && (
            <div className="max-w-2xl">
              <p className="text-sm leading-relaxed text-muted">{product.description}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink">
                    <FiCheck size={15} className="mt-0.5 shrink-0 text-pine" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === "specifications" && (
            <div className="max-w-2xl divide-y divide-ink/8">
              {Object.entries(product.specifications).map(([k, v]) => (
                <div key={k} className="flex justify-between py-2.5 text-sm">
                  <span className="text-muted">{k}</span>
                  <span className="text-ink">{v}</span>
                </div>
              ))}
              <div className="flex justify-between py-2.5 text-sm">
                <span className="text-muted">SKU</span>
                <span className="font-mono text-ink">{product.sku}</span>
              </div>
            </div>
          )}
          {tab === "shipping" && (
            <div className="max-w-2xl text-sm text-muted">
              <p>Estimated delivery: {product.shipping.estimate}.</p>
              <p className="mt-2">
                Free shipping on orders over ${product.shipping.freeOver}. Returns
                accepted within 30 days of delivery, unused and in original packaging.
              </p>
            </div>
          )}
          {tab === "reviews" && (
            <Reviews
              reviews={productReviews}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-6 font-serif text-2xl text-ink">You may also like</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
