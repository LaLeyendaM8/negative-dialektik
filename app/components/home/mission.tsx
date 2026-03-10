import { Container } from "../layout/container";

export function Mission() {
  return (
    <section className="border-t border-[var(--color-border)] py-[120px] md:py-[140px]">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h2
              className="text-[46px] leading-[1.05] md:text-[56px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Der Verlag
            </h2>
          </div>

          <div className="max-w-[620px]">
            <p className="mb-6 text-[18px] leading-[1.7]">
              Negative Dialektik ist ein unabhängiger Verlag, der sich der
              Übersetzung, Edition und Vermittlung zentraler Texte der deutschen
              Philosophie widmet.
            </p>

            <p className="mb-8 text-[18px] leading-[1.7] text-[var(--color-text-secondary)]">
              Unser Fokus liegt auf der Kritischen Theorie,
              Sozialphilosophie und politischen Theorie. Wir arbeiten mit
              Übersetzern und Wissenschaftlern zusammen, um hochwertige
              Editionen zu schaffen, die philosophische Debatten im
              spanischsprachigen Raum erweitern.
            </p>

            <div className="flex flex-wrap gap-6 text-[13px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
              <span>Edition</span>
              <span>Übersetzung</span>
              <span>Vermittlung</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}