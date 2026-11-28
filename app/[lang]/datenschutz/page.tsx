import { PageHero } from "../../components/shared/page-hero";
import { PageShell } from "../../components/shared/page-shell";
import { RichText } from "../../components/shared/rich-text";
import { getContent } from "@/lib/getContent";
import { analyticsPrivacy as deAnalytics } from "@/app/content/de/pages/datenschutz";
import { analyticsPrivacy as esAnalytics } from "@/app/content/es/pages/datenschutz";

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { datenschutzPage } = getContent(lang);
  const sections = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
    ? [...datenschutzPage.sections, lang === "de" ? deAnalytics : esAnalytics]
    : datenschutzPage.sections;

  return (
    <PageShell>
      <PageHero title={datenschutzPage.title} lead={datenschutzPage.lead} />

      <RichText>
        {sections.map((section) => (
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
