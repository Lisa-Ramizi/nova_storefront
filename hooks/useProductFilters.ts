"use client";

import { useMemo, useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import { filterProducts } from "@/utils/filterProducts";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export function useProductFilters(products: Product[], categories: Category[]) {
  const { query } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryLabels = useMemo(
    () => ["All", ...categories.map((category) => category.name)],
    [categories],
  );

  const filteredProducts = useMemo(
    () => filterProducts(products, { query, category: selectedCategory }, categories),
    [products, query, selectedCategory, categories],
  );

  function selectCategory(category: string) {
    if (category === selectedCategory) {
      return;
    }

    setSelectedCategory(category);
  }

  return {
    filteredProducts,
    selectedCategory,
    categoryLabels,
    selectCategory,
  };
}
