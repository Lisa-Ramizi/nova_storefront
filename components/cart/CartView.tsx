"use client";

import Link from "next/link";
import { useState } from "react";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CheckoutDeniedModal } from "@/components/cart/CheckoutDeniedModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";

export function CartView() {
  const { items, itemCount, subtotal, updateQuantity, removeFromCart } = useCart();
  const [checkoutDeniedOpen, setCheckoutDeniedOpen] = useState(false);

  if (items.length === 0) {
    return (
      <main className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Your cart</h1>
          <p className="mt-1 text-sm text-foreground-muted">Review items before checkout.</p>
        </div>
        <EmptyState
          title="Your cart is empty"
          message="Browse products and add items to your cart."
        />
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Your cart</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>
      </div>

      <ul className="space-y-4">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </ul>

      <section className="rounded-xl border border-border bg-surface p-4 sm:p-6">
        <div className="flex items-center justify-between text-base font-semibold text-foreground">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-2 text-sm text-foreground-muted">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex flex-1 items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-[#f9fafb]"
          >
            Continue shopping
          </Link>
          <button
            type="button"
            onClick={() => setCheckoutDeniedOpen(true)}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Checkout
          </button>
        </div>
      </section>

      <CheckoutDeniedModal
        open={checkoutDeniedOpen}
        onClose={() => setCheckoutDeniedOpen(false)}
      />
    </main>
  );
}
