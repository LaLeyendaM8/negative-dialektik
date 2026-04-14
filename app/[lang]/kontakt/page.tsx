import { ContactForms } from "../../components/contact/contact-forms";
import { PageHero } from "../../components/shared/page-hero";
import { PageShell } from "../../components/shared/page-shell";
import { getContent } from "@/lib/getContent";

function buildInitialMessage(lang: string, kind?: string, book?: string) {
  if (!book) {
    return "";
  }

  if (lang === "es") {
    if (kind === "order") {
      return `Hola,\n\nquisiera consultar una reserva o pedido manual para el titulo "${book}".\n\nGracias.`;
    }

    return `Hola,\n\nquisiera recibir mas informacion sobre el titulo "${book}".\n\nGracias.`;
  }

  if (kind === "order") {
    return `Guten Tag,\n\nich moechte eine Vorbestellung oder manuelle Bestellung fuer den Titel "${book}" anfragen.\n\nVielen Dank.`;
  }

  return `Guten Tag,\n\nich moechte weitere Informationen zum Titel "${book}" erhalten.\n\nVielen Dank.`;
}

function buildInitialSubject(lang: string, kind?: string, book?: string) {
  if (!book) {
    return "";
  }

  if (lang === "es") {
    return kind === "order"
      ? `Consulta de pedido: ${book}`
      : `Consulta sobre el titulo: ${book}`;
  }

  return kind === "order"
    ? `Bestellanfrage: ${book}`
    : `Anfrage zum Titel: ${book}`;
}

export default async function KontaktPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ kind?: string; book?: string }>;
}) {
  const { lang } = await params;
  const { kind, book } = await searchParams;
  const { kontaktPage } = getContent(lang);

  return (
    <PageShell>
      <PageHero title={kontaktPage.title} lead={kontaktPage.lead} />

      <ContactForms
        lang={lang}
        contactForm={kontaktPage.form}
        newsletterForm={kontaktPage.newsletter}
        initialSubject={buildInitialSubject(lang, kind, book)}
        initialMessage={buildInitialMessage(lang, kind, book)}
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
