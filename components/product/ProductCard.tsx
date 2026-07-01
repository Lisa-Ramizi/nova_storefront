import Image from "next/image";
import { CartIcon, HeartIcon, ImagePlaceholderIcon, StarIcon } from "@/components/ui/icons";
import type { ProductCardProps } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";

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
            <span className="sr-only">Discount </span>
            {discountLabel}
          </span>
        ) : null}

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onWishlistClick?.();
          }}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground"
          aria-label={`Add ${title} to wishlist`}
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
          <div className="flex h-full w-full items-center justify-center" role="img" aria-label="No product image">
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

      <div
        className="mb-2 flex items-center gap-1.5 text-sm"
        aria-label={`${rating.toFixed(2)} out of 5 stars, ${reviewCount} reviews`}
      >
        <StarIcon />
        <span className="font-semibold text-foreground" aria-hidden="true">
          {rating.toFixed(2)}
        </span>
        <span className="text-foreground-muted" aria-hidden="true">
          ({reviewCount})
        </span>
      </div>

      <div className="mb-4 flex flex-wrap items-baseline gap-2">
        <span className="text-lg font-bold text-foreground">{formatPrice(price)}</span>
        {originalPrice !== undefined ? (
          <span className="text-sm text-foreground-muted line-through">
            <span className="sr-only">Original price </span>
            {formatPrice(originalPrice)}
          </span>
        ) : null}
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onAddToCart?.();
        }}
        aria-label={`Add ${title} to cart`}
        className={`mt-auto flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
          inCart
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-primary bg-surface text-primary hover:bg-primary/5"
        }`}
      >
        <CartIcon />
        {inCart ? "In cart" : "Add to cart"}
      </button>
    </article>
  );
}
