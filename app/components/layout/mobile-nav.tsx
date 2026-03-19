"use client";
import { uiText } from "../../content/site/ui";
import { useState } from "react";
import Link from "next/link";

type NavigationItem = {
  label: string;
  href: string;
};

type MobileNavProps = {
  navigation: NavigationItem[];
};

export function MobileNav({ navigation }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? uiText.mobileNav.closeAria : uiText.mobileNav.openAria}
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex min-h-[44px] items-center justify-center text-[15px] uppercase tracking-[0.08em] text-[var(--color-text)] transition-opacity hover:opacity-70 md:hidden"
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
                className="inline-flex min-h-[44px] items-center justify-center text-[15px] uppercase tracking-[0.08em] text-[var(--color-text)] transition-opacity hover:opacity-70"
              >
                {uiText.mobileNav.close}
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
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