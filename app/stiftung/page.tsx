import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";

export default function StiftungPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Negative Dialektik"
        title="Stiftung"
        lead="Die Stiftung entwickelt Bildungsprojekte, die philosophische Strenge, Selbständigkeit des Urteils und intellektuelle Autonomie fördern."
      />

      <RichText>
        <p>
          Negative Dialektik entwickelt in Kolumbien ein Ausbildungsprojekt, das
          darauf ausgerichtet ist, Autonomie und selbständiges Urteil im Geist
          der europäischen Aufklärung zu stärken.
        </p>

        <p>
          Unsere Arbeit trägt die begriffliche Strenge des deutschen Denkens in
          Bildungskontexte, in denen der Zugang zu einer soliden philosophischen
          Ausbildung häufig begrenzt ist. Dabei kooperieren wir mit Schulen,
          technischen Instituten, öffentlichen Ausbildungszentren und kulturellen
          Programmen, die das kritische Niveau ihrer Teilnehmer erhöhen wollen.
        </p>

        <h2>Zielsetzung</h2>

        <p>
          Ziel der Stiftung ist es, zur Ausbildung von Bürgern beizutragen, die
          fähig sind, selbst zu denken. Bildung wird dabei nicht als bloße
          Wissensvermittlung verstanden, sondern als Entwicklung begrifflicher
          Urteilsfähigkeit, intellektueller Disziplin und kritischer Selbständigkeit.
        </p>

        <h2>Kooperationen</h2>

        <p>
          Die Stiftung arbeitet mit öffentlichen und privaten Institutionen
          zusammen, darunter Schulen, Universitäten und kulturelle Einrichtungen.
          Die Programme können sowohl auf Einführungsniveau als auch als
          langfristige Bildungsformate aufgebaut werden.
        </p>

        <h2>Perspektive</h2>

        <p>
          Langfristig verbindet die Stiftung editorische Arbeit, akademische
          Vermittlung und institutionelle Bildung in einem gemeinsamen Projekt,
          das Denken nicht nur veröffentlicht, sondern in gesellschaftliche
          Praxis übersetzt.
        </p>
      </RichText>
    </PageShell>
  );
}