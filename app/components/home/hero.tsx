import Link from "next/link";
import { Container } from "../layout/container";

export function Hero() {
  return (
    <section className="py-[120px] md:py-[150px] xl:py-[180px]">
      <Container>
        <div className="grid grid-cols-1 gap-16 xl:grid-cols-[1.05fr_0.95fr] xl:gap-20">
          <div className="max-w-[860px]">
            <p className="mb-7 text-[12px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              INTERNATIONALES EDITIONSINSTITUT
            </p>

            <h1
              className="mb-9 max-w-[12ch] text-[52px] leading-[0.95] tracking-[-0.04em] sm:text-[60px] lg:text-[70px] xl:text-[78px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Editionen deutscher Philosophie im spanischsprachigen Raum
            </h1>

            <p className="mb-11 max-w-[720px] text-[19px] leading-[1.7] md:text-[20px]">
              Negative Dialektik veröffentlicht, übersetzt und vermittelt
              zentrale Texte der deutschen Philosophie, Kritischen Theorie und
              Sozialtheorie für einen internationalen Kontext.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/katalog"
                className="inline-flex items-center justify-center bg-[var(--color-text)] px-8 py-3 text-[15px] text-[var(--color-background)] transition-opacity hover:opacity-90"
              >
                Katalog entdecken
              </Link>

              <Link
                href="/verlag"
                className="inline-flex items-center justify-center border border-[var(--color-text)] px-8 py-3 text-[15px] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
              >
                Über den Verlag
              </Link>
            </div>
          </div>

          <div className="xl:pt-6">
            <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-10">
              <p className="mb-8 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                EDITORIAL FOCUS
              </p>

              <div>
                <div className="border-b border-[var(--color-border)] pb-6">
                  <p className="mb-2 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                    Schwerpunkt
                  </p>
                  <p
                    className="text-[30px] leading-[1.1]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Philosophie
                  </p>
                </div>

                <div className="border-b border-[var(--color-border)] py-6">
                  <p className="mb-2 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                    Feld
                  </p>
                  <p
                    className="text-[30px] leading-[1.1]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Kritische Theorie
                  </p>
                </div>

                <div className="pt-6">
                  <p className="mb-2 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                    Praxis
                  </p>
                  <p
                    className="text-[30px] leading-[1.1]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Übersetzung & Vermittlung
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}