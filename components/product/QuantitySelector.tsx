"use client";

import { useState } from "react";

type QuantitySelectorProps = {
  value?: number;
  onChange?: (quantity: number) => void;
  min?: number;
};

export function QuantitySelector({ value, onChange, min = 1 }: QuantitySelectorProps) {
  const [internalQuantity, setInternalQuantity] = useState(min);
  const isControlled = value !== undefined;
  const quantity = isControlled ? value : internalQuantity;

  function updateQuantity(nextQuantity: number) {
    const clamped = Math.max(min, nextQuantity);

    if (!isControlled) {
      setInternalQuantity(clamped);
    }

    onChange?.(clamped);
  }

  return (
    <div
      role="group"
      aria-label="Quantity"
      className="flex h-11 items-center rounded-lg border border-border bg-[#f9fafb]"
    >
      <button
        type="button"
        onClick={() => updateQuantity(quantity - 1)}
        className="flex h-full w-11 items-center justify-center text-foreground-muted transition-colors hover:text-foreground"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span
        className="min-w-10 text-center text-sm font-medium text-foreground"
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => updateQuantity(quantity + 1)}
        className="flex h-full w-11 items-center justify-center text-foreground-muted transition-colors hover:text-foreground"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
