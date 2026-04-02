import type { CatalogContent } from "../catalog-types";

export const catalogContent: CatalogContent = {
  overview: {
    title: "Programm",
    lead:
      "Das Programm von Negative Dialektik versammelt Editionen, Reihen und langfristige editorische Linien aus dem Feld der deutschen Philosophie.",
    seriesTitle: "Reihen",
    seriesSubtitle:
      "Die editorischen Linien des Verlags ordnen das Programm nach philosophischen Feldern und Traditionszusammenhaengen.",
    booksTitle: "Titel",
    booksSubtitle:
      "Die ersten Buchdatensätze schaffen die Grundlage fuer künftige Detailseiten, Vorbestellungen und spätere Shop-Funktionen.",
  },
  series: [
    {
      slug: "geist",
      title: "Geist",
      subtitle:
        "Kritische Theorie, Sozialphilosophie und zeitgenoessische Debatten.",
      description:
        "Die Reihe versammelt Arbeiten der Gegenwartsphilosophie, der Kritischen Theorie sowie der Sozial- und Politischen Philosophie.",
      theme:
        "Philosophie im engeren Sinne: Dialektik, Theorie, Gegenwartsdiagnose.",
      coverImage: "/images/books/geist.jpeg",
      status: "angekuendigt",
      featuredBooks: ["geist"],
      seoTitle: "Geist | Negative Dialektik",
      seoDescription:
        "Reihe fuer Gegenwartsphilosophie, Kritische Theorie sowie Sozial- und Politische Philosophie.",
    },
    {
      slug: "bildung",
      title: "Bildung",
      subtitle: "Einführungen in zentrale Begriffe, Autoren und Problemfelder.",
      description:
        "Die Reihe bietet systematische Zugaenge zu grundlegenden Begriffen und Autoren der deutschen und europäischen Tradition.",
      theme:
        "Einordnung, Begriffsklärung und Vermittlung fuer Studium und Lehre.",
      coverImage: "/images/books/bildung.jpeg",
      status: "in-vorbereitung",
      featuredBooks: ["bildung"],
      seoTitle: "Bildung | Negative Dialektik",
      seoDescription:
        "Reihe fuer systematische Einführungen in zentrale Autoren und Begriffe.",
    },
    {
      slug: "rose",
      title: "Rose",
      subtitle: "Ästhetik, Kunstphilosophie und deutsche Romantik.",
      description:
        "Hier erscheinen Texte, in denen Kunst, Schoenheit, Form und Erfahrung im Zentrum philosophischer Reflexion stehen.",
      theme: "Ästhetik, Kunst, Romantik und ihre begrifflichen Konstellationen.",
      coverImage: "/images/books/rose.jpeg",
      status: "in-vorbereitung",
      featuredBooks: ["rose"],
      seoTitle: "Rose | Negative Dialektik",
      seoDescription:
        "Reihe fuer Ästhetik, Kunstphilosophie und deutsche Romantik.",
    },
    {
      slug: "schriften-des-instituts",
      title: "Schriften des Instituts",
      subtitle: "Eigene Forschungsarbeiten und programmatische Beitraege.",
      description:
        "Die Reihe versammelt Vorlesungen, Forschungstexte und editorische Positionsbestimmungen von Negative Dialektik.",
      theme: "Eigene Publikationen des Instituts und programmatische Texte.",
      coverImage: "/images/books/schriften-des-instituts.jpeg",
      status: "in-vorbereitung",
      featuredBooks: ["schriften-des-instituts"],
      seoTitle: "Schriften des Instituts | Negative Dialektik",
      seoDescription:
        "Reihe für eigene Forschungsarbeiten, Vorlesungen und programmatische Texte.",
    },
  ],
  books: [
    {
      slug: "geist",
      title: "GEIST",
      subtitle: "Reihe fÜr Gegenwartsphilosophie und Kritische Theorie",
      author: "Negative Dialektik",
      editor: "Negative Dialektik",
      seriesSlug: "geist",
      description:
        "Massgebliche Arbeiten der Gegenwartsphilosophie, Kritischen Theorie sowie der Sozial- und Politischen Philosophie.",
      longDescription: [
        "GEIST bündelt die editorische Linie für philosophische Texte, die in aktuellen Debatten orientierend wirken und zentrale Problemstellungen der deutschen Tradition weiterfuehren.",
        "Die Reihe ist als Referenzraum fuer Titel angelegt, die Theorieproduktion, Gesellschaftsanalyse und politische Reflexion miteinander verbinden.",
      ],
      quote: {
        source: "Editorische Notiz",
        text: "Die Reihe versteht philosophische Edition nicht als Archivierung, sondern als Eingriff in gegenwaertige Debatten.",
      },
      coverImage: "/images/books/geist.jpeg",
      isbn: "978-0-00-000001-1",
      pages: 240,
      format: "Paperback",
      language: "Spanisch",
      publicationDate: "2026-09-01",
      status: "angekuendigt",
      stockStatus: "vorbestellung-manuell",
      price: "In Vorbereitung",
      manualOrderNote:
        "Bestellungen und Vorbestellungen werden in der aktuellen Ausbaustufe direkt ueber das Institut koordiniert.",
      seoTitle: "GEIST | Negative Dialektik",
      seoDescription:
        "Editorische Linie für Gegenwartsphilosophie, Kritische Theorie und Sozialphilosophie.",
    },
    {
      slug: "bildung",
      title: "BILDUNG",
      subtitle: "Reihe fuer systematische Einfuehrungen",
      author: "Negative Dialektik",
      editor: "Negative Dialektik",
      seriesSlug: "bildung",
      description:
        "Systematische Einführungen in zentrale Begriffe, Autoren und Problemfelder der deutschen und europäischen Tradition.",
      longDescription: [
        "BILDUNG richtet sich an Leserinnen und Leser, die einen konzentrierten Zugang zu klassischen und modernen Problemfeldern suchen.",
        "Die Reihe verbindet editorische Sorgfalt mit didaktischer Klarheit und ist besonders für Studium, Lehre und akademische Orientierung geeignet.",
      ],
      quote: {
        source: "Editorische Notiz",
        text: "Begriffliche Einführung und philologische Genauigkeit werden hier bewusst zusammengeführt.",
      },
      coverImage: "/images/books/bildung.jpeg",
      isbn: "978-0-00-000002-8",
      pages: 180,
      format: "Paperback",
      language: "Spanisch",
      publicationDate: "2026-11-01",
      status: "in-vorbereitung",
      stockStatus: "nicht-verfuegbar",
      price: "In Vorbereitung",
      manualOrderNote:
        "Für diesen Titel nehmen wir derzeit noch keine Bestellungen entgegen, informieren aber gern über den Erscheinungsstand.",
      seoTitle: "BILDUNG | Negative Dialektik",
      seoDescription:
        "Reihe für systematische Einführungen in Begriffe, Autoren und Problemfelder.",
    },
    {
      slug: "rose",
      title: "ROSE",
      subtitle: "Reihe für Ästhetik und deutsche Romantik",
      author: "Negative Dialektik",
      editor: "Negative Dialektik",
      seriesSlug: "rose",
      description:
        "Arbeiten zur Ästhetik, Kunstphilosophie und zur deutschen Romantik.",
      longDescription: [
        "ROSE versammelt Texte, in denen Ästhetik nicht als Randgebiet, sondern als eigenständiger philosophischer Denkraum erscheint.",
        "Die Reihe stellt Verbindungen zwischen Kunstphilosophie, Erfahrung, Form und romantischer Tradition her.",
      ],
      quote: {
        source: "Editorische Notiz",
        text: "Ästhetik erscheint hier als Theorieform, in der Erfahrung, Form und Kritik aufeinandertreffen.",
      },
      coverImage: "/images/books/rose.jpeg",
      isbn: "978-0-00-000003-5",
      pages: 220,
      format: "Paperback",
      language: "Spanisch",
      publicationDate: "2026-12-15",
      status: "in-vorbereitung",
      stockStatus: "nicht-verfuegbar",
      price: "In Vorbereitung",
      manualOrderNote:
        "Der Titel befindet sich noch in Vorbereitung. Bei Interesse können Sie bereits eine Nachricht an das Institut senden.",
      seoTitle: "ROSE | Negative Dialektik",
      seoDescription:
        "Reihe für Ästhetik, Kunstphilosophie und deutsche Romantik.",
    },
    {
      slug: "schriften-des-instituts",
      title: "SCHRIFTEN DES INSTITUTS",
      subtitle: "Vorlesungen, Forschung und programmatische Texte",
      author: "Negative Dialektik",
      editor: "Negative Dialektik",
      seriesSlug: "schriften-des-instituts",
      description:
        "Eigene Forschungsarbeiten, Vorlesungen und programmatische Beiträge von Negative Dialektik.",
      longDescription: [
        "Die Schriften des Instituts dokumentieren die eigene theoretische und institutionelle Arbeit von Negative Dialektik.",
        "Hier erscheinen Texte, die Forschung, Lehre und editorisches Selbstverständnis in verdichteter Form sichtbar machen.",
      ],
      quote: {
        source: "Editorische Notiz",
        text: "Die Schriften des Instituts machen die eigene Programmatik nicht nur sichtbar, sondern diskutierbar.",
      },
      coverImage: "/images/books/schriften-des-instituts.jpeg",
      isbn: "978-0-00-000004-2",
      pages: 200,
      format: "Paperback",
      language: "Spanisch",
      publicationDate: "2027-02-01",
      status: "in-vorbereitung",
      stockStatus: "auf-anfrage",
      price: "In Vorbereitung",
      manualOrderNote:
        "Anfragen zu institutionellen Bestellungen oder späteren Vorbestellungen können bereits jetzt an das Institut gerichtet werden.",
      seoTitle: "Schriften des Instituts | Negative Dialektik",
      seoDescription:
        "Eigene Forschungsarbeiten, Vorlesungen und programmatische Beiträge des Instituts.",
    },
  ],
};
