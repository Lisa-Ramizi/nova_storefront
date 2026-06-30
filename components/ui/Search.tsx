"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/ui/icons";
import { useSearch } from "@/hooks/useSearch";

type SearchProps = {
  className?: string;
};

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
  id?: string;
};

function SearchInput({
  value,
  onChange,
  className = "",
  autoFocus = false,
  id = "product-search",
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted">
        <SearchIcon />
      </span>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products"
        autoFocus={autoFocus}
        className="h-10 w-full rounded-lg border border-border bg-[#f9fafb] py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

export function Search({ className = "" }: SearchProps) {
  const { query, setQuery } = useSearch();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={className}>
      {mobileOpen ? (
        <SearchInput
          id="product-search-mobile"
          value={query}
          onChange={setQuery}
          autoFocus
          className="w-44 sm:w-52 md:hidden"
        />
      ) : (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted md:hidden"
          aria-label="Open search"
          aria-expanded={mobileOpen}
        >
          <SearchIcon />
        </button>
      )}

      <SearchInput
        id="product-search-desktop"
        value={query}
        onChange={setQuery}
        className="hidden md:block md:w-72 lg:w-80"
      />
    </div>
  );
}
