import { ClosingCta } from "./components/home/closing-cta";
import { Hero } from "./components/home/hero";
import { Mission } from "./components/home/mission";
import { NewReleases } from "./components/home/new-releases";
import { Program } from "./components/home/program";

const books = [
  {
    slug: "dialektik-der-aufklaerung",
    title: "Dialektik der Aufklärung",
    author: "Adorno & Horkheimer",
    meta: "2024 · 312 Seiten",
    coverTitle: "Dialektik der Aufklärung",
  },
  {
    slug: "minima-moralia",
    title: "Minima Moralia",
    author: "Theodor W. Adorno",
    meta: "2024 · 280 Seiten",
    coverTitle: "Minima Moralia",
  },
  {
    slug: "geschichte-und-klassenbewusstsein",
    title: "Geschichte und Klassenbewusstsein",
    author: "Georg Lukács",
    meta: "2023 · 456 Seiten",
    coverTitle: "Geschichte und Klassenbewusstsein",
  },
];

const programItems = [
  {
    title: "Kritische Theorie",
    description:
      "Editionen zentraler Texte der Frankfurter Schule und ihrer Nachfolger, die gesellschaftliche Verhältnisse kritisch analysieren.",
  },
  {
    title: "Sozialphilosophie",
    description:
      "Philosophische Untersuchungen zu sozialen Strukturen, Macht, Gesellschaft und menschlichen Beziehungen.",
  },
  {
    title: "Politische Theorie",
    description:
      "Grundlegende Werke zu Demokratie, Herrschaft, Ideologiekritik und emanzipatorischen Bewegungen.",
  },
  {
    title: "Übersetzungen",
    description:
      "Präzise philologische Übersetzungen deutscher philosophischer Texte für den spanischsprachigen Raum.",
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Mission />
      <NewReleases books={books} />
      <Program items={programItems} />
      <ClosingCta />
    </main>
  );
}