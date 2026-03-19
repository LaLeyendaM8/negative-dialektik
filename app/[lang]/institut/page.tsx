import { PageHero } from "../../components/shared/page-hero";
import { PageShell } from "../../components/shared/page-shell";
import { RichText } from "../../components/shared/rich-text";
import { getContent } from "@/lib/getContent";

export default async function InstitutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { institutPage } = getContent(lang);

  return (
    <PageShell>
      <PageHero title={institutPage.title} lead={institutPage.lead} />

      <RichText>
        {institutPage.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {institutPage.sections.map((section) => (
          <div key={section.title} className="mb-10 last:mb-0">
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ))}
      </RichText>
    </PageShell>
  );
}