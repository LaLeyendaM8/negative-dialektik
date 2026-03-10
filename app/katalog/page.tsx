import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { SectionHeading } from "../components/ui/section-heading";

export default function KatalogPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Negative Dialektik"
        title="Katalog"
        lead="Der Katalog von Negative Dialektik versammelt Editionen, Reihen und langfristige editorische Linien aus dem Feld der deutschen Philosophie."
      />

      <RichText>
        <p>
          Unser Katalog ist nicht als lose Sammlung einzelner Titel gedacht,
          sondern als strukturierter editorischer Zusammenhang. Jede Reihe folgt
          einem begrifflichen Kriterium und erschließt Texte, die in ihrem
          jeweiligen Feld orientierend wirken.
        </p>
      </RichText>

      <section className="mt-16">
        <SectionHeading
          title="Reihen"
          subtitle="Die ersten editorischen Linien des Verlags ordnen das Programm nach philosophischen Feldern und Traditionszusammenhängen."
        />

        <RichText>
          <h3>Geist</h3>
          <p>
            Deutsche Philosophie im engeren Sinne: Idealismus, Dialektik,
            Kritische Theorie und zeitgenössische Diskurse. Diese Reihe versammelt
            Werke, die Debatten orientieren, Probleme etablieren und zentrale
            Architekturen innerhalb der deutschen und europäischen Tradition
            bestimmen.
          </p>

          <h3>Rose</h3>
          <p>
            Ästhetik, Kunst und deutsche Romantik. Hier erscheinen Texte, in
            denen Reflexion über Schönheit, Form, Erfahrung und Kunst eine
            tragende Rolle spielt.
          </p>

          <h3>Ursprung</h3>
          <p>
            Quellen, Genealogien und grundlegende Texte der europäischen
            intellektuellen Tradition. Diese Reihe konzentriert sich auf Werke,
            deren begrifflicher Wert es ermöglicht hat, Denkweisen zu begründen,
            Wissen zu strukturieren und historische Zusammenhänge neu zu lesen.
          </p>
        </RichText>
      </section>

      <section className="mt-16">
        <SectionHeading
          title="Publikationsform"
          subtitle="Die Titel erscheinen als präzise vorbereitete Editionen, deren editorische Form langfristig mit dem Verlag mitwachsen kann."
        />

        <RichText>
          <p>
            In der ersten Ausbaustufe wird der Katalog schrittweise um
            Neuerscheinungen, Reihenübersichten und spätere Detailseiten für
            einzelne Titel ergänzt. Die Struktur ist bereits darauf angelegt,
            zukünftige Veröffentlichungen klar und konsistent aufzunehmen.
          </p>
        </RichText>
      </section>
    </PageShell>
  );
}