type SearchProps = {
  className?: string;
};

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12.5 12.5 16 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Search({ className = "" }: SearchProps) {
  return (
    <div className={className}>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted md:hidden"
        aria-label="Search products"
      >
        <SearchIcon />
      </button>

      <div className="relative hidden md:block md:w-72 lg:w-80">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted">
          <SearchIcon />
        </span>
        <input
          type="search"
          placeholder="Search products"
          aria-label="Search products"
          className="h-10 w-full rounded-lg border border-border bg-[#f9fafb] py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}
