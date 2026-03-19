import Image from "next/image";
import Link from "next/link";
import { Container } from "../layout/container";

type Book = {
  slug: string;
  title: string;
  description:string;
  coverTitle: string;
  coverImage: string;
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
          Aktuelles Programm
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
          {books.map((book) => (
            <Link
              key={book.slug}
              href="/programm"
              className="group block"
            >
              <div className="mb-6 overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)]">
                <div className="relative aspect-[4/5] w-full bg-[var(--color-card)]">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
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