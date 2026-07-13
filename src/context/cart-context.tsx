"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/lib/types";

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  variant?: string;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "marque:cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount, not a reactive sync
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  function addItem(product: Product, quantity = 1, variant?: string) {
    setLines((prev) => {
      const existing = prev.find(
        (l) => l.productId === product.id && l.variant === variant
      );
      if (existing) {
        return prev.map((l) =>
          l.productId === product.id && l.variant === variant
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.images[0],
          variant,
          quantity,
        },
      ];
    });
    setIsOpen(true);
  }

  function removeItem(productId: string, variant?: string) {
    setLines((prev) =>
      prev.filter((l) => !(l.productId === productId && l.variant === variant))
    );
  }

  function updateQuantity(productId: string, quantity: number, variant?: string) {
    if (quantity <= 0) {
      removeItem(productId, variant);
      return;
    }
    setLines((prev) =>
      prev.map((l) =>
        l.productId === productId && l.variant === variant ? { ...l, quantity } : l
      )
    );
  }

  function clearCart() {
    setLines([]);
  }

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines]
  );
  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
