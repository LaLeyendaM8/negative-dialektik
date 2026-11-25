import { AcademyPreview } from "../components/home/academy-preview";
import { ClosingCta } from "../components/home/closing-cta";
import { Hero } from "../components/home/hero";
import { Mission } from "../components/home/mission";
import { NewReleases } from "../components/home/new-releases";
import { ReliefNotice } from "../components/home/relief-notice";
import { StiftungPreview } from "../components/home/stiftung-preview";
import { getContent } from "@/lib/getContent";
import type { Metadata } from "next";
import { getLocalizedAlternates, isSupportedLanguage } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = isSupportedLanguage(langParam) ? langParam : "es";
  const { homeHero } = getContent(lang);

  return {
    title: { absolute: "Negative Dialektik" },
    description: homeHero.lead,
    alternates: getLocalizedAlternates(lang),
    openGraph: {
      title: "Negative Dialektik",
      description: homeHero.lead,
      url: `/${lang}`,
    },
  };
}

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
    homeReliefNotice,
    homeStiftung,
  } = getContent(lang);

  return (
    <main>
      <Hero lang={lang} hero={homeHero} focusItems={homeFocusItems} />
      <ReliefNotice notice={homeReliefNotice} />
      <Mission lang={lang} mission={homeMission} />
      <NewReleases lang={lang} books={homeBooks} title={homeProgram.title} />
      <AcademyPreview lang={lang} academy={homeAcademy} />
      <StiftungPreview lang={lang} stiftung={homeStiftung} />
      <ClosingCta lang={lang} closing={homeClosing} />
    </main>
  );
}
