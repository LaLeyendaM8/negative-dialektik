import { ClosingCta } from "@/app/components/home/closing-cta";
import { Hero } from "@/app/components/home/hero";
import { Mission } from "@/app/components/home/mission";
import { NewReleases } from "@/app/components/home/new-releases";
import { Program } from "@/app/components/home/program";
import { SiteFooter } from "@/app/components/layout/site-footer";
import { SiteHeader } from "@/app/components/layout/site-header";

const navigation = [
  { label: "Start", href: "/" },
  { label: "Verlag", href: "/verlag" },
  { label: "Katalog", href: "/katalog" },
  { label: "Autoren", href: "/autoren" },
  { label: "Texte", href: "/texte" },
  { label: "Akademie", href: "/akademie" },
  { label: "Stiftung", href: "/stiftung" },
  { label: "Kontakt", href: "/kontakt" },
];

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

const footerLinks = [
  { label: "Verlag", href: "/verlag" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <SiteHeader navigation={navigation} />

      <main>
        <Hero />
        <Mission />
        <NewReleases books={books} />
        <Program items={programItems} />
        <ClosingCta />
      </main>

      <SiteFooter links={footerLinks} />
    </div>
  );
}