import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";

export default function VerlagPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Negative Dialektik"
        title="Verlag"
        lead="Negative Dialektik ist ein unabhängiger Verlag für deutsche Philosophie, Kritische Theorie und Sozialtheorie im spanischsprachigen Raum."
      />

      <RichText>
        <p>
          Negative Dialektik widmet sich der Übersetzung, Edition und Vermittlung
          zentraler Texte der deutschen Philosophie. Der Verlag versteht sich
          als editorisches Projekt, das philosophische Präzision, sprachliche
          Genauigkeit und intellektuelle Verantwortung miteinander verbindet.
        </p>

        <p>
          Unser Fokus liegt auf Texten, die innerhalb der deutschen und
          europäischen Tradition grundlegende begriffliche und spekulative
          Impulse gesetzt haben. Dabei geht es nicht nur um die Veröffentlichung
          einzelner Werke, sondern um die Schaffung eines verlegerischen Rahmens,
          in dem Denken in seiner Strenge, historischen Tiefe und aktuellen
          Relevanz zugänglich wird.
        </p>

        <h2>Editorische Ausrichtung</h2>

        <p>
          Wir arbeiten an Editionen, die philologische Sorgfalt und klare
          Vermittlung verbinden. Negative Dialektik publiziert Werke, die Debatten
          orientieren, Disziplinen strukturieren oder begriffliche Felder
          nachhaltig geprägt haben.
        </p>

        <p>
          Die verlegerische Arbeit umfasst Übersetzung, editorische Revision,
          konzeptionelle Begleitung sowie die Entwicklung von Reihen und
          Publikationsformaten, die auf Dauer angelegt sind.
        </p>

        <h2>Schwerpunkte</h2>

        <ul>
          <li>Kritische Theorie</li>
          <li>Sozialphilosophie</li>
          <li>Politische Theorie</li>
          <li>Deutscher Idealismus</li>
          <li>Ästhetik und Romantik</li>
          <li>Intellektuelle Genealogien Europas</li>
        </ul>

        <h2>Arbeitsweise</h2>

        <p>
          Negative Dialektik arbeitet mit Übersetzern, Wissenschaftlern und
          institutionellen Partnern zusammen, um hochwertige Ausgaben für den
          spanischsprachigen Raum zu entwickeln. Ziel ist nicht bloß die
          Verbreitung von Texten, sondern deren begrifflich angemessene
          Übertragung und nachhaltige Vermittlung.
        </p>
      </RichText>
    </PageShell>
  );
}