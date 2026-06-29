import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center shrink-0" aria-label="NOVA home">
      <span className="text-xl font-bold tracking-tight">
        <span className="text-foreground">NO</span>
        <span className="text-primary">VA</span>
      </span>
    </Link>
  );
}
