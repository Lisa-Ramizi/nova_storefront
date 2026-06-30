import Link from "next/link";

type ProductBreadcrumbsProps = {
  categoryName: string;
  productTitle: string;
};

export function ProductBreadcrumbs({ categoryName, productTitle }: ProductBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-foreground-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-foreground">
            Shop
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>{categoryName}</li>
        <li aria-hidden="true">/</li>
        <li className="font-medium text-foreground">{productTitle}</li>
      </ol>
    </nav>
  );
}
