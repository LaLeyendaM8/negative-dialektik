import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";

export default function DatenschutzPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Negative Dialektik"
        title="Datenschutz"
        lead="Hinweise zur Verarbeitung personenbezogener Daten im Rahmen dieser Website."
      />

      <RichText>
        <p>
          Der Schutz personenbezogener Daten ist uns ein wichtiges Anliegen. Im
          Folgenden informieren wir in grundsätzlicher Form über Art, Umfang und
          Zweck der Verarbeitung personenbezogener Daten auf dieser Website.
        </p>

        <h2>Verantwortlicher</h2>

        <p>
          [Name / Institution]
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ Ort]
          <br />
          [Land]
          <br />
          E-Mail: [info@negative-dialektik.com]
        </p>

        <h2>Erhebung und Verarbeitung von Daten</h2>

        <p>
          Beim Besuch dieser Website können technisch erforderliche Daten
          verarbeitet werden, insbesondere solche, die für die Bereitstellung,
          Stabilität und Sicherheit der Website notwendig sind.
        </p>

        <h2>Kontaktaufnahme</h2>

        <p>
          Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen
          übermittelten Angaben zum Zweck der Bearbeitung Ihrer Anfrage und für
          mögliche Anschlussfragen gespeichert.
        </p>

        <h2>Rechte der betroffenen Personen</h2>

        <p>
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen das Recht
          auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung
          sowie gegebenenfalls auf Datenübertragbarkeit und Widerspruch.
        </p>

        <h2>Hinweis</h2>

        <p>
          Diese Seite ist in der aktuellen Relaunch-Phase als strukturelle
          Vorlage angelegt. Vor der Veröffentlichung muss eine vollständige und
          rechtlich geprüfte Datenschutzerklärung ergänzt werden, abgestimmt auf
          Hosting, Analyse-Tools, Formulare und sonstige tatsächlich eingesetzte
          Dienste.
        </p>
      </RichText>
    </PageShell>
  );
}