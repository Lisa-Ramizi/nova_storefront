import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { label: "Shop", href: "/", active: true },
  { label: "New", href: "#" },
  { label: "Deals", href: "#" },
  { label: "About", href: "#" },
];

export function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`text-sm transition-colors hover:text-foreground ${
                item.active
                  ? "font-semibold text-foreground"
                  : "font-medium text-foreground-muted"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
