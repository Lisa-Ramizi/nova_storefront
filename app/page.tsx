import { ProductListing } from "@/components/product/ProductListing";
import { getCategories, getProducts } from "@/services/products";

export default async function Home() {
  const [{ products }, categories] = await Promise.all([getProducts(), getCategories()]);

  return <ProductListing products={products} categories={categories} />;
}
