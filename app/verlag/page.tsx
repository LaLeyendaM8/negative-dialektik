import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { verlagPage } from "../content/pages/verlag";

export default function VerlagPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={verlagPage.eyebrow}
        title={verlagPage.title}
        lead={verlagPage.lead}
      />

      <RichText>
        {verlagPage.content.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <h2>{verlagPage.content.editorialTitle}</h2>

        {verlagPage.content.editorialParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <h2>{verlagPage.content.focusTitle}</h2>

        <ul>
          {verlagPage.content.focusItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{verlagPage.content.methodTitle}</h2>

        {verlagPage.content.methodParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </RichText>
    </PageShell>
  );
}