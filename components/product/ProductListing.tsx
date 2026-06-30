"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { filterProductsByCategory } from "@/hooks/filterProductsByCategory";
import { filterProductsBySearch, useSearch } from "@/hooks/useSearch";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

type ProductListingProps = {
  products: Product[];
  categories: Category[];
};

export function ProductListing({ products, categories }: ProductListingProps) {
  const { query } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryLabels = useMemo(
    () => ["All", ...categories.map((category) => category.name)],
    [categories],
  );

  const searchFilteredProducts = useMemo(
    () => filterProductsBySearch(products, query),
    [products, query],
  );

  const displayedProducts = useMemo(
    () => filterProductsByCategory(searchFilteredProducts, selectedCategory, categories),
    [searchFilteredProducts, selectedCategory, categories],
  );

  function handleCategorySelect(category: string) {
    if (category === selectedCategory) {
      return;
    }

    setSelectedCategory(category);
  }

  return (
    <main className="space-y-6">
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">All products</h1>
          <p className="mt-1 text-sm text-foreground-muted">{displayedProducts.length} items</p>
        </div>
        <CategoryFilter
          categories={categoryLabels}
          selected={selectedCategory}
          onSelect={handleCategorySelect}
        />
      </section>
      <ProductGrid products={displayedProducts} />
    </main>
  );
}
