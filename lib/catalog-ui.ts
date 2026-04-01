import type { BookStatus } from "@/app/content/catalog-types";

export function formatCatalogStatus(lang: string, status: BookStatus) {
  const labels =
    lang === "de"
      ? {
          "in-vorbereitung": "In Vorbereitung",
          angekuendigt: "Angekuendigt",
          vorbestellbar: "Vorbestellbar",
          lieferbar: "Lieferbar",
          vergriffen: "Vergriffen",
        }
      : {
          "in-vorbereitung": "En preparacion",
          angekuendigt: "Anunciado",
          vorbestellbar: "Preventa",
          lieferbar: "Disponible",
          vergriffen: "Agotado",
        };

  return labels[status];
}

export function formatCatalogDate(lang: string, isoDate: string) {
  const locale = lang === "de" ? "de-DE" : "es-ES";

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isoDate));
}
