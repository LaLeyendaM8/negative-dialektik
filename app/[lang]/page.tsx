import { AcademyPreview } from "../components/home/academy-preview";
import { ClosingCta } from "../components/home/closing-cta";
import { Hero } from "../components/home/hero";
import { Mission } from "../components/home/mission";
import { NewReleases } from "../components/home/new-releases";
import { StiftungPreview } from "../components/home/stiftung-preview";
import { getContent } from "@/lib/getContent";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const {
    homeAcademy,
    homeProgram,
    homeBooks,
    homeClosing,
    homeFocusItems,
    homeHero,
    homeMission,
    homeStiftung,
  } = getContent(lang);

  return (
    <main>
      <Hero lang={lang} hero={homeHero} focusItems={homeFocusItems} />
      <Mission lang={lang} mission={homeMission} />
      <NewReleases lang={lang} books={homeBooks} title={homeProgram.title} />
      <AcademyPreview lang={lang} academy={homeAcademy} />
      <StiftungPreview lang={lang} stiftung={homeStiftung} />
      <ClosingCta lang={lang} closing={homeClosing} />
    </main>
  );
}