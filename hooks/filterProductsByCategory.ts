import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export function filterProductsByCategory(
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
