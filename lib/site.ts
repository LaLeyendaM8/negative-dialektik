import type { Metadata } from "next";

export const supportedLanguages = ["de", "es"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const defaultSiteUrl = "https://negative-dialektik.com";

export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return supportedLanguages.includes(lang as SupportedLanguage);
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configured) {
    return defaultSiteUrl;
  }

  try {
    const url = new URL(configured);
    return url.origin;
  } catch {
    return defaultSiteUrl;
  }
}

export function getLocalizedPath(lang: SupportedLanguage, path = "") {
  const normalizedPath = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `/${lang}${normalizedPath}`;
}

export function getLocalizedAlternates(
  lang: SupportedLanguage,
  path = "",
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: getLocalizedPath(lang, path),
    languages: {
      de: getLocalizedPath("de", path),
      es: getLocalizedPath("es", path),
      "x-default": getLocalizedPath("es", path),
    },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}
