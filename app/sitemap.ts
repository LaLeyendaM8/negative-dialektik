import type { MetadataRoute } from "next";
import { getCatalogContent } from "@/lib/getCatalog";
import { getBlogAlternates, getPublishedArticles } from "@/lib/blog";
import {
  absoluteUrl,
  getLocalizedPath,
  supportedLanguages,
  type SupportedLanguage,
} from "@/lib/site";

const staticPaths = [
  "",
  "programm",
  "verlag",
  "institut",
  "akademie",
  "stiftung",
  "kontakt",
  "impressum",
  "datenschutz",
];

function sitemapEntry(lang: SupportedLanguage, path: string): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(getLocalizedPath(lang, path)),
    alternates: {
      languages: {
        de: absoluteUrl(getLocalizedPath("de", path)),
        es: absoluteUrl(getLocalizedPath("es", path)),
        "x-default": absoluteUrl(getLocalizedPath("es", path)),
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return supportedLanguages.flatMap((lang) => {
    const catalog = getCatalogContent(lang);
    const paths = [
      ...staticPaths,
      ...catalog.series.map((series) => `reihen/${series.slug}`),
      ...catalog.books.map((book) => `buecher/${book.slug}`),
    ];

    const articles = getPublishedArticles(lang);
    const blogEntries = articles.length ? [
      { ...getBlogAlternates(lang), lastModified: undefined },
      ...articles.map(({ slug, date }) => ({ ...getBlogAlternates(lang, slug), lastModified: date })),
    ] : [];
    return [
      ...paths.map((path) => sitemapEntry(lang, path)),
      ...blogEntries.map(({ canonical, languages, lastModified }) => ({
        url: absoluteUrl(canonical),
        lastModified,
        alternates: { languages: Object.fromEntries(
          Object.entries(languages).map(([key, url]) => [key, absoluteUrl(url)]),
        ) },
      })),
    ];
  });
}
