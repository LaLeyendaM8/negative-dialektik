import type { CatalogContent } from "../catalog-types";

export const catalogContent: CatalogContent = {
  overview: {
    title: "Programa",
    lead:
      "El programa de Negative Dialektik reune ediciones, colecciones y lineas editoriales de largo aliento dentro del campo de la filosofia alemana.",
    seriesTitle: "Colecciones",
    seriesSubtitle:
      "Las lineas editoriales de la casa organizan el programa segun campos filosoficos y contextos de tradicion.",
    booksTitle: "Titulos",
    booksSubtitle:
      "Los primeros registros bibliograficos crean la base para futuras paginas de detalle, preventas y funciones de comercio.",
  },
  series: [
    {
      slug: "geist",
      title: "Geist",
      subtitle:
        "Teoria critica, filosofia social y debates contemporaneos.",
      description:
        "La coleccion reune trabajos fundamentales de filosofia contemporanea, teoria critica y filosofia social y politica.",
      theme:
        "Dialéctica, teoria, diagnostico del presente y filosofia en sentido estricto.",
      coverImage: "/images/books/geist.jpeg",
      status: "angekuendigt",
      featuredBooks: ["geist"],
      seoTitle: "Geist | Negative Dialektik",
      seoDescription:
        "Coleccion de filosofia contemporanea, teoria critica y filosofia social y politica.",
    },
    {
      slug: "bildung",
      title: "Bildung",
      subtitle: "Introducciones a conceptos, autores y problemas centrales.",
      description:
        "La coleccion ofrece accesos sistematicos a conceptos y autores fundamentales de la tradicion alemana y europea.",
      theme:
        "Orientacion, claridad conceptual y mediacion academica para estudio y docencia.",
      coverImage: "/images/books/bildung.jpeg",
      status: "in-vorbereitung",
      featuredBooks: ["bildung"],
      seoTitle: "Bildung | Negative Dialektik",
      seoDescription:
        "Coleccion de introducciones sistematicas a conceptos y autores clave.",
    },
    {
      slug: "rose",
      title: "Rose",
      subtitle: "Estetica, filosofia del arte y romanticismo aleman.",
      description:
        "Aqui aparecen textos en los que el arte, la belleza, la forma y la experiencia ocupan un lugar central.",
      theme:
        "Estetica, arte, romanticismo y sus constelaciones conceptuales.",
      coverImage: "/images/books/rose.jpeg",
      status: "in-vorbereitung",
      featuredBooks: ["rose"],
      seoTitle: "Rose | Negative Dialektik",
      seoDescription:
        "Coleccion dedicada a la estetica, la filosofia del arte y el romanticismo aleman.",
    },
    {
      slug: "schriften-des-instituts",
      title: "Escritos del Instituto",
      subtitle: "Investigaciones propias y textos programaticos.",
      description:
        "La coleccion reune conferencias, investigaciones y definiciones editoriales de Negative Dialektik.",
      theme:
        "Publicaciones propias del instituto y elaboraciones programaticas.",
      coverImage: "/images/books/schriften-des-instituts.jpeg",
      status: "in-vorbereitung",
      featuredBooks: ["schriften-des-instituts"],
      seoTitle: "Escritos del Instituto | Negative Dialektik",
      seoDescription:
        "Coleccion de investigaciones propias, conferencias y textos programaticos.",
    },
  ],
  books: [
    {
      slug: "geist",
      title: "GEIST",
      subtitle: "Coleccion de filosofia contemporanea y teoria critica",
      author: "Negative Dialektik",
      editor: "Negative Dialektik",
      seriesSlug: "geist",
      description:
        "Trabajos fundamentales de filosofia contemporanea, teoria critica y filosofia social y politica.",
      longDescription: [
        "GEIST concentra la linea editorial para textos filosoficos capaces de orientar debates actuales y prolongar problemas centrales de la tradicion alemana.",
        "La coleccion esta concebida como un espacio de referencia para titulos que articulan produccion teorica, analisis social y reflexion politica.",
      ],
      quote: {
        source: "Nota editorial",
        text: "La coleccion entiende la edicion filosofica no como archivo, sino como una intervencion en debates presentes.",
      },
      coverImage: "/images/books/geist.jpeg",
      isbn: "978-0-00-000001-1",
      pages: 240,
      format: "Rústica",
      language: "Espanol",
      publicationDate: "2026-09-01",
      status: "angekuendigt",
      stockStatus: "vorbestellung-manuell",
      price: "En preparacion",
      manualOrderNote:
        "Los pedidos y preventas se coordinan por ahora directamente a traves del instituto.",
      seoTitle: "GEIST | Negative Dialektik",
      seoDescription:
        "Linea editorial de filosofia contemporanea, teoria critica y filosofia social.",
    },
    {
      slug: "bildung",
      title: "BILDUNG",
      subtitle: "Coleccion de introducciones sistematicas",
      author: "Negative Dialektik",
      editor: "Negative Dialektik",
      seriesSlug: "bildung",
      description:
        "Introducciones sistematicas a conceptos, autores y problemas centrales de la tradicion alemana y europea.",
      longDescription: [
        "BILDUNG se dirige a lectoras y lectores que buscan un acceso concentrado a autores, problemas y conceptos fundamentales.",
        "La coleccion combina cuidado editorial con claridad didactica y resulta especialmente adecuada para estudio, docencia y orientacion academica.",
      ],
      quote: {
        source: "Nota editorial",
        text: "Introduccion conceptual y precision filologica se articulan aqui de manera deliberada.",
      },
      coverImage: "/images/books/bildung.jpeg",
      isbn: "978-0-00-000002-8",
      pages: 180,
      format: "Rústica",
      language: "Espanol",
      publicationDate: "2026-11-01",
      status: "in-vorbereitung",
      stockStatus: "nicht-verfuegbar",
      price: "En preparacion",
      manualOrderNote:
        "Para este titulo aun no tomamos pedidos, pero con gusto informamos sobre su estado editorial.",
      seoTitle: "BILDUNG | Negative Dialektik",
      seoDescription:
        "Coleccion de introducciones sistematicas a autores, conceptos y problemas.",
    },
    {
      slug: "rose",
      title: "ROSE",
      subtitle: "Coleccion de estetica y romanticismo aleman",
      author: "Negative Dialektik",
      editor: "Negative Dialektik",
      seriesSlug: "rose",
      description:
        "Trabajos dedicados a la estetica, la filosofia del arte y el romanticismo aleman.",
      longDescription: [
        "ROSE reune textos en los que la estetica aparece como un campo filosofico propio y no como una zona marginal.",
        "La coleccion establece conexiones entre experiencia, forma, arte y tradicion romantica.",
      ],
      quote: {
        source: "Nota editorial",
        text: "La estetica aparece aqui como una forma de teoria en la que experiencia, forma y critica se encuentran.",
      },
      coverImage: "/images/books/rose.jpeg",
      isbn: "978-0-00-000003-5",
      pages: 220,
      format: "Rústica",
      language: "Espanol",
      publicationDate: "2026-12-15",
      status: "in-vorbereitung",
      stockStatus: "nicht-verfuegbar",
      price: "En preparacion",
      manualOrderNote:
        "El titulo aun esta en preparacion. Si hay interes, ya puede enviarse una consulta al instituto.",
      seoTitle: "ROSE | Negative Dialektik",
      seoDescription:
        "Coleccion dedicada a la estetica, la filosofia del arte y el romanticismo aleman.",
    },
    {
      slug: "schriften-des-instituts",
      title: "ESCRITOS DEL INSTITUTO",
      subtitle: "Conferencias, investigacion y textos programaticos",
      author: "Negative Dialektik",
      editor: "Negative Dialektik",
      seriesSlug: "schriften-des-instituts",
      description:
        "Investigaciones propias, conferencias y textos programaticos de Negative Dialektik.",
      longDescription: [
        "Los Escritos del Instituto documentan el trabajo teorico e institucional propio de Negative Dialektik.",
        "Aqui aparecen textos que condensan investigacion, docencia y autocomprension editorial del instituto.",
      ],
      quote: {
        source: "Nota editorial",
        text: "Los Escritos del Instituto vuelven visible la propia programatica y la abren a discusion.",
      },
      coverImage: "/images/books/schriften-des-instituts.jpeg",
      isbn: "978-0-00-000004-2",
      pages: 200,
      format: "Rústica",
      language: "Espanol",
      publicationDate: "2027-02-01",
      status: "in-vorbereitung",
      stockStatus: "auf-anfrage",
      price: "En preparacion",
      manualOrderNote:
        "Las consultas sobre pedidos institucionales o futuras preventas ya pueden dirigirse al instituto.",
      seoTitle: "Escritos del Instituto | Negative Dialektik",
      seoDescription:
        "Investigaciones propias, conferencias y textos programaticos del instituto.",
    },
  ],
};
