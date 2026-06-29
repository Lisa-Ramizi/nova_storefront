import type { Product } from "@/types/product";

export const mockProduct: Product = {
  id: "1",
  imageAlt: "test",
  category: "test",
  title: "test",
  description: "testtt",
  rating: 0,
  reviewCount: 0,
  price: 0,
};

export const mockProducts: Product[] = Array.from({ length: 8 }, (_, index) => ({
  ...mockProduct,
  id: String(index + 1),
}));
