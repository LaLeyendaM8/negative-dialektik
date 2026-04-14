import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../../components/shared/page-hero";
import { PageShell } from "../../components/shared/page-shell";
import { RichText } from "../../components/shared/rich-text";
import { SectionHeading } from "../../components/ui/section-heading";
import { getContent } from "@/lib/getContent";
import { formatCatalogStatus, formatStockStatus } from "@/lib/catalog-ui";

function ProgramBookGrid({
  books,
  lang,
  openLabel,
  orderLabel,
}: {
  books: {
    slug: string;
    title: string;
    description: string;
    coverImage: string;
    status: "in-vorbereitung" | "angekuendigt" | "vorbestellbar" | "lieferbar" | "vergriffen";
    stockStatus:
      | "nicht-verfuegbar"
      | "auf-anfrage"
      | "vorbestellung-manuell"
      | "bestellbar-manuell";
  }[];
  lang: string;
  openLabel: string;
  orderLabel: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3">
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
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            </div>
          </Link>

          <div className="mt-6">
            <Link href={`/${lang}/buecher/${book.slug}`} className="block">
              <p
                className="text-[36px] leading-[1.02] text-[var(--color-text)] md:text-[42px]"
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
            <p className="mt-5 max-w-[28ch] text-[17px] leading-[1.7] text-[var(--color-text-secondary)] md:text-[18px]">
              {book.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-6">
              <Link
                href={`/${lang}/buecher/${book.slug}`}
                className="text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] underline underline-offset-4"
              >
                {openLabel}
              </Link>
              <Link
                href={`/${lang}/kontakt?kind=order&book=${encodeURIComponent(book.title)}`}
                className="text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] underline underline-offset-4"
              >
                {orderLabel}
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { programmPage, catalogContent, programUi } = getContent(lang);
  const announcedBooks = catalogContent.books.filter(
    (book) => book.status === "angekuendigt" || book.status === "vorbestellbar",
  );
  const upcomingBooks = catalogContent.books.filter(
    (book) => book.status === "in-vorbereitung",
  );

  return (
    <PageShell>
      <PageHero title={programmPage.title} lead={programmPage.lead} />

      <RichText>
        {programmPage.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </RichText>

      {announcedBooks.length > 0 ? (
        <section className="mt-20">
          <SectionHeading title={programUi.announcedTitle} />
          <ProgramBookGrid
            books={announcedBooks}
            lang={lang}
            openLabel={programUi.openBook}
            orderLabel={programUi.orderPath}
          />
        </section>
      ) : null}

      {upcomingBooks.length > 0 ? (
        <section className="mt-20">
          <SectionHeading title={programUi.upcomingTitle} />
          <ProgramBookGrid
            books={upcomingBooks}
            lang={lang}
            openLabel={programUi.openBook}
            orderLabel={programUi.orderPath}
          />
        </section>
      ) : null}
    </PageShell>
  );
}
