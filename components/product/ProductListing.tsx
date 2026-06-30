"use client";

import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { useProductFilters } from "@/hooks/useProductFilters";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

type ProductListingProps = {
  products: Product[];
  categories: Category[];
};

export function ProductListing({ products, categories }: ProductListingProps) {
  const { filteredProducts, selectedCategory, categoryLabels, selectCategory } =
    useProductFilters(products, categories);

  return (
    <main className="space-y-6">
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">All products</h1>
          <p className="mt-1 text-sm text-foreground-muted">{filteredProducts.length} items</p>
        </div>
        <CategoryFilter
          categories={categoryLabels}
          selected={selectedCategory}
          onSelect={selectCategory}
        />
      </section>
      <ProductGrid products={filteredProducts} />
    </main>
  );
}
