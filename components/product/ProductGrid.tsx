import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mockProducts";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products?: Product[];
};

export function ProductGrid({ products = mockProducts }: ProductGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const { id, ...cardProps } = product;

        return (
          <li key={id}>
            <ProductCard {...cardProps} />
          </li>
        );
      })}
    </ul>
  );
}
