import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { SectionHeading } from "../components/ui/section-heading";
import { autorenPage } from "../content/pages/autoren";

export default function AutorenPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={autorenPage.eyebrow}
        title={autorenPage.title}
        lead={autorenPage.lead}
      />

      <RichText>
        {autorenPage.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </RichText>

      {autorenPage.sections.map((section) => (
        <section key={section.title} className="mt-16">
          <SectionHeading title={section.title} subtitle={section.subtitle} />

          <RichText>
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