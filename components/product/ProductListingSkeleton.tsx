import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";
import { CategoryFilterSkeleton } from "@/components/ui/CategoryFilterSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export function ProductListingSkeleton() {
  return (
    <main className="space-y-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading products</span>
      <section className="space-y-4">
        <div>
          <Skeleton className="h-8 w-48 sm:h-9" />
          <Skeleton className="mt-2 h-4 w-20" />
        </div>
        <CategoryFilterSkeleton />
      </section>
      <ProductGridSkeleton />
    </main>
  );
}
