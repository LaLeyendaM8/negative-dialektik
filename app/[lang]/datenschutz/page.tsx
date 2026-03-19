import { PageHero } from "../../components/shared/page-hero";
import { PageShell } from "../../components/shared/page-shell";
import { RichText } from "../../components/shared/rich-text";
import { getContent } from "@/lib/getContent";

export default function DatenschutzPage({
  params,
}: {
  params: { lang: string };
}) {
  const { datenschutzPage } = getContent(params.lang);

  return (
    <PageShell>
      <PageHero title={datenschutzPage.title} lead={datenschutzPage.lead} />

      <RichText>
        {datenschutzPage.sections.map((section) => (
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