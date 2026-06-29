import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { mockProducts } from "@/lib/mockProducts";

export default function Home() {
  return (
    <main className="space-y-6">
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">All products</h1>
          <p className="mt-1 text-sm text-foreground-muted">{mockProducts.length} items</p>
        </div>
        <CategoryFilter />
      </section>
      <ProductGrid />
    </main>
  );
}
