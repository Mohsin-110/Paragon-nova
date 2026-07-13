"use client";

import { useState } from "react";
import Link from "next/link";
import { FiTag } from "react-icons/fi";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

const VALID_COUPONS: Record<string, { label: string; type: "percent" | "flat"; value: number }> = {
  WELCOME10: { label: "10% off", type: "percent", value: 10 },
  FREESHIP: { label: "Free shipping", type: "flat", value: 0 },
};

export function OrderSummary({ subtotal }: { subtotal: number }) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const coupon = applied ? VALID_COUPONS[applied] : null;
  const shipping = subtotal >= 75 || coupon?.label === "Free shipping" ? 0 : 8;
  const discount = coupon?.type === "percent" ? (subtotal * coupon.value) / 100 : 0;
  const tax = (subtotal - discount) * 0.07;
  const total = subtotal - discount + shipping + tax;

  function applyCoupon() {
    const normalized = code.trim().toUpperCase();
    if (VALID_COUPONS[normalized]) {
      setApplied(normalized);
      setError(null);
    } else {
      setError("That code isn't valid or has expired.");
    }
  }

  return (
    <div className="rounded-2xl border border-ink/8 p-6">
      <h2 className="font-serif text-lg text-ink">Order summary</h2>

      <div className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Coupon code"
            className="w-full rounded-full border border-ink/15 py-2.5 pl-9 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brass"
          />
        </div>
        <Button variant="outline" onClick={applyCoupon}>
          Apply
        </Button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      {coupon && (
        <p className="mt-1.5 text-xs text-pine">Applied: {coupon.label}</p>
      )}

      <div className="mt-5 flex flex-col gap-2.5 border-t border-ink/8 pt-5 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-mono text-ink">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-pine">
            <span>Discount</span>
            <span className="font-mono">−{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted">Shipping</span>
          <span className="font-mono text-ink">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Estimated tax</span>
          <span className="font-mono text-ink">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between border-t border-ink/8 pt-2.5 text-base font-medium">
          <span className="text-ink">Total</span>
          <span className="font-mono text-ink">{formatPrice(total)}</span>
        </div>
      </div>

      <Link href="/checkout">
        <Button className="mt-6 w-full" size="lg">
          Proceed to checkout
        </Button>
      </Link>
      <p className="mt-3 text-center text-xs text-muted">
        Card, PayPal, and cash on delivery accepted.
      </p>
    </div>
  );
}
