import { Container } from "../layout/container";

type ProgramItem = {
  title: string;
  description: string;
};

type ProgramProps = {
  items: ProgramItem[];
};

export function Program({ items }: ProgramProps) {
  return (
    <section className="border-t border-[var(--color-border)] py-[120px] md:py-[140px]">
      <Container>
        <h2
          className="mb-16 text-[46px] leading-[1.05] md:text-[64px]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Verlagsprogramm
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.title}>
              <h3
                className="mb-4 text-[28px]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {item.title}
              </h3>

              <p className="text-[17px] leading-[1.7] text-[var(--color-text-secondary)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}