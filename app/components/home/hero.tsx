import Link from "next/link";
import { Container } from "../layout/container";

type HeroProps = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    quote?: {
      source: string;
      text: string;
    };
  };
  focusItems: {
    href: string;
    label: string;
    description: string;
  }[];
};

export function Hero({ hero, focusItems }: HeroProps) {
  return (
    <section className="py-[120px] md:py-[150px] xl:py-[180px]">
      <Container>
        <div className="grid grid-cols-1 gap-16 xl:grid-cols-[1.05fr_0.95fr] xl:gap-20">
          <div className="max-w-[900px]">
            <p
  className="mb-4 text-[34px] leading-[0.98] tracking-[-0.03em] text-[var(--color-text)] sm:text-[44px] md:text-[58px]"
  style={{ fontFamily: "var(--font-serif)" }}
>
  {hero.eyebrow}
</p>

            <h1
  className="mb-8 text-[20px] leading-[1.25] tracking-[-0.01em] text-[var(--color-text-secondary)] sm:text-[24px] md:text-[28px]"
  style={{ fontFamily: "var(--font-serif)" }}
>
  {hero.title}
</h1>

            <p className="mb-10 max-w-[720px] text-[19px] leading-[1.7] md:text-[20px]">
              {hero.lead}
            </p>

            {hero.quote ? (
              <blockquote className="max-w-[720px] border-l border-[var(--color-border)] pl-6">
                <p
                  className="text-[20px] leading-[1.6] text-[var(--color-text)] md:text-[22px]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {hero.quote.text}
                </p>
                <footer className="mt-4 text-[13px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                  {hero.quote.source}
                </footer>
              </blockquote>
            ) : null}
          </div>

          <div className="self-start xl:pt-6 xl:flex xl:justify-start">
  <div className="self-start w-full max-w-[720px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-10">
    <p className="mb-8 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
      Institutionelle Struktur
    </p>

    <div>
      {focusItems.map((item) => (
        <div
          key={item.href}
          className="border-b border-[var(--color-border)] py-6 first:pt-0 last:border-b-0 last:pb-0"
        >
          <Link href={item.href} className="group block">
            <p
  className="text-[28px] uppercase tracking-[0.05em] leading-[1.08] text-[var(--color-text)] transition-opacity group-hover:opacity-75 md:text-[30px]"
  style={{ fontFamily: "var(--font-serif)" }}
>
  {item.label}
</p>
<p className="mt-2 text-[14px] text-[var(--color-text-secondary)]">
  {item.description}
</p>
          </Link>
        </div>
      ))}
    </div>
  </div>
</div>
        </div>
      </Container>
    </section>
  );
}