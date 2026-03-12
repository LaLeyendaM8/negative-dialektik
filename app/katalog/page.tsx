import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { SectionHeading } from "../components/ui/section-heading";
import { katalogPage } from "../content/pages/katalog";

export default function KatalogPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={katalogPage.eyebrow}
        title={katalogPage.title}
        lead={katalogPage.lead}
      />

      <RichText>
        {katalogPage.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </RichText>

      {katalogPage.sections.map((section) => (
        <section key={section.title} className="mt-16">
          <SectionHeading title={section.title} subtitle={section.subtitle} />

          <RichText>
            {"blocks" in section &&
              section.blocks &&
              section.blocks.map((block) => (
                <div key={block.title}>
                  <h3>{block.title}</h3>
                  {block.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ))}

            {"paragraphs" in section &&
              section.paragraphs &&
              section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </RichText>
        </section>
      ))}
    </PageShell>
  );
}