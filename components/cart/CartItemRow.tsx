"use client";

import Image from "next/image";
import Link from "next/link";
import { ImagePlaceholderIcon } from "@/components/ui/icons";
import type { CartItem } from "@/types/cart";
import { formatPrice } from "@/utils/formatPrice";

type CartItemRowProps = {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const lineTotal = item.price * item.quantity;

  return (
    <li className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center">
      <Link
        href={`/products/${item.id}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f3f4f6]"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            unoptimized
            className="object-contain p-2"
            sizes="96px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImagePlaceholderIcon size={32} />
          </div>
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          href={`/products/${item.id}`}
          className="line-clamp-2 text-sm font-semibold text-foreground hover:text-primary sm:text-base"
        >
          {item.title}
        </Link>
        <p className="mt-1 text-sm text-foreground-muted">{formatPrice(item.price)} each</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
        <div
          role="group"
          aria-label={`Quantity for ${item.title}`}
          className="flex h-10 items-center rounded-lg border border-border bg-[#f9fafb]"
        >
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="flex h-full w-10 items-center justify-center text-foreground-muted transition-colors hover:text-foreground"
            aria-label={`Decrease quantity of ${item.title}`}
          >
            −
          </button>
          <span className="min-w-10 text-center text-sm font-medium text-foreground" aria-live="polite">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="flex h-full w-10 items-center justify-center text-foreground-muted transition-colors hover:text-foreground"
            aria-label={`Increase quantity of ${item.title}`}
          >
            +
          </button>
        </div>

        <p className="min-w-24 text-right text-sm font-semibold text-foreground sm:text-base">
          {formatPrice(lineTotal)}
        </p>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="text-sm font-medium text-foreground-muted transition-colors hover:text-[#ef4444]"
        >
          Remove
        </button>
      </div>
    </li>
  );
}
