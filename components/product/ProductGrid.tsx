import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const { id, ...cardProps } = product;

        return (
          <li key={id}>
            <Link
              href={`/products/${id}`}
              className="block h-full rounded-xl transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              <ProductCard {...cardProps} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
