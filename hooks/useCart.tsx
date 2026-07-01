"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

const CART_STORAGE_KEY = "nova-cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  isInCart: (productId: string) => boolean;
  getQuantity: (productId: string) => number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const listeners = new Set<() => void>();
const EMPTY_CART_SNAPSHOT: CartItem[] = [];
let cartItems: CartItem[] = EMPTY_CART_SNAPSHOT;
let hasHydratedFromStorage = false;

function productToCartItem(product: Product, quantity: number): CartItem {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    imageAlt: product.imageAlt,
    quantity,
  };
}

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") {
    return EMPTY_CART_SNAPSHOT;
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) {
      return EMPTY_CART_SNAPSHOT;
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return EMPTY_CART_SNAPSHOT;
    }

    const items = parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.price === "number" &&
        typeof item.imageAlt === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0,
    );

    return items.length > 0 ? items : EMPTY_CART_SNAPSHOT;
  } catch {
    return EMPTY_CART_SNAPSHOT;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function getSnapshot(): CartItem[] {
  if (typeof window !== "undefined" && !hasHydratedFromStorage) {
    hasHydratedFromStorage = true;
    cartItems = loadCartFromStorage();
  }

  return cartItems;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART_SNAPSHOT;
}

function persistCart(items: CartItem[]) {
  cartItems = items.length > 0 ? items : EMPTY_CART_SNAPSHOT;

  if (typeof window !== "undefined") {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }

  emitChange();
}

function updateCart(updater: (current: CartItem[]) => CartItem[]) {
  persistCart(updater(getSnapshot()));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    if (quantity < 1) {
      return;
    }

    updateCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [...current, productToCartItem(product, quantity)];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    updateCart((current) => current.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      updateCart((current) => current.filter((item) => item.id !== productId));
      return;
    }

    updateCart((current) =>
      current.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    );
  }, []);

  const isInCart = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items],
  );

  const getQuantity = useCallback(
    (productId: string) => items.find((item) => item.id === productId)?.quantity ?? 0,
    [items],
  );

  const clearCart = useCallback(() => {
    persistCart(EMPTY_CART_SNAPSHOT);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      isInCart,
      getQuantity,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      isInCart,
      getQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
