type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <ul className="flex items-center gap-1">
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`min-w-10 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-surface text-foreground hover:bg-[#f9fafb]"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}
