import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { SectionHeading } from "../components/ui/section-heading";

export default function AkademiePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Negative Dialektik"
        title="Akademie"
        lead="Die Akademie entwickelt Programme, Seminare und institutionelle Formate zur Vermittlung deutscher Philosophie auf hohem begrifflichen Niveau."
      />

      <RichText>
        <p>
          Negative Dialektik verbindet verlegerische Arbeit mit philosophischer
          Ausbildung. Die Akademie ist der institutionelle Bereich, in dem
          Forschung, Lehre und editorische Vermittlung in konkrete Programme
          übersetzt werden.
        </p>

        <p>
          Unsere Arbeit richtet sich an Studenten, Institutionen, kulturelle
          Programme und akademische Partner, die an einer präzisen Einführung in
          das deutsche Denken und seine europäischen Kontexte interessiert sind.
        </p>
      </RichText>

      <section className="mt-16">
        <SectionHeading
          title="Akademische Linien"
          subtitle="Die Programme orientieren sich an klar umrissenen Feldern der philosophischen Tradition."
        />

        <RichText>
          <h3>Ausbildung in deutscher Philosophie</h3>
          <ul>
            <li>Deutscher Idealismus</li>
            <li>Dialektik</li>
            <li>Kritische Theorie</li>
            <li>Zeitgenössisches deutsches Denken</li>
          </ul>

          <h3>Ausbildung in Ästhetik und Romantik</h3>
          <ul>
            <li>Philosophie der Kunst</li>
            <li>Theorie der zeitgenössischen Kunst</li>
            <li>Literatur der deutschen Romantik</li>
          </ul>

          <h3>Ausbildung in europäischen Genealogien</h3>
          <ul>
            <li>Grundlegende Texte der europäischen Tradition</li>
            <li>Mystik und religiöses Denken</li>
            <li>Tiefenpsychologie</li>
          </ul>
        </RichText>
      </section>

      <section className="mt-16">
        <SectionHeading
          title="Formate"
          subtitle="Die Akademie arbeitet mit unterschiedlichen Formaten, die je nach Partner und Kontext angepasst werden können."
        />

        <RichText>
          <ul>
            <li>Seminare und Lektürekurse</li>
            <li>Curricula und modulare Programme</li>
            <li>Vorträge und institutionelle Kooperationen</li>
            <li>Begleitende editorische Projekte</li>
          </ul>

          <p>
            Alle Programme folgen einem zentralen Kriterium: die begriffliche
            Dichte des deutschen Denkens nicht zu vereinfachen, sondern mit
            Klarheit, Präzision und methodischer Verantwortung zu vermitteln.
          </p>
        </RichText>
      </section>
    </PageShell>
  );
}