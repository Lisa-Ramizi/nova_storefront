import type { Product } from "@/types/product";

export type ApiProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  reviews: { rating: number }[];
};

export type ApiProductsResponse = {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
};

export type ApiCategory = {
  slug: string;
  name: string;
  url: string;
};

export type ProductsResult = {
  products: Product[];
  total: number;
};

export type Category = {
  slug: string;
  name: string;
};
