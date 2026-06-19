import Link from "next/link";
import { PageHero } from "../../../components/shared/page-hero";
import { PageShell } from "../../../components/shared/page-shell";
import { getContent } from "@/lib/getContent";

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { checkoutPage } = getContent(lang);

  return (
    <PageShell>
      <PageHero
        title={checkoutPage.successTitle}
        lead={checkoutPage.successLead}
      />

      <section className="border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
        <p className="text-[17px] leading-[1.8] text-[var(--color-text)]">
          {checkoutPage.successText}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`/${lang}/programm`}
            className="inline-flex border border-[var(--color-text)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
          >
            {checkoutPage.successProgram}
          </Link>
          <Link
            href={`/${lang}/kontakt`}
            className="inline-flex border border-[var(--color-border)] px-6 py-3 text-[14px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
          >
            {checkoutPage.successContact}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
