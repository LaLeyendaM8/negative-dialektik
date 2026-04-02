import Link from "next/link";
import { Container } from "../layout/container";

type ClosingCtaProps = {
  lang: string;
  closing: {
    title: string;
    paragraphs?: string[];
    links: {
      label: string;
      href: string;
    }[];
  };
};

export function ClosingCta({ lang, closing }: ClosingCtaProps) {
  return (
    <section className="border-t border-[var(--color-border)] py-[110px]">
      <Container>
        <div className="max-w-[780px]">
          <h2
            className="mb-6 text-[40px] leading-[1.1] md:text-[48px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {closing.title}
          </h2>

          {closing.paragraphs?.map((paragraph, index) => (
            <p
              key={index}
              className="mb-6 text-[18px] leading-[1.7] text-[var(--color-text-secondary)] md:text-[21px]"
            >
              {paragraph}
            </p>
          ))}

          <div className="flex flex-wrap gap-6">
            {closing.links.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className="text-[16px] underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
