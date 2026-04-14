import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../../../components/shared/page-hero";
import { PageShell } from "../../../components/shared/page-shell";
import { RichText } from "../../../components/shared/rich-text";
import { getBookBySlug, getCatalogContent, getSeriesBySlug } from "@/lib/getCatalog";
import { getContent } from "@/lib/getContent";
import {
  formatCatalogDate,
  formatCatalogStatus,
  formatStockStatus,
} from "@/lib/catalog-ui";
import { getBookInquiryHref } from "@/lib/commerce";

export default async function BookPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const book = getBookBySlug(lang, slug);

  if (!book) {
    notFound();
  }

  const series = getSeriesBySlug(lang, book.seriesSlug);
  const relatedBooks = getCatalogContent(lang).books.filter(
    (entry) => entry.seriesSlug === book.seriesSlug && entry.slug !== book.slug,
  );
  const { bookDetailPage } = getContent(lang);

  const primaryAction =
    book.stockStatus === "bestellbar-manuell"
      ? {
          href: getBookInquiryHref(lang, book),
          label: lang === "de" ? "Manuell bestellen" : "Pedir manualmente",
        }
      : book.stockStatus === "vorbestellung-manuell"
        ? {
            href: getBookInquiryHref(lang, book),
            label: lang === "de" ? "Vorbestellung anfragen" : "Solicitar preventa",
          }
        : book.stockStatus === "auf-anfrage"
          ? {
              href: getBookInquiryHref(lang, book),
              label: lang === "de" ? "Bestellung anfragen" : "Consultar pedido",
            }
          : {
              href: getBookInquiryHref(lang, book),
              label:
                lang === "de"
                  ? "Verfuegbarkeit anfragen"
                  : "Consultar disponibilidad",
            };

  return (
    <PageShell>
      <PageHero
        title={book.title}
        lead={book.subtitle}
        eyebrow={bookDetailPage.eyebrow}
      />

      <div className="grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:gap-16">
        <aside className="self-start xl:sticky xl:top-10">
          <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px]">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 360px"
              />
            </div>
          </div>

          <div className="mt-6 border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {bookDetailPage.metadata}
            </p>
            <dl className="mt-5 space-y-4 text-[15px] leading-[1.6]">
              <div>
                <dt className="text-[var(--color-text-secondary)]">
                  {bookDetailPage.author}
                </dt>
                <dd>{book.author}</dd>
              </div>
              {book.translator ? (
                <div>
                  <dt className="text-[var(--color-text-secondary)]">
                    {bookDetailPage.translator}
                  </dt>
                  <dd>{book.translator}</dd>
                </div>
              ) : null}
              {book.editor ? (
                <div>
                  <dt className="text-[var(--color-text-secondary)]">
                    {bookDetailPage.editor}
                  </dt>
                  <dd>{book.editor}</dd>
                </div>
              ) : null}
              {series ? (
                <div>
                  <dt className="text-[var(--color-text-secondary)]">
                    {bookDetailPage.series}
                  </dt>
                  <dd>
                    <Link
                      href={`/${lang}/reihen/${series.slug}`}
                      className="underline underline-offset-4"
                    >
                      {series.title}
                    </Link>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="text-[var(--color-text-secondary)]">ISBN</dt>
                <dd>{book.isbn}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-secondary)]">
                  {bookDetailPage.pages}
                </dt>
                <dd>{book.pages}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-secondary)]">
                  {bookDetailPage.format}
                </dt>
                <dd>{book.format}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-secondary)]">
                  {bookDetailPage.language}
                </dt>
                <dd>{book.language}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-secondary)]">
                  {bookDetailPage.publicationDate}
                </dt>
                <dd>{formatCatalogDate(lang, book.publicationDate)}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-secondary)]">
                  {bookDetailPage.status}
                </dt>
                <dd>{formatCatalogStatus(lang, book.status)}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-secondary)]">
                  {bookDetailPage.stockStatus}
                </dt>
                <dd>{formatStockStatus(lang, book.stockStatus)}</dd>
              </div>
              {book.price ? (
                <div>
                  <dt className="text-[var(--color-text-secondary)]">
                    {bookDetailPage.price}
                  </dt>
                  <dd>{book.price}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </aside>

        <div>
          <section className="border-t border-[var(--color-border)] pt-8">
            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              {series ? (
                <Link
                  href={`/${lang}/reihen/${series.slug}`}
                  className="text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] underline underline-offset-4"
                >
                  {bookDetailPage.inSeries}: {series.title}
                </Link>
              ) : null}
              <span className="text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                {formatCatalogStatus(lang, book.status)}
              </span>
            </div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {bookDetailPage.description}
            </p>
            <RichText>
              <p>{book.description}</p>

              {book.longDescription.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {book.quote ? (
                <blockquote>
                  <p>{book.quote.text}</p>
                  <footer>{book.quote.source}</footer>
                </blockquote>
              ) : null}
            </RichText>
          </section>

          <section className="mt-14 border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {bookDetailPage.ctaTitle}
            </p>
            <p className="mt-4 max-w-[56ch] text-[17px] leading-[1.75] text-[var(--color-text)]">
              {bookDetailPage.ctaText}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={primaryAction.href}
                className="inline-flex border border-[var(--color-text)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
              >
                {primaryAction.label}
              </Link>
              {series ? (
                <Link
                  href={`/${lang}/reihen/${series.slug}`}
                  className="inline-flex border border-[var(--color-border)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
                >
                  {bookDetailPage.secondaryAction}
                </Link>
              ) : null}
            </div>
            {book.manualOrderNote ? (
              <p className="mt-6 max-w-[56ch] text-[15px] leading-[1.75] text-[var(--color-text-secondary)]">
                {book.manualOrderNote}
              </p>
            ) : null}
          </section>

          <section className="mt-14 border-t border-[var(--color-border)] pt-8">
            <p className="mb-4 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {bookDetailPage.timelineTitle}
            </p>
            <p className="max-w-[56ch] text-[16px] leading-[1.75] text-[var(--color-text-secondary)]">
              {bookDetailPage.timelineText}
            </p>
          </section>

          <section className="mt-14">
            <p className="mb-4 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {bookDetailPage.sampleTitle}
            </p>
            {book.samplePdf ? (
              <a
                href={book.samplePdf}
                className="text-[16px] leading-[1.75] text-[var(--color-text-secondary)] underline underline-offset-4"
              >
                {book.samplePdf}
              </a>
            ) : (
              <p className="max-w-[56ch] text-[16px] leading-[1.75] text-[var(--color-text-secondary)]">
                {bookDetailPage.sampleMissing}
              </p>
            )}
          </section>

          {relatedBooks.length > 0 ? (
            <section className="mt-14 border-t border-[var(--color-border)] pt-8">
              <p className="mb-6 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                {bookDetailPage.relatedTitle}
              </p>
              <div className="grid gap-5 md:grid-cols-2">
                {relatedBooks.map((relatedBook) => (
                  <Link
                    key={relatedBook.slug}
                    href={`/${lang}/buecher/${relatedBook.slug}`}
                    className="block border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-opacity hover:opacity-80"
                  >
                    <p
                      className="text-[24px] leading-[1.08] text-[var(--color-text)]"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {relatedBook.title}
                    </p>
                    <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                      {formatCatalogStatus(lang, relatedBook.status)}
                    </p>
                    <p className="mt-3 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
                      {relatedBook.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </PageShell>
  );
}
