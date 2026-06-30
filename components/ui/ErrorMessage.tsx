"use client";

type ErrorMessageProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorMessage({
  title = "Something went wrong",
  message = "We could not load the products. Please try again.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-border bg-surface p-6 text-center sm:p-8"
    >
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-foreground-muted">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
