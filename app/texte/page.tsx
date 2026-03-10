import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { SectionHeading } from "../components/ui/section-heading";

export default function TextePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Negative Dialektik"
        title="Texte"
        lead="Die Textsektion versammelt editorische Notizen, Einführungen, Essays und begleitende Beiträge zum Programm des Verlags."
      />

      <RichText>
        <p>
          Negative Dialektik versteht verlegerische Arbeit nicht als bloße
          Veröffentlichung, sondern als Teil eines größeren Zusammenhangs von
          Vermittlung, Einordnung und philosophischer Orientierung. Die
          Textsektion bildet dafür den editorischen Raum.
        </p>

        <p>
          Hier können künftig Essays, Vorbemerkungen, programmatische Texte,
          Lektüre-Einführungen und institutionelle Beiträge erscheinen, die das
          Verlagsprogramm inhaltlich begleiten und erweitern.
        </p>
      </RichText>

      <section className="mt-16">
        <SectionHeading
          title="Formate"
          subtitle="Die Rubrik ist offen für unterschiedliche editorische Textformen."
        />

        <RichText>
          <ul>
            <li>Einführungen zu Autoren und Werken</li>
            <li>Editorische Notizen</li>
            <li>Essays und programmatische Beiträge</li>
            <li>Begleittexte zu Reihen und Titeln</li>
            <li>Institutionelle Stellungnahmen und Projekttexte</li>
          </ul>
        </RichText>
      </section>

      <section className="mt-16">
        <SectionHeading
          title="Ausbau"
          subtitle="In der aktuellen Phase bildet diese Seite die strukturelle Grundlage für ein später wachsendes Textarchiv."
        />

        <RichText>
          <p>
            Mit dem weiteren Ausbau des Verlags kann die Textsektion um einzelne
            Beitragsseiten, thematische Übersichten und editorische Dossiers
            ergänzt werden. Das Grundsystem ist bereits so angelegt, dass diese
            Inhalte ohne gestalterischen Bruch integriert werden können.
          </p>
        </RichText>
      </section>
    </PageShell>
  );
}