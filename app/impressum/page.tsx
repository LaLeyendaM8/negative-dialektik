import { PageHero } from "../components/shared/page-hero";
import { PageShell } from "../components/shared/page-shell";
import { RichText } from "../components/shared/rich-text";
import { impressumPage } from "../content/pages/impressum";

export default function ImpressumPage() {
  return (
    <PageShell>
      <PageHero
  title={impressumPage.title}
  lead={impressumPage.lead}
/>

      <RichText>
  {impressumPage.paragraphs.map((paragraph) => (
    <p key={paragraph}>
      {paragraph.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </p>
  ))}
</RichText>
    </PageShell>
  );
}