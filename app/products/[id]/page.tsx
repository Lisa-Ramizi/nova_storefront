import { ProductDetail } from "@/components/product/ProductDetail";
import { getCategories, getProduct } from "@/services/products";
import { formatCategoryName } from "@/utils/formatCategoryName";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProduct(id), getCategories()]);

  const categoryName =
    categories.find((category) => category.slug === product.category)?.name ??
    formatCategoryName(product.category);

  return <ProductDetail product={product} categoryName={categoryName} />;
}
