import Link from "next/link";
import { Container } from "../layout/container";

export function ClosingCta() {
  return (
    <section className="border-t border-[var(--color-border)] py-[110px]">
      <Container>
        <div className="max-w-[780px]">
          <h2
            className="mb-6 text-[40px] leading-[1.1] md:text-[48px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Negative Dialektik verbindet editorische Arbeit, Übersetzung und
            philosophische Vermittlung in einem internationalen Projekt.
          </h2>

          <div className="flex flex-wrap gap-6">
            <Link
              href="/katalog"
              className="text-[16px] underline underline-offset-4"
            >
              Katalog entdecken
            </Link>

            <Link
              href="/kontakt"
              className="text-[16px] underline underline-offset-4"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}