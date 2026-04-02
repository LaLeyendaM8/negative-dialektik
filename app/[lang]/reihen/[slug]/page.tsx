import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "../../../components/shared/page-hero";
import { PageShell } from "../../../components/shared/page-shell";
import { RichText } from "../../../components/shared/rich-text";
import { getCatalogContent, getSeriesBySlug } from "@/lib/getCatalog";
import { getContent } from "@/lib/getContent";
import { formatCatalogStatus, formatStockStatus } from "@/lib/catalog-ui";
import { getBookInquiryHref } from "@/lib/commerce";

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const series = getSeriesBySlug(lang, slug);

  if (!series) {
    notFound();
  }

  const books = getCatalogContent(lang).books.filter(
    (book) => book.seriesSlug === series.slug,
  );
  const { seriesDetailPage } = getContent(lang);

  return (
    <PageShell>
      <PageHero
        title={series.title}
        lead={series.subtitle}
        eyebrow={seriesDetailPage.eyebrow}
      />

      <div className="grid gap-12 xl:grid-cols-[0.78fr_1.22fr] xl:gap-16">
        <aside className="self-start xl:sticky xl:top-10">
          <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px]">
              <Image
                src={series.coverImage}
                alt={series.title}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 360px"
              />
            </div>
          </div>

          <div className="mt-6 border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {seriesDetailPage.status}
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-[var(--color-text)]">
              {formatCatalogStatus(lang, series.status)}
            </p>
          </div>
        </aside>

        <div>
          <section className="border-t border-[var(--color-border)] pt-8">
            <p className="mb-4 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {seriesDetailPage.profile}
            </p>
            <RichText>
              <p>{series.description}</p>
              <p>{series.theme}</p>
            </RichText>
          </section>

          <section className="mt-14 border-t border-[var(--color-border)] pt-8">
            <h2
              className="text-[34px] leading-[1.06] text-[var(--color-text)] sm:text-[40px] md:text-[48px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {seriesDetailPage.titles}
            </h2>

            <div className="mt-8 grid gap-10 md:grid-cols-2">
              {books.map((book) => (
                <article key={book.slug} className="group">
                  <Link
                    href={`/${lang}/buecher/${book.slug}`}
                    className="block overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)]"
                  >
                    <div className="relative aspect-[4/5] w-full bg-[var(--color-surface)]">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </Link>

                  <div className="mt-6">
                    <Link href={`/${lang}/buecher/${book.slug}`} className="block">
                      <p
                        className="text-[38px] leading-[1.02] text-[var(--color-text)] md:text-[46px]"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {book.title}
                      </p>
                    </Link>
                    <p className="mt-3 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                      {formatCatalogStatus(lang, book.status)}
                    </p>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                      {formatStockStatus(lang, book.stockStatus)}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-4">
                      <Link
                        href={`/${lang}/buecher/${book.slug}`}
                        className="text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] underline underline-offset-4"
                      >
                        {seriesDetailPage.openBook}
                      </Link>
                      <Link
                        href={getBookInquiryHref(lang, book)}
                        className="text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] underline underline-offset-4"
                      >
                        {seriesDetailPage.orderPath}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
