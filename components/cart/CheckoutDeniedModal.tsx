"use client";

import { useEffect, useId, useRef } from "react";

type CheckoutDeniedModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CheckoutDeniedModal({ open, onClose }: CheckoutDeniedModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-[#111827]/50"
        onClick={onClose}
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative w-full max-w-md overflow-hidden rounded-xl border border-[#fecaca] bg-surface shadow-xl"
      >
        <div className="border-b border-[#fecaca] bg-[#fef2f2] px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#b91c1c]">
            Payment gateway
          </p>
          <h2 id={titleId} className="mt-1 text-3xl font-bold tracking-tight text-[#991b1b]">
            403 Forbidden
          </h2>
        </div>

        <div id={descriptionId} className="space-y-3 px-5 py-5">
          <p className="text-sm leading-relaxed text-foreground">
            Access to the payment gateway is denied.
          </p>
          <p className="rounded-lg border border-border bg-[#f9fafb] px-3 py-2 font-mono text-xs text-foreground-muted">
            Required permission: <span className="font-semibold text-foreground">employment.offer</span>
          </p>
        </div>

        <div className="border-t border-border px-5 py-4">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-[#f9fafb]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
