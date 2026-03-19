import { Container } from "../layout/container";
import Link from "next/link";

type MissionProps = {
  mission: {
    title: string;
    paragraphs: string[];
    keywords: string[];
    link?: {
      label: string;
      href: string;
    };
  };
};

export function Mission({ mission }: MissionProps) {
  return (
    <section className="border-t border-[var(--color-border)] py-[120px] md:py-[140px]">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h2
              className="text-[46px] leading-[1.05] md:text-[56px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {mission.title}
            </h2>
          </div>

          <div className="max-w-[620px]">
            {mission.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-[18px] leading-[1.7] ${
                  index === 0
                    ? "mb-6 text-[var(--color-text)]"
                    : "mb-8 text-[var(--color-text-secondary)]"
                }`}
              >
                {paragraph}
              </p>
            ))}

            <div className="text-[13px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
  {mission.keywords.join(" · ")}
</div>

{mission.link && (
  <div className="mt-8">
    <Link
      href={mission.link.href}
      className="text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] underline underline-offset-4 transition-opacity hover:opacity-70"
    >
      {mission.link.label}
    </Link>
  </div>
)}
          </div>
        </div>
      </Container>
    </section>
  );
}