import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";

export default function ImpressumPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Negative Dialektik"
        title="Impressum"
        lead="Angaben gemäß den geltenden gesetzlichen Informationspflichten."
      />

      <RichText>
        <p>
          <strong>Negative Dialektik</strong>
        </p>

        <p>
          [Name des Verantwortlichen]
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ Ort]
          <br />
          [Land]
        </p>

        <p>
          E-Mail: [info@negative-dialektik.com]
          <br />
          Telefon: [Telefonnummer]
        </p>

        <h2>Verantwortlich für den Inhalt</h2>

        <p>
          [Name des Verantwortlichen]
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ Ort]
        </p>

        <h2>Hinweis</h2>

        <p>
          Diese Seite dient in der aktuellen Relaunch-Phase als strukturelle
          Vorlage. Die endgültigen rechtlichen Angaben müssen vor der
          Veröffentlichung vollständig geprüft und ergänzt werden.
        </p>
      </RichText>
    </PageShell>
  );
}