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
      onClick={(event) => {
        if (!window.gtag || event.defaultPrevented || event.button !== 0 ||
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        event.preventDefault();
        let navigated = false;
        const continueToCheckout = () => {
          if (navigated) return;
          navigated = true;
          window.location.assign(href);
        };
        window.setTimeout(continueToCheckout, 650);
        window.gtag("event", "begin_checkout", {
          ...(currency && price != null ? { currency, value: price } : {}),
          items: [{ item_id: book.slug, item_name: book.title, quantity: 1, price: price ?? undefined }],
          event_callback: continueToCheckout,
          event_timeout: 600,
        });
      }}
      className="inline-flex border border-[var(--color-text)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
    >
      {label}
    </a>
  );
}
