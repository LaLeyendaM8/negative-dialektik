import Link from "next/link";
import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { SectionHeading } from "../components/ui/section-heading";
import { kontaktPage } from "../content/pages/kontakt";

export default function KontaktPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={kontaktPage.eyebrow}
        title={kontaktPage.title}
        lead={kontaktPage.lead}
      />

      {kontaktPage.sections.map((section) => (
        <section key={section.title} className="mt-16 first:mt-0">
          <SectionHeading title={section.title} subtitle={section.subtitle} />

          <RichText>
            {"email" in section && section.email ? (
              <p>
                E-Mail:{" "}
                <Link
                  href={`mailto:${section.email}`}
                  className="underline underline-offset-4"
                >
                  {section.email}
                </Link>
              </p>
            ) : null}

            {"items" in section &&
              section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

            {"paragraphs" in section &&
              section.paragraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </RichText>
        </section>
      ))}
    </PageShell>
  );
}