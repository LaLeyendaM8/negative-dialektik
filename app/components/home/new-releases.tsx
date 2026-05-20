import Link from "next/link";
import { Container } from "../layout/container";
import { BookMedia } from "../shared/book-media";

type Book = {
  slug: string;
  title: string;
  description: string;
  coverTitle: string;
  coverImage: string;
};

type NewReleasesProps = {
  lang: string;
  books: Book[];
  title: string;
};

export function NewReleases({ lang, books, title }: NewReleasesProps) {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-[130px] md:py-[150px]">
      <Container>
        <h2
          className="mb-16 text-[46px] leading-[1.05] md:text-[64px]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
          {books.map((book) => (
            <Link
              key={book.slug}
              href={`/${lang}/buecher/${book.slug}`}
              className="group block"
            >
              <div className="mb-6 overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)]">
                <div className="relative aspect-[4/5] w-full bg-[var(--color-card)]">
                  <BookMedia
                    src={book.coverImage}
                    alt={book.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    imageClassName="object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                </div>
              </div>

              <h3
                className="mb-3 text-[24px] leading-[1.15] md:text-[26px]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {book.title}
              </h3>

              <p className="max-w-[28ch] text-[15px] leading-[1.65] text-[var(--color-text-secondary)]">
                {book.description}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
