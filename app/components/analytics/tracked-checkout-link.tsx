"use client";

export function TrackedCheckoutLink({
  href,
  label,
  book,
  price,
  currency,
}: {
  href: string;
  label: string;
  book: { slug: string; title: string };
  price?: number | null;
  currency?: string;
}) {
  return (
    <a
      href={href}
      onClick={() => {
        window.dataLayer?.push({
          event: "begin_checkout",
          ecommerce: {
            currency,
            value: price ?? undefined,
            items: [{ item_id: book.slug, item_name: book.title, quantity: 1, price }],
          },
        });
      }}
      className="inline-flex border border-[var(--color-text)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
    >
      {label}
    </a>
  );
}
