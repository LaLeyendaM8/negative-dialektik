import Link from "next/link";
import { PageHero } from "../../../components/shared/page-hero";
import { PageShell } from "../../../components/shared/page-shell";
import { getContent } from "@/lib/getContent";

export default async function CheckoutCancelPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ slug?: string }>;
}) {
  const { lang } = await params;
  const { slug } = await searchParams;
  const { checkoutPage } = getContent(lang);
  const bookHref = slug ? `/${lang}/buecher/${slug}` : `/${lang}/programm`;

  return (
    <PageShell>
      <PageHero
        title={checkoutPage.cancelTitle}
        lead={checkoutPage.cancelLead}
      />

      <section className="border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
        <div className="mt-2 flex flex-wrap gap-4">
          <Link
            href={bookHref}
            className="inline-flex border border-[var(--color-text)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
          >
            {checkoutPage.cancelBook}
          </Link>
          <Link
            href={`/${lang}/kontakt`}
            className="inline-flex border border-[var(--color-border)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
          >
            {checkoutPage.cancelContact}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
