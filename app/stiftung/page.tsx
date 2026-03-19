import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { stiftungPage } from "../content/pages/stiftung";

export default function StiftungPage() {
  return (
    <PageShell>
      <PageHero
        
        title={stiftungPage.title}
        lead={stiftungPage.lead}
      />

      <RichText>
        {stiftungPage.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {stiftungPage.sections.map((section) => (
          <div key={section.title}  className="mb-10 last:mb-0">
            <h2>{section.title}</h2>

            {"paragraphs" in section &&
              section.paragraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
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