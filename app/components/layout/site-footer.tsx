import Link from "next/link";
import { Container } from "./container";

type FooterLink = {
  label: string;
  href: string;
};

type SiteFooterProps = {
  lang: string;
  links: FooterLink[];
  brand: string;
  rights: string;
};

export function SiteFooter({ lang, links, brand, rights }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--color-border)] py-14">
      <Container>
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Link href={`/${lang}`} className="mb-3 block shrink-0">
              <img
                src="/logo/logo.svg"
                alt="Negative Dialektik"
                className="h-auto w-[56px] dark:invert"
              />
            </Link>

            <p className="text-[14px] text-[var(--color-text-secondary)]">
              {brand}
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 md:gap-8">
            {links.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className="text-[14px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-[var(--color-border)] pt-8">
          <p className="text-center text-[12px] text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} {brand}. {rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}