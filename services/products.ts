import type {
  ApiCategory,
  ApiCategoriesResponse,
  ApiProduct,
  ApiProductsResponse,
} from "@/types/api";
import type { Category } from "@/types/category";
import type { Product, ProductsResult } from "@/types/product";

const API_BASE = "https://dummyjson.com";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

function mapProduct(apiProduct: ApiProduct): Product {
  const hasDiscount = apiProduct.discountPercentage > 0;
  const price = hasDiscount
    ? Number(
        (apiProduct.price * (1 - apiProduct.discountPercentage / 100)).toFixed(2),
      )
    : apiProduct.price;

  return {
    id: String(apiProduct.id),
    image: apiProduct.thumbnail,
    imageAlt: apiProduct.title,
    category: apiProduct.category,
    title: apiProduct.title,
    description: apiProduct.description,
    rating: apiProduct.rating,
    reviewCount: apiProduct.reviews.length,
    price,
    ...(hasDiscount && {
      originalPrice: apiProduct.price,
      discountLabel: `-${Math.round(apiProduct.discountPercentage)}%`,
    }),
  };
}

function mapCategory(apiCategory: ApiCategory): Category {
  return {
    slug: apiCategory.slug,
    name: apiCategory.name,
  };
}

export async function getProducts(): Promise<ProductsResult> {
  const data = await fetchJson<ApiProductsResponse>(`${API_BASE}/products?limit=200`);
  const products = data.products.map(mapProduct);

  return {
    products,
    total: data.total,
  };
}

export async function getProduct(id: string): Promise<Product> {
  const data = await fetchJson<ApiProduct>(`${API_BASE}/products/${id}`);
  return mapProduct(data);
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson<ApiCategoriesResponse>(`${API_BASE}/products/categories`);
  return data.map(mapCategory);
}
