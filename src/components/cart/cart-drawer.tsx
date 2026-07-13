"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { lines, isOpen, closeCart, updateQuantity, removeItem, subtotal } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-ink/8 px-6 py-5">
              <h2 className="font-serif text-lg text-ink">
                Your bag {lines.length > 0 && `(${lines.length})`}
              </h2>
              <button onClick={closeCart} aria-label="Close cart">
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-serif text-lg text-ink">Your bag is empty</p>
                  <p className="mt-1 text-sm text-muted">
                    Items you add will show up here.
                  </p>
                  <Link href="/shop" onClick={closeCart}>
                    <Button className="mt-6">Continue shopping</Button>
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  {lines.map((line) => (
                    <li key={line.productId + (line.variant ?? "")} className="flex gap-4">
                      <Link
                        href={`/product/${line.slug}`}
                        onClick={closeCart}
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-canvas"
                      >
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-muted">
                              {line.brand}
                            </p>
                            <Link
                              href={`/product/${line.slug}`}
                              onClick={closeCart}
                              className="text-sm font-medium text-ink hover:underline underline-offset-4"
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
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-3 rounded-full border border-ink/12 px-2 py-1">
                            <button
                              onClick={() =>
                                updateQuantity(line.productId, line.quantity - 1, line.variant)
                              }
                              aria-label="Decrease quantity"
                            >
                              <FiMinus size={12} />
                            </button>
                            <span className="w-4 text-center text-xs tabular-nums">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(line.productId, line.quantity + 1, line.variant)
                              }
                              aria-label="Increase quantity"
                            >
                              <FiPlus size={12} />
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
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-ink/8 px-6 py-5">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-mono text-base font-medium text-ink">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mb-4 text-xs text-muted">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link href="/cart" onClick={closeCart}>
                  <Button className="w-full" size="lg">
                    View bag & checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
