import Link from "next/link";
import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { SectionHeading } from "../components/ui/section-heading";

export default function KontaktPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Negative Dialektik"
        title="Kontakt"
        lead="Für verlegerische Anfragen, Kooperationen, institutionelle Zusammenarbeit und programmbegleitende Projekte."
      />

      <section>
        <SectionHeading
          title="Allgemeine Anfragen"
          subtitle="Für Rückfragen zum Verlag, zu Kooperationen oder zum laufenden Programm."
        />

        <RichText>
          <p>
            E-Mail:{" "}
            <Link
              href="mailto:info@negative-dialektik.com"
              className="underline underline-offset-4"
            >
              info@negative-dialektik.com
            </Link>
          </p>
        </RichText>
      </section>

      <section className="mt-16">
        <SectionHeading
          title="Bereiche"
          subtitle="Anfragen können sich unter anderem auf folgende Felder beziehen."
        />

        <RichText>
          <ul>
            <li>Verlag und Katalog</li>
            <li>Übersetzungsprojekte</li>
            <li>Akademische Kooperationen</li>
            <li>Stiftungs- und Bildungsprojekte</li>
            <li>Institutionelle Partnerschaften</li>
          </ul>
        </RichText>
      </section>

      <section className="mt-16">
        <SectionHeading
          title="Hinweis"
          subtitle="Die Kontaktseite kann später um ein Formular, weitere Ansprechpartner oder institutionelle Adressen ergänzt werden."
        />

        <RichText>
          <p>
            In der aktuellen Relaunch-Phase dient diese Seite zunächst als
            ruhiger, editorischer Kontaktpunkt. Zusätzliche Informationen können
            später strukturiert ergänzt werden, ohne das Grundlayout zu verändern.
          </p>
        </RichText>
      </section>
    </PageShell>
  );
}