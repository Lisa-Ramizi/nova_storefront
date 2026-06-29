import { Logo } from "@/components/layout/Logo";
import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center px-[var(--spacing-page-x)]">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden md:block">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}
