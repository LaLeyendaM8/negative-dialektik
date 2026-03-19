import Link from "next/link";
import { Container } from "../layout/container";

type AcademyPreviewProps = {
  lang: string;
  academy: {
    title: string;
    paragraphs: string[];
    link: {
      label: string;
      href: string;
    };
  };
};

export function AcademyPreview({ lang, academy }: AcademyPreviewProps) {
  return (
    <section className="border-t border-[var(--color-border)] py-[120px] md:py-[140px]">
      <Container>
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div>
            <h2
              className="text-[46px] leading-[1.05] md:text-[56px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {academy.title}
            </h2>
          </div>

          <div className="max-w-[720px]">
            {academy.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-[18px] leading-[1.7] ${
                  index !== academy.paragraphs.length - 1 ? "mb-6" : "mb-8"
                } ${
                  index === 0
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-secondary)]"
                }`}
              >
                {paragraph}
              </p>
            ))}

            <Link
              href={`/${lang}${academy.link.href}`}
              className="text-[16px] underline underline-offset-4"
            >
              {academy.link.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}