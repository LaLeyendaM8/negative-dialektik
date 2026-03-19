"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";

type NavigationItem = {
  label: string;
  href: string;
};

type UiText = {
  mobileNav: {
    open: string;
    close: string;
    openAria: string;
    closeAria: string;
  };
};

type SiteHeaderProps = {
  lang: string;
  navigation: NavigationItem[];
  uiText: UiText;
};

function LanguageSwitch({ lang }: { lang: string }) {
  const pathname = usePathname();
  const newLang = lang === "de" ? "es" : "de";
  const newPath = pathname.replace(`/${lang}`, `/${newLang}`);

  return (
    <Link
      href={newPath}
      className="text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] transition-opacity hover:opacity-70"
    >
      {newLang.toUpperCase()}
    </Link>
  );
}

export function SiteHeader({ lang, navigation, uiText }: SiteHeaderProps) {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
      <Container>
        <div className="flex items-center justify-between py-6 md:py-8">
          <Link href={`/${lang}`} className="shrink-0 text-[var(--color-text)]">
            <img
              src="/logo/logo.svg"
              alt="Negative Dialektik"
              className="h-auto w-[56px] md:w-[64px] dark:invert"
            />
          </Link>

          <div className="flex items-center gap-6 md:gap-8">
            <nav className="hidden items-center gap-8 md:flex lg:gap-12">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={`/${lang}${item.href}`}
                  className="text-[14px] transition-opacity hover:opacity-70 lg:text-[15px]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <LanguageSwitch lang={lang} />

            <MobileNav
              lang={lang}
              navigation={navigation}
              uiText={uiText}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}