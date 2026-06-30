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

type ListingState = {
  searchQuery: string;
  selectedCategory: string;
  displayedProducts: Product[];
};

export function ProductListing({ products, categories }: ProductListingProps) {
  const { query } = useSearch();
  const [listingState, setListingState] = useState<ListingState>({
    searchQuery: query,
    selectedCategory: "All",
    displayedProducts: products,
  });

  const categoryLabels = useMemo(
    () => ["All", ...categories.map((category) => category.name)],
    [categories],
  );

  const searchFilteredProducts = useMemo(
    () => filterProductsBySearch(products, query),
    [products, query],
  );

  const searchChanged = listingState.searchQuery !== query;

  const displayedProducts = searchChanged
    ? searchFilteredProducts
    : listingState.displayedProducts;

  const selectedCategory = searchChanged ? "All" : listingState.selectedCategory;

  function handleCategorySelect(category: string) {
    if (category === selectedCategory && !searchChanged) {
      return;
    }

    const currentProducts = searchChanged
      ? searchFilteredProducts
      : listingState.displayedProducts;

    const nextDisplayed =
      category === "All"
        ? searchFilteredProducts
        : filterProductsByCategory(currentProducts, category, categories);

    setListingState({
      searchQuery: query,
      selectedCategory: category,
      displayedProducts: nextDisplayed,
    });
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
