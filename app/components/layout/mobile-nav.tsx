"use client";

import { useState } from "react";
import Link from "next/link";

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

type MobileNavProps = {
  lang: string;
  navigation: NavigationItem[];
  uiText: UiText;
};

export function MobileNav({ lang, navigation, uiText }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={
          isOpen ? uiText.mobileNav.closeAria : uiText.mobileNav.openAria
        }
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex min-h-[44px] items-center justify-center text-[15px] uppercase tracking-[0.08em] md:hidden"
      >
        {isOpen ? uiText.mobileNav.close : uiText.mobileNav.open}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--color-background)] md:hidden">
          <div className="flex min-h-screen flex-col px-4 pb-8 pt-6 sm:px-6">
            <div className="mb-10 flex items-center justify-end">
              <button
                type="button"
                aria-label={uiText.mobileNav.closeAria}
                onClick={() => setIsOpen(false)}
                className="inline-flex min-h-[44px] items-center justify-center text-[15px] uppercase tracking-[0.08em]"
              >
                {uiText.mobileNav.close}
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={`/${lang}${item.href}`}
                  onClick={() => setIsOpen(false)}
                  className="text-[32px] leading-[1.05] text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}