import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";

export default function ImpressumPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="NEGATIVE DIALEKTIK"
        title="Impressum"
        lead="Angaben gemäß § 5 TMG"
      />

      <RichText>
        <p>
          Negative Dialektik<br />
          Institut für deutsche Philosophie<br />
          Tunja, Kolumbien
        </p>

        <p>
          E-Mail: info@negative-dialektik.com
        </p>

        <h2>Verantwortlich für den Inhalt</h2>
        <p>
          Josef Hackspacher
        </p>
      </RichText>
    </PageShell>
  );
}