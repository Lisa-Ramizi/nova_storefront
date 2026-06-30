type EmptyStateProps = {
  title?: string;
  message?: string;
};

export function EmptyState({
  title = "No products found",
  message = "No products match your selection. Try a different category.",
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className="rounded-xl border border-border bg-surface p-6 text-center sm:p-8"
    >
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-foreground-muted">{message}</p>
    </div>
  );
}
