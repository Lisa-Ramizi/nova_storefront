"use client";

import { useState } from "react";

export function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex h-11 items-center rounded-lg border border-border bg-[#f9fafb]">
      <button
        type="button"
        onClick={() => setQuantity((value) => Math.max(1, value - 1))}
        className="flex h-full w-11 items-center justify-center text-foreground-muted transition-colors hover:text-foreground"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="min-w-10 text-center text-sm font-medium text-foreground">{quantity}</span>
      <button
        type="button"
        onClick={() => setQuantity((value) => value + 1)}
        className="flex h-full w-11 items-center justify-center text-foreground-muted transition-colors hover:text-foreground"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
