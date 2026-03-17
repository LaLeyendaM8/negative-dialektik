import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";

type FooterLink = {
  label: string;
  href: string;
};

type SiteFooterProps = {
  links: FooterLink[];
};

export function SiteFooter({ links }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--color-border)] py-14">
      <Container>
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Link href="/" className="mb-3 block shrink-0 text-[var(--color-text)]">
              <Image
                src="/logo/logo.svg"
                alt="Negative Dialektik"
                width={56}
                height={32}
                className="h-auto w-[56px]"
              />
            </Link>

            <p className="text-[14px] text-[var(--color-text-secondary)]">
              Negative Dialektik
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 md:gap-8">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-[var(--color-border)] pt-8">
          <p className="text-center text-[12px] text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} Negative Dialektik. Alle Rechte vorbehalten.
          </p>
        </div>
      </Container>
    </footer>
  );
}