import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-sm"
    >
      <span aria-hidden="true">←</span>
      Back to products
    </Link>
  );
}
