import { ProductBreadcrumbs } from "@/components/product/ProductBreadcrumbs";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import type { Product } from "@/types/product";

type ProductDetailProps = {
  product: Product;
  categoryName: string;
};

function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M7 1.167 8.472 4.75l3.861.306-2.944 2.528 0.889 3.75L7 9.639l-3.278 1.695 0.889-3.75L1.667 5.056l3.861-0.306L7 1.167Z"
        fill="#FBBF24"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M2 2h1.2l1.4 7.2a1.2 1.2 0 0 0 1.18.96h5.84a1.2 1.2 0 0 0 1.18-0.96L14 5.2H4.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="13" r="1" fill="currentColor" />
      <circle cx="11.5" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

function formatAvailability(status?: string, shipping?: string): string {
  const stockLabel = status ?? "In stock";
  const shippingLabel = shipping?.replace(/^Ships in /i, "ships in ").replace(/ business days/i, " days");

  return shippingLabel ? `${stockLabel} — ${shippingLabel}` : stockLabel;
}

export function ProductDetail({ product, categoryName }: ProductDetailProps) {
  const images = product.images?.length ? product.images : product.image ? [product.image] : [];

  const specs = [
    { label: "Brand", value: product.brand },
    { label: "SKU", value: product.sku },
    { label: "Warranty", value: product.warrantyInformation },
    { label: "Shipping", value: product.shippingInformation },
  ].filter((spec) => spec.value);

  return (
    <main className="space-y-6">
      <ProductBreadcrumbs categoryName={categoryName} productTitle={product.title} />

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

            <div className="mb-4 flex items-center gap-2 text-sm">
              <StarIcon />
              <span className="font-medium text-primary">
                {product.rating.toFixed(2)} · {product.reviewCount} reviews
              </span>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-bold text-foreground sm:text-3xl">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice !== undefined ? (
                <span className="text-lg text-foreground-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              ) : null}
              {product.discountLabel ? (
                <span className="rounded-md bg-[#fef2f2] px-2 py-0.5 text-sm font-semibold text-[#ef4444]">
                  {product.discountLabel}
                </span>
              ) : null}
            </div>

            <p className="mb-6 text-sm leading-relaxed text-foreground-muted sm:text-base">
              {product.description}
            </p>

            <div className="mb-6 flex items-center gap-2 text-sm font-medium text-[#16a34a]">
              <span className="h-2 w-2 rounded-full bg-[#16a34a]" aria-hidden="true" />
              {formatAvailability(product.availabilityStatus, product.shippingInformation)}
            </div>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuantitySelector />
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <CartIcon />
                Add to cart
              </button>
              <button
                type="button"
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
