import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";

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
    <div className="flex items-center justify-between py-6 md:py-8">
      <Link href="/" className="shrink-0 text-[var(--color-text)]">
        <Image
          src="/logo/logo.svg"
          alt="Negative Dialektik"
          width={56}
          height={32}
          className="h-auto w-[56px] md:w-[64px]"
          priority
        />
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

      <MobileNav navigation={navigation} />
    </div>
  </Container>
</header>
  );
}