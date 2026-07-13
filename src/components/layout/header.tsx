"use client";

import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX, FiUser } from "react-icons/fi";
import { categories } from "@/lib/mock-data";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/format";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { ids } = useWishlist();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu size={22} />
        </button>

        <Link href="/" className="font-serif text-2xl tracking-tight text-ink">
          ParagonNovaLLC
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) =>
            link.label === "Shop" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
                {megaOpen && (
                  <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-4 rounded-2xl border border-ink/8 bg-paper p-6 shadow-[0_20px_50px_-20px_rgba(20,23,31,0.25)]">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/shop?category=${cat.slug}`}
                          className="group"
                        >
                          <span className="text-sm font-medium text-ink group-hover:underline underline-offset-4">
                            {cat.name}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted">
                            {cat.productCount} items
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5 sm:flex"
          >
            <FiSearch size={18} />
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5 sm:flex"
          >
            <FiUser size={18} />
          </Link>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5"
          >
            <FiHeart size={18} />
            {ids.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[10px] font-medium text-ink">
                {ids.length}
              </span>
            )}
          </Link>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-ink/5"
          >
            <FiShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-paper">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink/40 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-80 max-w-[85%] bg-paper p-6 shadow-xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-serif text-xl text-ink">ParagonNovaLLC</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <FiX size={22} />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-ink/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 border-t border-ink/8 pt-6">
            <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-muted">
              Categories
            </p>
            <div className="flex flex-col">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm text-ink/80 hover:bg-ink/5"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
