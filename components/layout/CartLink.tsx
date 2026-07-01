"use client";

import Link from "next/link";
import { CartIcon } from "@/components/ui/icons";
import { useCart } from "@/hooks/useCart";

export function CartLink() {
  const { itemCount } = useCart();
  const showBadge = itemCount > 0;

  return (
    <Link
      href="/cart"
      className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      aria-label={showBadge ? `Cart, ${itemCount} items` : "Cart"}
    >
      <CartIcon />
      {showBadge ? (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </Link>
  );
}
