import type { CatalogBook } from "@/app/content/catalog-types";

export function getBookInquiryHref(lang: string, book: CatalogBook) {
  const encodedTitle = encodeURIComponent(book.title);

  if (book.stockStatus === "nicht-verfuegbar") {
    return `/${lang}/kontakt?kind=info&book=${encodedTitle}`;
  }

  return `/${lang}/kontakt?kind=order&book=${encodedTitle}`;
}
