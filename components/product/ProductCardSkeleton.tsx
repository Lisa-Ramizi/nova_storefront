import { Skeleton } from "@/components/ui/Skeleton";

export function ProductCardSkeleton() {
  return (
    <article className="flex w-full flex-col rounded-xl border border-border bg-surface p-4">
      <Skeleton className="mb-3 aspect-square w-full rounded-lg" />
      <Skeleton className="mb-1 h-3 w-16" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-3 w-3/4" />
      <Skeleton className="mb-2 h-4 w-24" />
      <Skeleton className="mb-4 h-6 w-20" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </article>
  );
}
