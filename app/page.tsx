import { AcademyPreview } from "./components/home/academy-preview";
import { ClosingCta } from "./components/home/closing-cta";
import { Hero } from "./components/home/hero";
import { Mission } from "./components/home/mission";
import { NewReleases } from "./components/home/new-releases";
import { Program } from "./components/home/program";
import { StiftungPreview } from "./components/home/stiftung-preview";
import {
  homeAcademy,
  homeBooks,
  homeClosing,
  homeFocusItems,
  homeHero,
  homeMission,
  homeProgram,
  homeStiftung,
} from "./content/site/home";

export default function HomePage() {
  return (
    <main>
      <Hero hero={homeHero} focusItems={homeFocusItems} />
      <Mission mission={homeMission} />
      <Program program={homeProgram} />
      <NewReleases books={homeBooks} />
      <AcademyPreview academy={homeAcademy} />
      <StiftungPreview stiftung={homeStiftung} />
      <ClosingCta closing={homeClosing} />
    </main>
  );
}