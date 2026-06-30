"use client";

import { ErrorMessage } from "@/components/ui/ErrorMessage";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="space-y-6">
      <ErrorMessage onRetry={reset} />
    </main>
  );
}
