import { CartLink } from "@/components/layout/CartLink";
import { Logo } from "@/components/layout/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { Search } from "@/components/ui/Search";

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center justify-between px-[var(--spacing-page-x)]">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden md:block">
            <Navigation />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Search />
          <CartLink />
        </div>
      </div>
    </header>
  );
}
