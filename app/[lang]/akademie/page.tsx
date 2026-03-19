import { PageHero } from "../../components/shared/page-hero";
import { PageShell } from "../../components/shared/page-shell";
import { RichText } from "../../components/shared/rich-text";
import { getContent } from "@/lib/getContent";

export default function AkademiePage({
  params,
}: {
  params: { lang: string };
}) {
  const { akademiePage } = getContent(params.lang);

  return (
    <PageShell>
      <PageHero title={akademiePage.title} lead={akademiePage.lead} />

      <RichText>
        {akademiePage.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {akademiePage.sections.map((section) => (
          <div key={section.title} className="mb-10 last:mb-0">
            <h2>{section.title}</h2>

            {"paragraphs" in section &&
              section.paragraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

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

            {"list" in section && section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </RichText>
    </PageShell>
  );
}