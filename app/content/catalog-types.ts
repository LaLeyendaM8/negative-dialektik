export type CatalogLanguage = "de" | "es";

export type BookStatus =
  | "in-vorbereitung"
  | "angekuendigt"
  | "vorbestellbar"
  | "lieferbar"
  | "vergriffen";

export type CatalogSeries = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  theme: string;
  coverImage: string;
  status: BookStatus;
  featuredBooks: string[];
  seoTitle: string;
  seoDescription: string;
};

export type CatalogBook = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  translator?: string;
  editor?: string;
  seriesSlug: string;
  description: string;
  longDescription: string[];
  quote?: {
    source: string;
    text: string;
  };
  coverImage: string;
  isbn: string;
  pages: number;
  format: string;
  language: string;
  publicationDate: string;
  status: BookStatus;
  price?: string;
  currency?: string;
  buyLink?: string;
  samplePdf?: string;
  seoTitle: string;
  seoDescription: string;
};

export type CatalogOverview = {
  title: string;
  lead: string;
  seriesTitle: string;
  seriesSubtitle: string;
  booksTitle: string;
  booksSubtitle: string;
};

export type CatalogContent = {
  overview: CatalogOverview;
  series: CatalogSeries[];
  books: CatalogBook[];
};
