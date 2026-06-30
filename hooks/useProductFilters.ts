"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import { filterProducts } from "@/utils/filterProducts";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export function useProductFilters(products: Product[], categories: Category[]) {
  const { query } = useSearch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categorySlugFromUrl = searchParams.get("category");

  const selectedCategory = useMemo(() => {
    if (!categorySlugFromUrl) {
      return "All";
    }

    const match = categories.find((category) => category.slug === categorySlugFromUrl);
    return match?.name ?? "All";
  }, [categorySlugFromUrl, categories]);

  const categoryLabels = useMemo(
    () => ["All", ...categories.map((category) => category.name)],
    [categories],
  );

  const filteredProducts = useMemo(
    () => filterProducts(products, { query, category: selectedCategory }, categories),
    [products, query, selectedCategory, categories],
  );

  const selectCategory = useCallback(
    (category: string) => {
      if (category === selectedCategory) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");

      if (category === "All") {
        params.delete("category");
      } else {
        const match = categories.find((item) => item.name === category);

        if (match) {
          params.set("category", match.slug);
        }
      }

      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [categories, pathname, router, searchParams, selectedCategory],
  );

  return {
    filteredProducts,
    selectedCategory,
    categoryLabels,
    selectCategory,
  };
}
