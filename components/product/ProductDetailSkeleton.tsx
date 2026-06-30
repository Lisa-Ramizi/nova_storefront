import { Skeleton } from "@/components/ui/Skeleton";

export function ProductDetailSkeleton() {
  return (
    <main className="space-y-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading product</span>

      <Skeleton className="h-4 w-64" />

      <article className="rounded-xl border border-border bg-surface p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-20 w-20 shrink-0 rounded-lg" />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <Skeleton className="mb-2 h-3 w-24" />
            <Skeleton className="mb-3 h-8 w-3/4 sm:h-9" />
            <Skeleton className="mb-4 h-4 w-32" />
            <Skeleton className="mb-6 h-9 w-48" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-6 h-4 w-2/3" />
            <Skeleton className="mb-6 h-4 w-56" />

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Skeleton className="h-11 w-32 rounded-lg" />
              <Skeleton className="h-11 flex-1 rounded-lg" />
              <Skeleton className="h-11 w-full rounded-lg sm:w-28" />
            </div>

            <div className="mt-auto grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index}>
                  <Skeleton className="mb-1 h-4 w-16" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
