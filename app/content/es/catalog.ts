import type { CatalogContent } from "../catalog-types";

export const catalogContent: CatalogContent = {
  overview: {
    title: "Programa",
    lead:
      "El programa de Negative Dialektik reúne ediciones, colecciones y líneas editoriales de largo aliento dentro del campo de la filosofía alemana.",
    seriesTitle: "Colecciones",
    seriesSubtitle:
      "Las líneas editoriales de la casa organizan el programa según campos filosóficos y contextos de tradición.",
    booksTitle: "Títulos",
    booksSubtitle:
      "Los seis primeros libros forman el catálogo operativo de la editorial: títulos disponibles, títulos en preparación y muestras de lectura.",
  },
  series: [
    {
      slug: "geist",
      title: "Geist",
      subtitle:
        "Filosofía en sentido estricto. La colección reúne trabajos fundamentales de filosofía contemporánea, teoría crítica y filosofía social y política.",
      description: "",
      theme: "",
      coverImage: "/images/books/autonomia-y-liberacion.jpeg",
      status: "lieferbar",
      featuredBooks: ["autonomia-y-liberacion"],
      seoTitle: "Geist | Negative Dialektik",
      seoDescription:
        "Colección de filosofía contemporánea, teoría crítica y filosofía social y política.",
    },
    {
      slug: "bildung",
      title: "Bildung",
      subtitle:
        "La colección ofrece accesos sistemáticos a conceptos y autores fundamentales de la tradición alemana y europea. Orientación, claridad conceptual y mediación académica para estudio y docencia.",
      description: "",
      theme: "",
      coverImage: "/images/books/theodor-w-adorno-introduccion.jpeg",
      status: "lieferbar",
      featuredBooks: [
        "theodor-w-adorno-introduccion",
        "anarquismo",
      ],
      seoTitle: "Bildung | Negative Dialektik",
      seoDescription:
        "Colección de introducciones sistemáticas a conceptos y autores clave.",
    },
    {
      slug: "rose",
      title: "Rose",
      subtitle: "Estética, filosofía del arte y romanticismo alemán.",
      description:
        "Aquí aparecen textos en los que el arte, la belleza, la forma y la experiencia ocupan un lugar central.",
      theme: "Estética, arte, romanticismo y sus constelaciones conceptuales.",
      coverImage: "/images/books/alta-rosa-espigada.jpg",
      status: "lieferbar",
      featuredBooks: [
        "alta-rosa-espigada",
        "lo-culminado-en-si-mismo",
      ],
      seoTitle: "Rose | Negative Dialektik",
      seoDescription:
        "Colección dedicada a la estética, la filosofía del arte y el romanticismo alemán.",
    },
    {
      slug: "schriften-des-instituts",
      title: "Escritos del Instituto",
      subtitle: "Investigaciones propias y textos programáticos.",
      description:
        "La colección reúne conferencias, investigaciones y definiciones editoriales de Negative Dialektik.",
      theme: "Publicaciones propias del instituto y elaboraciones programáticas.",
      coverImage: "/images/books/formas-de-vida-y-critica-social.jpeg",
      status: "lieferbar",
      featuredBooks: ["formas-de-vida-y-critica-social"],
      seoTitle: "Escritos del Instituto | Negative Dialektik",
      seoDescription:
        "Colección de investigaciones propias, conferencias y textos programáticos.",
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
        "Una reconstrucción rigurosa de la teoría de la libertad a partir de una lectura original de Hegel y Adorno.",
      longDescription: [
        "A través de conceptos como autonomía, liberación, segunda naturaleza, crítica y afirmación, la obra muestra cómo la libertad debe comprenderse como un proceso permanente de transformación y superación de la no-libertad.",
        "El volumen constituye una contribución fundamental a los debates contemporáneos sobre Teoría Crítica, idealismo alemán y filosofía política.",
        "Christoph Menke es uno de los filósofos contemporáneos más influyentes en teoría crítica, estética y filosofía política.",
      ],
      quote: {
        text:
          "Primera edición en español, traducción especializada y académica, edición crítica, diseño premium.",
      },
      coverImage: "/images/books/autonomia-y-liberacion.jpeg",
      isbn: "978-628-97478-0-5",
      pages: 276,
      format: "Edición de bolsillo",
      language: "Español",
      publicationDate: "2026-05-19",
      status: "lieferbar",
      stockStatus: "bestellbar-manuell",
      price: "99.000 COP",
      currency: "COP",
      checkoutEnabled: true,
      manualOrderNote:
        "Disponible directamente a través de Negative Dialektik.",
      samplePdf: "/samples/autonomia-y-liberacion-lectura-de-prueba.pdf",
      seoTitle:
        "Autonomía y liberación | Christoph Menke | Negative Dialektik",
      seoDescription:
        "Primera edición en español de Autonomía y liberación de Christoph Menke. Teoría Crítica, Hegel y filosofía política.",
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
        "Una introducción rigurosa y accesible al pensamiento de Theodor W. Adorno.",
      longDescription: [
        "A través de los principales núcleos de su filosofía —la crítica de la razón instrumental, la dialéctica negativa, la crítica de la identidad y la teoría de la industria cultural—, Gerhard Schweppenhäuser reconstruye la unidad de una de las obras más influyentes del pensamiento contemporáneo.",
        "Un libro fundamental para comprender la Teoría Crítica y las contradicciones de la modernidad.",
        "Gerhard Schweppenhäuser es filósofo y uno de los principales especialistas contemporáneos en Teoría Crítica y Escuela de Frankfurt.",
      ],
      quote: {
        text:
          "Una de las introducciones más reconocidas sobre el pensamiento de Adorno publicadas en alemán.",
      },
      coverImage: "/images/books/theodor-w-adorno-introduccion.jpeg",
      isbn: "978-628-97478-4-3",
      pages: 216,
      format: "Edición de bolsillo",
      language: "Español",
      publicationDate: "2026-07-16",
      status: "lieferbar",
      stockStatus: "bestellbar-manuell",
      price: "99.000 COP",
      currency: "COP",
      checkoutEnabled: true,
      manualOrderNote:
        "Disponible directamente a través de Negative Dialektik.",
      samplePdf:
        "/samples/theodor-w-adorno-introduccion-lectura-de-prueba.pdf",
      seoTitle:
        "Theodor W. Adorno. Introducción | Gerhard Schweppenhäuser | Negative Dialektik",
      seoDescription:
        "Introducción en español al pensamiento de Theodor W. Adorno escrita por Gerhard Schweppenhäuser. Bildung 1.",
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
        "Una meditación filosófica sobre la flor como símbolo central de la experiencia estética, espiritual y reflexiva.",
      longDescription: [
        "La obra construye una meditación sobre el amor, el arte, el lenguaje y la formación interior, dirigida a lectores interesados en una experiencia estética exigente y luminosa.",
        "Josef Hackspacher estudió estética en la Universidad Goethe de Frankfurt con Christoph Menke y se especializa en filosofía alemana y Teoría Crítica.",
      ],
      quote: {
        text:
          "Articula la tradición de la estética con la Teoría Crítica a partir de un único motivo simbólico: la rosa.",
      },
      coverImage: "/images/books/alta-rosa-espigada.jpg",
      isbn: "978-628-97478-3-6",
      pages: 114,
      format: "Edición de bolsillo",
      language: "Español",
      publicationDate: "2026-07-16",
      status: "lieferbar",
      stockStatus: "bestellbar-manuell",
      price: "79.000 COP",
      currency: "COP",
      checkoutEnabled: true,
      manualOrderNote:
        "Disponible directamente a través de Negative Dialektik.",
      samplePdf: "/samples/alta-rosa-espigada-lectura-de-prueba.pdf",
      seoTitle:
        "Alta rosa espigada | Josef Hackspacher | Negative Dialektik",
      seoDescription:
        "Alta rosa espigada de Josef Hackspacher: simbología floral, estética alemana y Teoría Crítica.",
    },
    {
      slug: "formas-de-vida-y-critica-social",
      title: "Formas de vida y crítica social",
      subtitle: "Tres lecciones sobre la filosofía de Rahel Jaeggi",
      author: "Josef Hackspacher",
      editor: "Negative Dialektik",
      seriesSlug: "schriften-des-instituts",
      seriesDisplayLabel: "Escritos del Instituto 1",
      description:
        "Una introducción rigurosa y accesible a la filosofía de Rahel Jaeggi y a su teoría de las formas de vida.",
      longDescription: [
        "A través de los conceptos de alienación, formas de vida, progreso y regresión, la obra reconstruye el núcleo de su pensamiento y lo sitúa en diálogo con Marx, Adorno y Honneth.",
        "Más que una presentación panorámica, el libro ofrece una lectura sistemática de los problemas que atraviesan la experiencia social moderna y las posibilidades de su transformación.",
        "Josef Hackspacher es catedrático, traductor y editor. Su trabajo se concentra en filosofía alemana y Teoría Crítica.",
      ],
      quote: {
        text:
          "Combina claridad expositiva y rigor conceptual.",
      },
      coverImage: "/images/books/formas-de-vida-y-critica-social.jpeg",
      isbn: "978-628-97478-2-9",
      pages: 92,
      format: "Edición de bolsillo",
      language: "Español",
      publicationDate: "2026-07-16",
      status: "lieferbar",
      stockStatus: "bestellbar-manuell",
      price: "69.000 COP",
      currency: "COP",
      checkoutEnabled: true,
      manualOrderNote:
        "Disponible directamente a través de Negative Dialektik.",
      samplePdf:
        "/samples/formas-de-vida-y-critica-social-lectura-de-prueba.pdf",
      seoTitle:
        "Formas de vida y crítica social | Josef Hackspacher | Negative Dialektik",
      seoDescription:
        "Tres lecciones sobre la filosofía de Rahel Jaeggi, las formas de vida y la crítica social contemporánea.",
    },
    {
      slug: "anarquismo",
      title: "Anarquismo",
      subtitle: "Introducción",
      author: "Daniel Loick",
      translator: "Michael Francisco Eraso Horn",
      editor: "Negative Dialektik",
      seriesSlug: "bildung",
      seriesDisplayLabel: "Bildung 4",
      description:
        "Una guía rigurosa para comprender una de las tradiciones más influyentes del pensamiento emancipador moderno.",
      longDescription: [
        "El anarquismo suele asociarse con el rechazo del Estado, pero constituye mucho más que una crítica política.",
        "Este volumen introduce sus principales conceptos, autores y debates, desde Proudhon, Bakunin y Kropotkin hasta las formas contemporáneas de organización y resistencia.",
        "Daniel Loick es filósofo y docente en la Universidad Goethe de Frankfurt. Sus investigaciones se centran en teoría crítica, filosofía política y teoría del derecho.",
      ],
      quote: {
        text:
          "Presenta el anarquismo como una tradición intelectual compleja, reconstruyendo sus fundamentos teóricos y sus expresiones contemporáneas.",
      },
      coverImage: "/images/books/anarquismo.jpg",
      isbn: "978-628-97478-1-2",
      pages: 258,
      format: "Edición de bolsillo",
      language: "Español",
      publicationDate: "2026-12-01",
      status: "in-vorbereitung",
      stockStatus: "nicht-verfuegbar",
      checkoutEnabled: false,
      manualOrderNote:
        "Este título está en preparación y todavía no está disponible para compra.",
      samplePdf: "/samples/anarquismo-lectura-de-prueba.pdf",
      seoTitle: "Anarquismo | Daniel Loick | Negative Dialektik",
      seoDescription:
        "Introducción de Daniel Loick al anarquismo, la crítica del Estado, la dominación y la democracia.",
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
        "Edición inédita en español de los principales escritos estéticos de Karl Philipp Moritz.",
      longDescription: [
        "En estos textos se formula Moritz una de las ideas fundamentales de la modernidad: la comprensión de la obra de arte como una totalidad autónoma.",
        "El volumen es imprescindible para comprender la génesis de la estética moderna y la historia de la filosofía del arte.",
      ],
      quote: {
        text:
          "Permite acceder directamente a la formulación original de la idea moderna de la autonomía del arte.",
      },
      coverImage: "/images/books/lo-culminado-en-si-mismo.jpg",
      isbn: "978-628-97478-6-7",
      pages: 118,
      format: "Edición de bolsillo",
      language: "Español",
      publicationDate: "2026-12-01",
      status: "in-vorbereitung",
      stockStatus: "nicht-verfuegbar",
      checkoutEnabled: false,
      manualOrderNote:
        "Este título está en preparación y todavía no está disponible para compra.",
      samplePdf:
        "/samples/lo-culminado-en-si-mismo-lectura-de-prueba.pdf",
      seoTitle:
        "Lo culminado en sí mismo | Karl Philipp Moritz | Negative Dialektik",
      seoDescription:
        "Escritos fundamentales de Karl Philipp Moritz sobre teoría del arte, estética y autonomía de la obra.",
    },
  ],
};
