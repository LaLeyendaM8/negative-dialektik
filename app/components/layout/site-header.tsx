import Link from "next/link";
import { Container } from "./container";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  navigation: NavigationItem[];
};

export function SiteHeader({ navigation }: SiteHeaderProps) {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
      <Container>
        <div className="flex items-center justify-between py-7 md:py-8">
          <Link
            href="/"
            className="text-[30px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            -D
          </Link>

          <nav className="hidden items-center gap-8 md:flex lg:gap-12">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] transition-opacity hover:opacity-70 lg:text-[15px]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="text-[15px] md:hidden">Menü</div>
        </div>
      </Container>
    </header>
  );
}