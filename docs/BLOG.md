# Artikel im Journal / Cuaderno

Artikel stehen in `app/content/es/blog.ts` bzw. `app/content/de/blog.ts`.
Die Seiten verwenden in beiden Sprachen dasselbe Layout. Eine Übersetzung
erhält denselben Slug. Veröffentlichte Fassungen werden miteinander verlinkt.

```ts
{
  slug: "thema-des-artikels",
  status: "draft",
  title: "Freigegebener Titel",
  description: "Kurze Zusammenfassung für Übersicht und Suchergebnis.",
  date: "YYYY-MM-DD",
  author: "Name der Autorin oder des Autors",
  sections: [
    { paragraphs: ["Einleitung"] },
    { heading: "Zwischenüberschrift", paragraphs: ["Absatz"] },
  ],
}
```

Verwende eindeutige Slugs mit Kleinbuchstaben, Ziffern und Bindestrichen.
Nach redaktioneller Freigabe das Datum setzen, auf `published` umstellen und
deployen. Ein zukünftiges Datum wird frühestens mit einem Build am oder nach
dem Publikationstag sichtbar. Entwürfe bleiben außerhalb der Übersicht,
der Sitemap und der öffentlichen Artikelroute. Die Sitemap listet die
Sprachübersicht ab dem ersten veröffentlichten Artikel.
