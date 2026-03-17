import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";

export default function DatenschutzPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="NEGATIVE DIALEKTIK"
        title="Datenschutz"
        lead="Informationen zur Verarbeitung personenbezogener Daten"
      />

      <RichText>
        <p>
          Die Nutzung dieser Website ist in der Regel ohne Angabe personenbezogener Daten möglich.
        </p>

        <h2>Kontaktformular</h2>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben
          zwecks Bearbeitung der Anfrage bei uns gespeichert.
        </p>

        <h2>Server-Log-Dateien</h2>
        <p>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
          Server-Log-Dateien.
        </p>

        <h2>Ihre Rechte</h2>
        <p>
          Sie haben jederzeit das Recht auf Auskunft, Berichtigung oder Löschung Ihrer Daten.
        </p>
      </RichText>
    </PageShell>
  );
}