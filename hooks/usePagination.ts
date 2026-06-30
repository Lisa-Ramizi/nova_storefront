"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const PRODUCTS_PER_PAGE = 20;

export function usePagination<T>(items: T[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(items.length / PRODUCTS_PER_PAGE));
  const requestedPage = Number(searchParams.get("page")) || 1;
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return items.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [items, currentPage]);

  const setPage = useCallback(
    (page: number) => {
      const nextPage = Math.min(Math.max(1, page), totalPages);
      const params = new URLSearchParams(searchParams.toString());

      if (nextPage <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(nextPage));
      }

      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [pathname, router, searchParams, totalPages],
  );

  return {
    paginatedItems,
    currentPage,
    totalPages,
    setPage,
  };
}
