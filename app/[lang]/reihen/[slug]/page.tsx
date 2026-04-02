import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../../../components/shared/page-hero";
import { PageShell } from "../../../components/shared/page-shell";
import { RichText } from "../../../components/shared/rich-text";
import { getCatalogContent, getSeriesBySlug } from "@/lib/getCatalog";
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
  const labels =
    lang === "de"
      ? {
          eyebrow: "Reihe",
          profile: "Profil",
          status: "Status",
          titles: "Titel der Reihe",
          titlesLead:
            "Die Reihe ist als editorischer Zusammenhang angelegt und bildet bereits die Grundlage fuer künftige Detailseiten und spätere Kaufoptionen.",
          openBook: "Buchseite öffnen",
          orderPath: "Bestellweg",
        }
      : {
          eyebrow: "Coleccion",
          profile: "Perfil",
          status: "Estado",
          titles: "Titulos de la coleccion",
          titlesLead:
            "La colección esta concebida como un conjunto editorial y ya sirve de base para futuras paginas de detalle y opciones de compra.",
          openBook: "Abrir pagina del libro",
          orderPath: "Via de pedido",
        };

  return (
    <PageShell>
      <PageHero title={series.title} lead={series.subtitle} eyebrow={labels.eyebrow} />

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
              {labels.status}
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-[var(--color-text)]">
              {formatCatalogStatus(lang, series.status)}
            </p>
          </div>
        </aside>

        <div>
          <section className="border-t border-[var(--color-border)] pt-8">
            <p className="mb-4 text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {labels.profile}
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
              {labels.titles}
            </h2>
            <p className="mt-4 max-w-[56ch] text-[17px] leading-[1.75] text-[var(--color-text-secondary)]">
              {labels.titlesLead}
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {books.map((book) => (
                <Link
                  key={book.slug}
                  href={`/${lang}/buecher/${book.slug}`}
                  className="block border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-opacity hover:opacity-80"
                >
                  <p
                    className="text-[28px] leading-[1.08] text-[var(--color-text)]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {book.title}
                  </p>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                    {formatCatalogStatus(lang, book.status)}
                  </p>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                    {formatStockStatus(lang, book.stockStatus)}
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
                    {book.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <p className="text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] underline underline-offset-4">
                      {labels.openBook}
                    </p>
                    <Link
                      href={getBookInquiryHref(lang, book)}
                      className="text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] underline underline-offset-4"
                    >
                      {labels.orderPath}
                    </Link>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
