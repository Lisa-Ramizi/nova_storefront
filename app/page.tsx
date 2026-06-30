import { ProductListing } from "@/components/product/ProductListing";
import { getCategories, getProducts } from "@/services/products";

export default async function Home() {
  const [{ products }, categories] = await Promise.all([getProducts(), getCategories()]);

  const categoryLabels = ["All", ...categories.map((category) => category.name)];

  return <ProductListing products={products} categoryLabels={categoryLabels} />;
}
