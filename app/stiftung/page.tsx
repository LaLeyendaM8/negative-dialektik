import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { stiftungPage } from "../content/pages/stiftung";

export default function StiftungPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={stiftungPage.eyebrow}
        title={stiftungPage.title}
        lead={stiftungPage.lead}
      />

      <RichText>
        {stiftungPage.content.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <h2>{stiftungPage.content.goalTitle}</h2>
        {stiftungPage.content.goalParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <h2>{stiftungPage.content.cooperationTitle}</h2>
        {stiftungPage.content.cooperationParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <h2>{stiftungPage.content.perspectiveTitle}</h2>
        {stiftungPage.content.perspectiveParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </RichText>
    </PageShell>
  );
}