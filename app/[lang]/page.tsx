import { AcademyPreview } from "../components/home/academy-preview";
import { ClosingCta } from "../components/home/closing-cta";
import { Hero } from "../components/home/hero";
import { Mission } from "../components/home/mission";
import { NewReleases } from "../components/home/new-releases";
import { StiftungPreview } from "../components/home/stiftung-preview";
import { getContent } from "@/lib/getContent";

export default function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  const {
    homeAcademy,
    homeProgram,
    homeBooks,
    homeClosing,
    homeFocusItems,
    homeHero,
    homeMission,
    homeStiftung,
  } = getContent(params.lang);

  return (
    <main>
      <Hero lang={params.lang} hero={homeHero} focusItems={homeFocusItems} />
      <Mission lang={params.lang} mission={homeMission} />
      <NewReleases
        lang={params.lang}
        books={homeBooks}
        title={homeProgram.title}
      />
      <AcademyPreview lang={params.lang} academy={homeAcademy} />
      <StiftungPreview lang={params.lang} stiftung={homeStiftung} />
      <ClosingCta lang={params.lang} closing={homeClosing} />
    </main>
  );
}