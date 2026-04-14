import { catalogContent as deCatalogContent } from "@/app/content/de/catalog";
import { catalogContent as esCatalogContent } from "@/app/content/es/catalog";
import type {
  CatalogBook,
  CatalogContent,
  CatalogSeries,
} from "@/app/content/catalog-types";

const catalogByLanguage = {
  de: deCatalogContent,
  es: esCatalogContent,
} as const satisfies Record<string, CatalogContent>;

export function getCatalogContent(lang: string): CatalogContent {
  return catalogByLanguage[lang as "de" | "es"] ?? catalogByLanguage.de;
}

export function getSeriesBySlug(
  lang: string,
  slug: string,
): CatalogSeries | undefined {
  return getCatalogContent(lang).series.find((entry) => entry.slug === slug);
}

export function getBookBySlug(
  lang: string,
  slug: string,
): CatalogBook | undefined {
  return getCatalogContent(lang).books.find((entry) => entry.slug === slug);
}
