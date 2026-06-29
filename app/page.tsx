import { ProductCard } from "@/components/product/ProductCard";
import { mockProduct } from "@/lib/mockProducts";

export default function Home() {
  const { id: _, ...cardProps } = mockProduct;

  return (
    <main>
      <ProductCard {...cardProps} />
    </main>
  );
}
