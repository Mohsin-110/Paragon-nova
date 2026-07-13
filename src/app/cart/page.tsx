"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import { OrderSummary } from "@/components/cart/order-summary";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { lines, updateQuantity, removeItem, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-ink">Your bag is empty</h1>
        <p className="mt-2 text-sm text-muted">
          Explore the shop to find something worth adding.
        </p>
        <Link href="/shop" className="mt-6">
          <Button size="lg">
            <FiArrowLeft size={16} /> Continue shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-serif text-3xl text-ink">Your bag</h1>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="flex flex-col gap-5">
          {lines.map((line) => (
            <li
              key={line.productId + (line.variant ?? "")}
              className="flex gap-5 rounded-2xl border border-ink/8 p-4"
            >
              <Link
                href={`/product/${line.slug}`}
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-canvas"
              >
                <Image
                  src={line.image}
                  alt={line.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted">
                      {line.brand}
                    </p>
                    <Link
                      href={`/product/${line.slug}`}
                      className="font-medium text-ink hover:underline underline-offset-4"
                    >
                      {line.name}
                    </Link>
                    {line.variant && (
                      <p className="text-xs text-muted">{line.variant}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(line.productId, line.variant)}
                    aria-label="Remove item"
                    className="text-ink/40 hover:text-ink"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-full border border-ink/12 px-2.5 py-1.5">
                    <button
                      onClick={() =>
                        updateQuantity(line.productId, line.quantity - 1, line.variant)
                      }
                      aria-label="Decrease quantity"
                    >
                      <FiMinus size={13} />
                    </button>
                    <span className="w-5 text-center text-sm tabular-nums">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(line.productId, line.quantity + 1, line.variant)
                      }
                      aria-label="Increase quantity"
                    >
                      <FiPlus size={13} />
                    </button>
                  </div>
                  <span className="font-mono text-sm text-ink">
                    {formatPrice(line.price * line.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <OrderSummary subtotal={subtotal} />
      </div>
    </div>
  );
}
