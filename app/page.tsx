import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { getCategories, getProducts } from "@/services/products";

export default async function Home() {
  const [{ products, total }, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const categoryLabels = ["All", ...categories.map((category) => category.name)];

  return (
    <main className="space-y-6">
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">All products</h1>
          <p className="mt-1 text-sm text-foreground-muted">{total} items</p>
        </div>
        <CategoryFilter categories={categoryLabels} />
      </section>
      <ProductGrid products={products} />
    </main>
  );
}
