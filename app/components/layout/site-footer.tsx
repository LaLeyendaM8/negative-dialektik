import Image from "next/image";
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
        <div className="flex flex-col items-center gap-8">
          <Link href={`/${lang}`} className="block shrink-0">
            <Image
              src="/logo/logo.svg"
              alt="Negative Dialektik"
              width={92}
              height={56}
              className="mx-auto h-auto w-[78px] dark:invert md:w-[92px]"
            />
          </Link>

          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
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
