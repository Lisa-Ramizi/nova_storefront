import Image from "next/image";
import type { ProductCardProps } from "@/types/product";

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

function HeartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 15.75 7.912 14.74C4.05 11.19 1.5 8.865 1.5 6.094 1.5 3.84 3.255 2.25 5.438 2.25c1.2 0 2.355.562 3.062 1.462C9.207 2.812 10.362 2.25 11.562 2.25 13.745 2.25 15.5 3.84 15.5 6.094c0 2.771-2.55 5.096-6.412 8.646L9 15.75Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
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

function ImagePlaceholderIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="text-[#d1d5db]"
    >
      <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="20" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10 34l10-10 6 6 4-4 8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProductCard({
  image,
  imageAlt,
  category,
  title,
  description,
  rating,
  reviewCount,
  price,
  originalPrice,
  discountLabel,
  inCart = false,
  onAddToCart,
  onWishlistClick,
}: ProductCardProps) {
  return (
    <article className="flex w-full flex-col rounded-xl border border-border bg-surface p-4">
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-[#f3f4f6]">
        {discountLabel ? (
          <span className="absolute left-2 top-2 z-10 rounded-md bg-[#ef4444] px-2 py-0.5 text-xs font-semibold text-white">
            {discountLabel}
          </span>
        ) : null}

        <button
          type="button"
          onClick={onWishlistClick}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground"
          aria-label="Add to wishlist"
        >
          <HeartIcon />
        </button>

        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            unoptimized
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImagePlaceholderIcon />
          </div>
        )}
      </div>

      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-foreground-muted">
        {category}
      </p>

      <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground sm:text-base">
        {title}
      </h3>

      <p className="mb-2 line-clamp-2 text-sm text-foreground-muted">{description}</p>

      <div className="mb-2 flex items-center gap-1.5 text-sm">
        <StarIcon />
        <span className="font-semibold text-foreground">{rating.toFixed(2)}</span>
        <span className="text-foreground-muted">({reviewCount})</span>
      </div>

      <div className="mb-4 flex flex-wrap items-baseline gap-2">
        <span className="text-lg font-bold text-foreground">{formatPrice(price)}</span>
        {originalPrice !== undefined ? (
          <span className="text-sm text-foreground-muted line-through">
            {formatPrice(originalPrice)}
          </span>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onAddToCart}
        className={`mt-auto flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
          inCart
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-primary bg-surface text-primary hover:bg-primary/5"
        }`}
      >
        <CartIcon />
        Add to cart
      </button>
    </article>
  );
}
