import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export type ProductFilters = {
  query: string;
  category: string;
};

function filterProductsBySearch(products: Product[], query: string): Product[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return products;
  }

  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(normalized) ||
      product.description.toLowerCase().includes(normalized) ||
      product.category.toLowerCase().includes(normalized),
  );
}

function filterProductsByCategory(
  products: Product[],
  categoryName: string,
  categories: Category[],
): Product[] {
  if (categoryName === "All") {
    return products;
  }

  const category = categories.find((item) => item.name === categoryName);

  if (!category) {
    return products;
  }

  return products.filter((product) => product.category === category.slug);
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
  categories: Category[],
): Product[] {
  const searchFiltered = filterProductsBySearch(products, filters.query);
  return filterProductsByCategory(searchFiltered, filters.category, categories);
}
