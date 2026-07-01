"use client";

import { useState } from "react";
import { BackLink } from "@/components/product/BackLink";
import { ProductBreadcrumbs } from "@/components/product/ProductBreadcrumbs";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { CartIcon, StarIcon } from "@/components/ui/icons";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";
import { formatAvailability } from "@/utils/formatAvailability";
import { formatPrice } from "@/utils/formatPrice";

type ProductDetailProps = {
  product: Product;
  categoryName: string;
};

export function ProductDetail({ product, categoryName }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart } = useCart();
  const images = product.images?.length ? product.images : product.image ? [product.image] : [];
  const inCart = isInCart(product.id);

  const specs = [
    { label: "Brand", value: product.brand },
    { label: "SKU", value: product.sku },
    { label: "Warranty", value: product.warrantyInformation },
    { label: "Shipping", value: product.shippingInformation },
  ].filter((spec) => spec.value);

  return (
    <main className="space-y-6">
      <BackLink />
      <ProductBreadcrumbs
        categoryName={categoryName}
        categorySlug={product.category}
        productTitle={product.title}
      />

      <article className="rounded-xl border border-border bg-surface p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductImageGallery images={images} alt={product.imageAlt} />

          <div className="flex flex-col">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-foreground-muted">
              {categoryName}
            </p>

            <h1 className="mb-3 text-2xl font-semibold text-foreground sm:text-3xl">
              {product.title}
            </h1>

            <div
              className="mb-4 flex items-center gap-2 text-sm"
              aria-label={`${product.rating.toFixed(2)} out of 5 stars, ${product.reviewCount} reviews`}
            >
              <StarIcon />
              <span className="font-medium text-primary" aria-hidden="true">
                {product.rating.toFixed(2)} · {product.reviewCount} reviews
              </span>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-bold text-foreground sm:text-3xl">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice !== undefined ? (
                <span className="text-lg text-foreground-muted line-through">
                  <span className="sr-only">Original price </span>
                  {formatPrice(product.originalPrice)}
                </span>
              ) : null}
              {product.discountLabel ? (
                <span className="rounded-md bg-[#fef2f2] px-2 py-0.5 text-sm font-semibold text-[#ef4444]">
                  <span className="sr-only">Discount </span>
                  {product.discountLabel}
                </span>
              ) : null}
            </div>

            <p className="mb-6 text-sm leading-relaxed text-foreground-muted sm:text-base">
              {product.description}
            </p>

            <p className="mb-6 flex items-center gap-2 text-sm font-medium text-[#16a34a]">
              <span className="h-2 w-2 rounded-full bg-[#16a34a]" aria-hidden="true" />
              {formatAvailability(product.availabilityStatus, product.shippingInformation)}
            </p>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <button
                type="button"
                onClick={() => addToCart(product, quantity)}
                aria-label={`Add ${product.title} to cart`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <CartIcon />
                {inCart ? "Add more to cart" : "Add to cart"}
              </button>
              <button
                type="button"
                aria-label={`Buy ${product.title} now`}
                className="flex flex-1 items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-[#f9fafb] sm:flex-initial sm:px-6"
              >
                Buy now
              </button>
            </div>

            {specs.length > 0 ? (
              <dl className="mt-auto grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="mb-1 text-sm text-foreground-muted">{spec.label}</dt>
                    <dd className="text-sm font-semibold text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
      </article>
    </main>
  );
}
