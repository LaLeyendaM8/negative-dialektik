import { PageHero } from "../../components/shared/page-hero";
import { PageShell } from "../../components/shared/page-shell";
import { RichText } from "../../components/shared/rich-text";
import { SectionHeading } from "../../components/ui/section-heading";
import { getContent } from "@/lib/getContent";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { programmPage } = getContent(lang);

  return (
    <PageShell>
      <PageHero title={programmPage.title} lead={programmPage.lead} />

      <RichText>
        {programmPage.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </RichText>

      {programmPage.sections.map((section) => (
        <section key={section.title} className="mt-16">
          <SectionHeading title={section.title} subtitle={section.subtitle} />

          <RichText>
            {"blocks" in section &&
              section.blocks &&
              section.blocks.map((block) => (
                <div key={block.title} className="mb-10 last:mb-0">
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