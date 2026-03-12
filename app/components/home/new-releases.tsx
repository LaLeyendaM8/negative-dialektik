import Link from "next/link";
import { Container } from "../layout/container";

type Book = {
  slug: string;
  title: string;
  author: string;
  meta: string;
  coverTitle: string;
};

type NewReleasesProps = {
  books: Book[];
};

export function NewReleases({ books }: NewReleasesProps) {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-[130px] md:py-[150px]">
      <Container>
        <h2
          className="mb-16 text-[46px] leading-[1.05] md:text-[64px]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Reihen
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <Link
              key={book.slug}
              href={`/katalog/titel/${book.slug}`}
              className="group block"
            >
              <div className="mb-6 flex aspect-[4/5] items-center justify-center border border-[var(--color-border)] bg-[var(--color-card)] p-8 transition-colors group-hover:border-[var(--color-text)]">
                <p
                  className="max-w-[12ch] text-center text-[26px] leading-[1.35]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {book.coverTitle}
                </p>
              </div>

              <h3
                className="mb-2 text-[26px]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {book.title}
              </h3>

              <p className="mb-2 text-[16px] text-[var(--color-text-secondary)]">
                {book.author}
              </p>

              <p className="text-[14px] text-[var(--color-text-secondary)]">
                {book.meta}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}