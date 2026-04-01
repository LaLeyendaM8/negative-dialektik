import { PageHero } from "../../components/shared/page-hero";
import { PageShell } from "../../components/shared/page-shell";
import { RichText } from "../../components/shared/rich-text";
import { SectionHeading } from "../../components/ui/section-heading";
import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/getContent";
import { formatCatalogStatus } from "@/lib/catalog-ui";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { programmPage, catalogContent } = getContent(lang);
  const announcedBooks = catalogContent.books.filter(
    (book) => book.status === "angekuendigt" || book.status === "vorbestellbar",
  );
  const upcomingBooks = catalogContent.books.filter(
    (book) => book.status === "in-vorbereitung",
  );
  const labels =
    lang === "de"
      ? {
          overviewTitle: "Katalogstruktur",
          overviewText:
            "Das Programm wird jetzt Schritt fuer Schritt als navigierbarer Katalog aufgebaut. Reihen und Titel sind bereits als eigenstaendige Seitentypen angelegt und koennen in den naechsten Schritten um Leseproben, Verfuegbarkeit und Kaufoptionen erweitert werden.",
          quickViewTitle: "Programm auf einen Blick",
          quickViewSeries: "Reihen",
          quickViewBooks: "Titel",
          quickViewAnnounced: "Angekündigt",
          quickViewUpcoming: "Demnaechst",
          openSeries: "Reihenseite oeffnen",
          openBook: "Buchseite oeffnen",
          announcedTitle: "Neuerscheinungen und Ankuendigungen",
          announcedSubtitle:
            "Titel, die bereits editorisch sichtbar gemacht werden und als erste Bezugspunkte des Programms nach aussen treten.",
          upcomingTitle: "Demnaechst",
          upcomingSubtitle:
            "Titel in Vorbereitung, die das kuenftige Wachstum des Programms bereits inhaltlich markieren.",
        }
      : {
          overviewTitle: "Estructura del catalogo",
          overviewText:
            "El programa se esta convirtiendo paso a paso en un catalogo navegable. Las colecciones y los titulos ya existen como tipos de pagina propios y en las siguientes fases podran ampliarse con muestras, disponibilidad y opciones de compra.",
          quickViewTitle: "Vista general del programa",
          quickViewSeries: "Colecciones",
          quickViewBooks: "Titulos",
          quickViewAnnounced: "Anunciados",
          quickViewUpcoming: "Proximamente",
          openSeries: "Abrir pagina de la coleccion",
          openBook: "Abrir pagina del libro",
          announcedTitle: "Novedades y anuncios",
          announcedSubtitle:
            "Titulos que ya adquieren visibilidad editorial y funcionan como primeros puntos de referencia del programa.",
          upcomingTitle: "Proximamente",
          upcomingSubtitle:
            "Titulos en preparacion que ya permiten reconocer el crecimiento futuro del programa.",
        };

  return (
    <PageShell>
      <PageHero title={programmPage.title} lead={programmPage.lead} />

      <RichText>
        {programmPage.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </RichText>

      <section className="mt-16 border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-10">
        <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
          {labels.overviewTitle}
        </p>
        <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.75] text-[var(--color-text)] md:text-[18px]">
          {labels.overviewText}
        </p>
      </section>

      <section className="mt-16">
        <SectionHeading title={labels.quickViewTitle} />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {labels.quickViewSeries}
            </p>
            <p
              className="mt-4 text-[44px] leading-none text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {catalogContent.series.length}
            </p>
          </div>
          <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {labels.quickViewBooks}
            </p>
            <p
              className="mt-4 text-[44px] leading-none text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {catalogContent.books.length}
            </p>
          </div>
          <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {labels.quickViewAnnounced}
            </p>
            <p
              className="mt-4 text-[44px] leading-none text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {announcedBooks.length}
            </p>
          </div>
          <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {labels.quickViewUpcoming}
            </p>
            <p
              className="mt-4 text-[44px] leading-none text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {upcomingBooks.length}
            </p>
          </div>
        </div>
      </section>

      {programmPage.sections.map((section) => (
        <section key={section.title} className="mt-16">
          <SectionHeading title={section.title} subtitle={section.subtitle} />

          <RichText>
            {"blocks" in section &&
              section.blocks &&
              section.blocks.map((block) => (
                <div key={block.title} className="mb-10 last:mb-0">
                  <h3>{block.title}</h3>
                  {block.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ))}

            {"paragraphs" in section &&
              section.paragraphs &&
              section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </RichText>
        </section>
      ))}

      <section className="mt-16">
        <SectionHeading
          title={catalogContent.overview.seriesTitle}
          subtitle={catalogContent.overview.seriesSubtitle}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {catalogContent.series.map((series) => (
            <Link
              key={series.slug}
              href={`/${lang}/reihen/${series.slug}`}
              className="block border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-opacity hover:opacity-80"
            >
              <div className="relative mb-6 aspect-[5/3] w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
                <Image
                  src={series.coverImage}
                  alt={series.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p
                className="text-[28px] leading-[1.08] text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {series.title}
              </p>
              <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                {formatCatalogStatus(lang, series.status)}
              </p>
              <p className="mt-3 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
                {series.description}
              </p>
              <p className="mt-6 text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] underline underline-offset-4">
                {labels.openSeries}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          title={catalogContent.overview.booksTitle}
          subtitle={catalogContent.overview.booksSubtitle}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {catalogContent.books.map((book) => (
            <Link
              key={book.slug}
              href={`/${lang}/buecher/${book.slug}`}
              className="block border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-opacity hover:opacity-80"
            >
              <div className="grid gap-5 sm:grid-cols-[132px_1fr] sm:items-start">
                <div className="relative aspect-[4/5] w-[132px] max-w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-contain p-2"
                    sizes="132px"
                  />
                </div>
                <div>
                  <p
                    className="text-[28px] leading-[1.08] text-[var(--color-text)]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {book.title}
                  </p>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                    {formatCatalogStatus(lang, book.status)}
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
                    {book.description}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] underline underline-offset-4">
                {labels.openBook}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {announcedBooks.length > 0 ? (
        <section className="mt-16">
          <SectionHeading
            title={labels.announcedTitle}
            subtitle={labels.announcedSubtitle}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {announcedBooks.map((book) => (
              <Link
                key={book.slug}
                href={`/${lang}/buecher/${book.slug}`}
                className="block border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-opacity hover:opacity-80"
              >
                <p
                  className="text-[30px] leading-[1.06] text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {book.title}
                </p>
                <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                  {formatCatalogStatus(lang, book.status)}
                </p>
                <p className="mt-4 text-[16px] leading-[1.75] text-[var(--color-text-secondary)]">
                  {book.description}
                </p>
                <p className="mt-6 text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] underline underline-offset-4">
                  {labels.openBook}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {upcomingBooks.length > 0 ? (
        <section className="mt-16">
          <SectionHeading
            title={labels.upcomingTitle}
            subtitle={labels.upcomingSubtitle}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {upcomingBooks.map((book) => (
              <Link
                key={book.slug}
                href={`/${lang}/buecher/${book.slug}`}
                className="block border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-opacity hover:opacity-80"
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
                <p className="mt-4 text-[15px] leading-[1.75] text-[var(--color-text-secondary)]">
                  {book.description}
                </p>
                <p className="mt-6 text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] underline underline-offset-4">
                  {labels.openBook}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
