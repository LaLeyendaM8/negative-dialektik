import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { SectionHeading } from "../components/ui/section-heading";

export default function AutorenPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Negative Dialektik"
        title="Autoren"
        lead="Die Autoren des Verlags bilden den begrifflichen und editorischen Horizont von Negative Dialektik."
      />

      <RichText>
        <p>
          Negative Dialektik arbeitet mit Autoren, deren Texte innerhalb der
          deutschen und europäischen Philosophie grundlegende Probleme, Begriffe
          und Denkbewegungen geprägt haben. Die Autoren des Verlags stehen nicht
          nur für einzelne Werke, sondern für intellektuelle Konstellationen,
          die bis in die Gegenwart hinein wirksam sind.
        </p>

        <p>
          Die Autorenseite wird mit dem Ausbau des Katalogs schrittweise um
          einzelne Profile, Werkzusammenhänge und editorische Einordnungen
          ergänzt. In der ersten Relaunch-Phase bildet sie den strukturellen
          Rahmen für ein später wachsendes Autorenarchiv.
        </p>
      </RichText>

      <section className="mt-16">
        <SectionHeading
          title="Erste Linien"
          subtitle="Der Verlag konzentriert sich auf Autoren, deren Werk innerhalb zentraler philosophischer Traditionen orientierend wirkt."
        />

        <RichText>
          <ul>
            <li>Theodor W. Adorno</li>
            <li>Max Horkheimer</li>
            <li>Georg Lukács</li>
            <li>Autoren der Kritischen Theorie</li>
            <li>Autoren des deutschen Idealismus</li>
            <li>Autoren der deutschen Romantik</li>
          </ul>
        </RichText>
      </section>

      <section className="mt-16">
        <SectionHeading
          title="Perspektive"
          subtitle="Die Seite wird später um editorische Profile und Zuordnungen innerhalb des Katalogs erweitert."
        />

        <RichText>
          <p>
            In einer späteren Ausbaustufe können hier Autorenprofile,
            Werkübersichten, Reihenbezüge und Verweise auf Titel, Texte und
            akademische Formate integriert werden. Die Architektur ist bereits
            darauf angelegt, diese Inhalte konsistent aufzunehmen.
          </p>
        </RichText>
      </section>
    </PageShell>
  );
}