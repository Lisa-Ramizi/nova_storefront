"use client";

import { useMemo } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { filterProductsBySearch, useSearch } from "@/hooks/useSearch";
import type { Product } from "@/types/product";

type ProductListingProps = {
  products: Product[];
  categoryLabels: string[];
};

export function ProductListing({ products, categoryLabels }: ProductListingProps) {
  const { query } = useSearch();

  const filteredProducts = useMemo(
    () => filterProductsBySearch(products, query),
    [products, query],
  );

  const itemCount = filteredProducts.length;

  return (
    <main className="space-y-6">
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">All products</h1>
          <p className="mt-1 text-sm text-foreground-muted">{itemCount} items</p>
        </div>
        <CategoryFilter categories={categoryLabels} />
      </section>
      <ProductGrid products={filteredProducts} />
    </main>
  );
}
