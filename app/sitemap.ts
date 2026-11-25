import type { MetadataRoute } from "next";
import { getCatalogContent } from "@/lib/getCatalog";
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

    return paths.map((path) => sitemapEntry(lang, path));
  });
}
