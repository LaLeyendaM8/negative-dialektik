import type { CatalogContent } from "../catalog-types";

export const catalogContent: CatalogContent = {
  overview: {
    title: "Programm",
    lead:
      "Das Programm von Negative Dialektik versammelt Editionen, Reihen und langfristige editorische Linien aus dem Feld der deutschen Philosophie.",
    seriesTitle: "Reihen",
    seriesSubtitle:
      "Die editorischen Linien des Verlags ordnen das Programm nach philosophischen Feldern und Traditionszusammenhängen.",
    booksTitle: "Titel",
    booksSubtitle:
      "Die ersten sechs Bände bilden den operativen Katalog des Verlags: mit lieferbaren Titeln, Vorbestellungen, Leseproben und Ficha editorial.",
  },
  series: [
    {
      slug: "geist",
      title: "Geist",
      subtitle:
        "Kritische Theorie, Sozialphilosophie und zeitgenössische Debatten.",
      description:
        "Die Reihe versammelt Arbeiten der Gegenwartsphilosophie, der Kritischen Theorie sowie der Sozial- und Politischen Philosophie.",
      theme:
        "Philosophie im engeren Sinne: Dialektik, Theorie, Gegenwartsdiagnose.",
      coverImage: "/images/books/autonomia-y-liberacion.jpeg",
      status: "lieferbar",
      featuredBooks: ["autonomia-y-liberacion"],
      seoTitle: "Geist | Negative Dialektik",
      seoDescription:
        "Reihe für Gegenwartsphilosophie, Kritische Theorie sowie Sozial- und Politische Philosophie.",
    },
    {
      slug: "bildung",
      title: "Bildung",
      subtitle:
        "Einführungen in zentrale Begriffe, Autoren und Problemfelder.",
      description:
        "Die Reihe bietet systematische Zugänge zu grundlegenden Begriffen und Autoren der deutschen und europäischen Tradition.",
      theme:
        "Einordnung, Begriffsklärung und Vermittlung für Studium und Lehre.",
      coverImage: "/images/books/theodor-w-adorno-introduccion.jpeg",
      status: "vorbestellbar",
      featuredBooks: [
        "theodor-w-adorno-introduccion",
        "anarquismo",
      ],
      seoTitle: "Bildung | Negative Dialektik",
      seoDescription:
        "Reihe für systematische Einführungen in zentrale Autoren und Begriffe.",
    },
    {
      slug: "rose",
      title: "Rose",
      subtitle: "Ästhetik, Kunstphilosophie und deutsche Romantik.",
      description:
        "Hier erscheinen Texte, in denen Kunst, Schönheit, Form und Erfahrung im Zentrum philosophischer Reflexion stehen.",
      theme:
        "Ästhetik, Kunst, Romantik und ihre begrifflichen Konstellationen.",
      coverImage: "/images/books/alta-rosa-espigada.jpeg",
      status: "vorbestellbar",
      featuredBooks: [
        "alta-rosa-espigada",
        "lo-culminado-en-si-mismo",
      ],
      seoTitle: "Rose | Negative Dialektik",
      seoDescription:
        "Reihe für Ästhetik, Kunstphilosophie und deutsche Romantik.",
    },
    {
      slug: "schriften-des-instituts",
      title: "Schriften des Instituts",
      subtitle: "Eigene Forschungsarbeiten und programmatische Beiträge.",
      description:
        "Die Reihe versammelt Vorlesungen, Forschungstexte und editorische Positionsbestimmungen von Negative Dialektik.",
      theme: "Eigene Publikationen des Instituts und programmatische Texte.",
      coverImage: "/images/books/formas-de-vida-y-critica-social.jpeg",
      status: "vorbestellbar",
      featuredBooks: ["formas-de-vida-y-critica-social"],
      seoTitle: "Schriften des Instituts | Negative Dialektik",
      seoDescription:
        "Reihe für eigene Forschungsarbeiten, Vorlesungen und programmatische Texte.",
    },
  ],
  books: [
    {
      slug: "autonomia-y-liberacion",
      title: "Autonomía y liberación",
      subtitle: "Estudios sobre Hegel",
      author: "Christoph Menke",
      translator: "Josef Hackspacher",
      editor: "Negative Dialektik",
      seriesSlug: "geist",
      seriesDisplayLabel: "Geist 1",
      description:
        "Eine präzise Rekonstruktion der Freiheitstheorie ausgehend von einer eigenständigen Lektüre Hegels und Adornos.",
      longDescription: [
        "Über Begriffe wie Autonomie, Befreiung, zweite Natur, Kritik und Affirmation zeigt der Band, dass Freiheit als permanenter Prozess der Verwandlung und Überwindung von Unfreiheit verstanden werden muss.",
        "Das Buch ist ein grundlegender Beitrag zu gegenwärtigen Debatten über Kritische Theorie, deutschen Idealismus und politische Philosophie.",
        "Christoph Menke gehört zu den einflussreichsten Gegenwartsphilosophen in Kritischer Theorie, Ästhetik und politischer Philosophie.",
      ],
      quote: {
        source: "Ficha editorial",
        text:
          "Primera edición en español, traducción especializada y académica, edición crítica, diseño premium.",
      },
      coverImage: "/images/books/autonomia-y-liberacion.jpeg",
      isbn: "978-628-97478-0-5",
      pages: 276,
      format: "Taschenbuch",
      language: "Spanisch",
      publicationDate: "2026-05-19",
      status: "lieferbar",
      stockStatus: "bestellbar-manuell",
      price: "99.000 COP",
      currency: "COP",
      checkoutEnabled: true,
      manualOrderNote:
        "Direkt über Negative Dialektik erhältlich. Der Versand wird nach bestätigter Zahlung manuell koordiniert.",
      samplePdf: "/samples/autonomia-y-liberacion-lectura-de-prueba.pdf",
      editorialSheetPdf: "/fichas/autonomia-y-liberacion-ficha-editorial.pdf",
      seoTitle:
        "Autonomía y liberación | Christoph Menke | Negative Dialektik",
      seoDescription:
        "Erste spanische Ausgabe von Christoph Menkes Autonomía y liberación. Kritische Theorie, Hegel und politische Philosophie.",
    },
    {
      slug: "theodor-w-adorno-introduccion",
      title: "Theodor W. Adorno",
      subtitle: "Introducción",
      author: "Gerhard Schweppenhäuser",
      editor: "Negative Dialektik",
      seriesSlug: "bildung",
      seriesDisplayLabel: "Bildung 1",
      description:
        "Eine zugängliche und zugleich anspruchsvolle Einführung in das Denken Theodor W. Adornos.",
      longDescription: [
        "Gerhard Schweppenhäuser rekonstruiert zentrale Felder von Adornos Philosophie: Kritik der instrumentellen Vernunft, negative Dialektik, Identitätskritik und Theorie der Kulturindustrie.",
        "Der Band macht die innere Einheit eines der einflussreichsten Werke des Gegenwartsdenkens sichtbar und ist ein grundlegender Zugang zur Kritischen Theorie und zu den Widersprüchen der Moderne.",
        "Gerhard Schweppenhäuser ist Philosoph und einer der wichtigsten zeitgenössischen Spezialisten für Kritische Theorie und Frankfurter Schule.",
      ],
      quote: {
        source: "Ficha editorial",
        text:
          "Una de las introducciones más reconocidas sobre el pensamiento de Adorno publicadas en alemán.",
      },
      coverImage: "/images/books/theodor-w-adorno-introduccion.jpeg",
      isbn: "ISBN folgt",
      pages: 216,
      format: "Taschenbuch",
      language: "Spanisch",
      publicationDate: "2026-07-16",
      status: "vorbestellbar",
      stockStatus: "vorbestellung-manuell",
      price: "89.100 COP",
      currency: "COP",
      checkoutEnabled: true,
      manualOrderNote:
        "Vorbestellbar mit 10% Rabatt. Der Versand wird nach Verfügbarkeit manuell koordiniert.",
      samplePdf:
        "/samples/theodor-w-adorno-introduccion-lectura-de-prueba.pdf",
      editorialSheetPdf:
        "/fichas/theodor-w-adorno-introduccion-ficha-editorial.pdf",
      seoTitle:
        "Theodor W. Adorno. Introducción | Gerhard Schweppenhäuser | Negative Dialektik",
      seoDescription:
        "Spanische Einführung in Theodor W. Adornos Denken von Gerhard Schweppenhäuser. Bildung 1 bei Negative Dialektik.",
    },
    {
      slug: "alta-rosa-espigada",
      title: "Alta rosa espigada",
      subtitle:
        "Meditaciones sobre la simbología floral y la estética alemana",
      author: "Josef Hackspacher",
      editor: "Negative Dialektik",
      seriesSlug: "rose",
      seriesDisplayLabel: "Rose 1",
      description:
        "Eine philosophische Meditation über die Rose als ästhetisches, geistiges und symbolisches Motiv.",
      longDescription: [
        "Josef Hackspacher verbindet romantische Tradition, Kritische Theorie und gegenwärtige Erfahrung zu einer Reflexion über Liebe, Kunst, Sprache und innere Bildung.",
        "Das Buch richtet sich an Leserinnen und Leser, die eine zugleich anspruchsvolle und klare ästhetische Erfahrung suchen.",
        "Josef Hackspacher studierte Ästhetik an der Goethe-Universität Frankfurt bei Christoph Menke und arbeitet zu deutscher Philosophie und Kritischer Theorie.",
      ],
      quote: {
        source: "Ficha editorial",
        text:
          "Articula la tradición de la estética con la Teoría Crítica a partir de un único motivo simbólico: la rosa.",
      },
      coverImage: "/images/books/alta-rosa-espigada.jpeg",
      isbn: "ISBN folgt",
      pages: 114,
      format: "Taschenbuch",
      language: "Spanisch",
      publicationDate: "2026-06-17",
      status: "vorbestellbar",
      stockStatus: "vorbestellung-manuell",
      price: "71.100 COP",
      currency: "COP",
      checkoutEnabled: true,
      manualOrderNote:
        "Vorbestellbar mit 10% Rabatt. Der Versand wird nach Verfügbarkeit manuell koordiniert.",
      samplePdf: "/samples/alta-rosa-espigada-lectura-de-prueba.pdf",
      editorialSheetPdf: "/fichas/alta-rosa-espigada-ficha-editorial.pdf",
      seoTitle:
        "Alta rosa espigada | Josef Hackspacher | Negative Dialektik",
      seoDescription:
        "Josef Hackspachers Alta rosa espigada über florale Symbolik, deutsche Ästhetik und Kritische Theorie.",
    },
    {
      slug: "formas-de-vida-y-critica-social",
      title: "Formas de vida y crítica social",
      subtitle: "Tres lecciones sobre la filosofía de Rahel Jaeggi",
      author: "Josef Hackspacher",
      editor: "Negative Dialektik",
      seriesSlug: "schriften-des-instituts",
      seriesDisplayLabel: "Schriften des Instituts 1",
      description:
        "Eine systematische Einführung in die Philosophie Rahel Jaeggis und ihre Theorie der Lebensformen.",
      longDescription: [
        "Der Band rekonstruiert zentrale Begriffe wie Entfremdung, Lebensformen, Fortschritt und Regression und stellt sie in den Dialog mit Marx, Adorno und Honneth.",
        "Mehr als eine bloße Übersicht bietet das Buch eine konzentrierte Lektüre der Probleme moderner sozialer Erfahrung und ihrer möglichen Transformation.",
        "Josef Hackspacher ist Dozent, Übersetzer und Herausgeber. Seine Arbeit konzentriert sich auf deutsche Philosophie und Kritische Theorie.",
      ],
      quote: {
        source: "Ficha editorial",
        text:
          "Combina claridad expositiva y rigor conceptual.",
      },
      coverImage: "/images/books/formas-de-vida-y-critica-social.jpeg",
      isbn: "ISBN folgt",
      pages: 92,
      format: "Taschenbuch",
      language: "Spanisch",
      publicationDate: "2026-06-17",
      status: "vorbestellbar",
      stockStatus: "vorbestellung-manuell",
      price: "62.100 COP",
      currency: "COP",
      checkoutEnabled: true,
      manualOrderNote:
        "Vorbestellbar mit 10% Rabatt. Der Versand wird nach Verfügbarkeit manuell koordiniert.",
      samplePdf:
        "/samples/formas-de-vida-y-critica-social-lectura-de-prueba.pdf",
      editorialSheetPdf:
        "/fichas/formas-de-vida-y-critica-social-ficha-editorial.pdf",
      seoTitle:
        "Formas de vida y crítica social | Josef Hackspacher | Negative Dialektik",
      seoDescription:
        "Drei Vorlesungen über Rahel Jaeggis Philosophie der Lebensformen, Kritische Theorie und soziale Transformation.",
    },
    {
      slug: "anarquismo",
      title: "Anarquismo",
      subtitle: "Introducción",
      author: "Daniel Loick",
      editor: "Negative Dialektik",
      seriesSlug: "bildung",
      seriesDisplayLabel: "Bildung 4",
      description:
        "Eine prägnante Einführung in Geschichte, Begriffe und Gegenwart des anarchistischen Denkens.",
      longDescription: [
        "Der Band zeigt, dass Anarchismus weit mehr ist als bloße Staatskritik: eine komplexe intellektuelle Tradition mit eigenen Begriffen, Autorinnen, Autoren und Organisationsformen.",
        "Von Proudhon, Bakunin und Kropotkin bis zu zeitgenössischen Formen von Widerstand und Selbstorganisation erschließt das Buch eine zentrale Tradition emanzipatorischen Denkens.",
        "Daniel Loick ist Philosoph an der Goethe-Universität Frankfurt und arbeitet zu Kritischer Theorie, politischer Philosophie und Rechtstheorie.",
      ],
      quote: {
        source: "Ficha editorial",
        text:
          "Presenta el anarquismo como una tradición intelectual compleja.",
      },
      coverImage: "/images/books/anarquismo.jpeg",
      isbn: "ISBN folgt",
      pages: 258,
      format: "Taschenbuch",
      language: "Spanisch",
      publicationDate: "2026-09-13",
      status: "in-vorbereitung",
      stockStatus: "nicht-verfuegbar",
      checkoutEnabled: false,
      manualOrderNote:
        "Dieser Titel ist in Arbeit und noch nicht bestellbar.",
      samplePdf: "/samples/anarquismo-lectura-de-prueba.pdf",
      editorialSheetPdf: "/fichas/anarquismo-ficha-editorial.pdf",
      seoTitle: "Anarquismo | Daniel Loick | Negative Dialektik",
      seoDescription:
        "Daniel Loicks Einführung in den Anarchismus: Staat, Herrschaft, Demokratie, Politik und Kritische Theorie.",
    },
    {
      slug: "lo-culminado-en-si-mismo",
      title: "Lo culminado en sí mismo",
      subtitle: "Escritos fundamentales de teoría del arte y estética",
      author: "Karl Philipp Moritz",
      editor: "Negative Dialektik",
      seriesSlug: "rose",
      seriesDisplayLabel: "Rose 2",
      description:
        "Eine spanische Ausgabe zentraler ästhetischer Schriften von Karl Philipp Moritz.",
      longDescription: [
        "Die Texte formulieren eine der Grundideen der Moderne: das Kunstwerk als autonome, in sich vollendete Totalität.",
        "Der Band ist ein wichtiger Zugang zur Entstehung der modernen Ästhetik und zur Geschichte der Kunstphilosophie.",
        "Karl Philipp Moritz war Schriftsteller, Philosoph und einer der Begründer der modernen Ästhetik. Sein Denken beeinflusste Kant, die deutsche Romantik und die spätere ästhetische Theorie.",
      ],
      quote: {
        source: "Ficha editorial",
        text:
          "Permite acceder directamente a la formulación original de la idea moderna de la autonomía del arte.",
      },
      coverImage: "/images/books/lo-culminado-en-si-mismo.jpeg",
      isbn: "ISBN folgt",
      pages: 118,
      format: "Taschenbuch",
      language: "Spanisch",
      publicationDate: "2026-09-13",
      status: "in-vorbereitung",
      stockStatus: "nicht-verfuegbar",
      checkoutEnabled: false,
      manualOrderNote:
        "Dieser Titel ist in Arbeit und noch nicht bestellbar.",
      samplePdf:
        "/samples/lo-culminado-en-si-mismo-lectura-de-prueba.pdf",
      editorialSheetPdf:
        "/fichas/lo-culminado-en-si-mismo-ficha-editorial.pdf",
      seoTitle:
        "Lo culminado en sí mismo | Karl Philipp Moritz | Negative Dialektik",
      seoDescription:
        "Karl Philipp Moritz' grundlegende Schriften zur Kunsttheorie und Ästhetik in spanischer Ausgabe.",
    },
  ],
};
