"use client";

import { ErrorMessage } from "@/components/ui/ErrorMessage";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="space-y-6">
      <ErrorMessage
        title="Product unavailable"
        message="We could not load this product. Please try again."
        onRetry={reset}
      />
    </main>
  );
}
