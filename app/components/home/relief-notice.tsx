import { Container } from "../layout/container";

type ReliefNoticeProps = {
  notice: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    signature: string[];
  };
};

export function ReliefNotice({ notice }: ReliefNoticeProps) {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-card)] py-12 md:py-16">
      <Container>
        <div className="grid gap-8 border border-[var(--color-border)] bg-[var(--color-surface)] p-7 md:grid-cols-[0.42fr_1fr] md:p-10 xl:p-12">
          <div>
            <p className="text-[12px] uppercase tracking-[0.16em] text-[#d7a642]">
              {notice.eyebrow}
            </p>
            <h2
              className="mt-4 max-w-[13ch] text-[34px] leading-[1.05] text-[var(--color-text)] md:text-[44px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {notice.title}
            </h2>
          </div>

          <div className="max-w-[820px]">
            {notice.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[18px] leading-[1.75] text-[var(--color-text)] md:text-[20px]"
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-8 border-l border-[var(--color-border)] pl-5 text-[13px] uppercase tracking-[0.13em] text-[var(--color-text-secondary)]">
              {notice.signature.map((line) => (
                <p key={line} className="mt-1 first:mt-0">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
