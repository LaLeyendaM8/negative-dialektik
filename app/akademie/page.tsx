import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { SectionHeading } from "../components/ui/section-heading";
import { akademiePage } from "../content/pages/akademie";

export default function AkademiePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={akademiePage.eyebrow}
        title={akademiePage.title}
        lead={akademiePage.lead}
      />

      <RichText>
        {akademiePage.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </RichText>

      {akademiePage.sections.map((section) => (
        <section key={section.title} className="mt-16">
          <SectionHeading title={section.title} subtitle={section.subtitle} />

          <RichText>
            {"groups" in section &&
              section.groups?.map((group) => (
                <div key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}

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