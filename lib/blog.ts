import "server-only";
import { articles as deArticles, blog as deBlog } from "@/app/content/de/blog";
import { articles as esArticles, blog as esBlog } from "@/app/content/es/blog";
import { getLocalizedPath, supportedLanguages, type SupportedLanguage } from "./site";

const entries = { de: deArticles, es: esArticles };

export function getBlog(lang: SupportedLanguage) {
  return lang === "de" ? deBlog : esBlog;
}

export function getPublishedArticles(lang: SupportedLanguage) {
  return entries[lang]
    .filter((article) => article.status === "published" && article.date <= new Date().toISOString().slice(0, 10))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogLanguages(slug?: string) {
  return supportedLanguages.filter((lang) =>
    getPublishedArticles(lang).some((article) => !slug || article.slug === slug),
  );
}

export function getBlogAlternates(lang: SupportedLanguage, slug?: string) {
  const path = slug ? `blog/${slug}` : "blog";
  const languages = getBlogLanguages(slug);
  return {
    canonical: getLocalizedPath(lang, path),
    languages: {
      ...Object.fromEntries(languages.map((entry) => [entry, getLocalizedPath(entry, path)])),
      ...(languages.includes("es") ? { "x-default": getLocalizedPath("es", path) } : {}),
    },
  };
}

export function formatBlogDate(date: string, lang: SupportedLanguage) {
  return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "es-CO", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
