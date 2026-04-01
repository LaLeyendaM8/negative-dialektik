import { ContactForms } from "../../components/contact/contact-forms";
import { PageHero } from "../../components/shared/page-hero";
import { PageShell } from "../../components/shared/page-shell";
import { getContent } from "@/lib/getContent";

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { kontaktPage } = getContent(lang);

  return (
    <PageShell>
      <PageHero title={kontaktPage.title} lead={kontaktPage.lead} />

      <ContactForms
        lang={lang}
        contactForm={kontaktPage.form}
        newsletterForm={kontaktPage.newsletter}
      />

      <section className="mt-16 border-t border-[var(--color-border)] pt-10">
        <h2
          className="mb-8 text-[34px] leading-[1.1] md:text-[40px]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {kontaktPage.institute.title}
        </h2>

        <div className="space-y-3 text-[17px] leading-[1.75] text-[var(--color-text-secondary)]">
          {kontaktPage.institute.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>
            <a
              href={`mailto:${kontaktPage.institute.email}`}
              className="underline underline-offset-4"
            >
              {kontaktPage.institute.email}
            </a>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
