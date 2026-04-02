import { navigation as deNavigation } from "@/app/content/de/site/navigation";
import { footerContent as deFooterContent } from "@/app/content/de/site/footer";
import { uiText as deUiText } from "@/app/content/de/site/ui";

import { navigation as esNavigation } from "@/app/content/es/site/navigation";
import { footerContent as esFooterContent } from "@/app/content/es/site/footer";
import { uiText as esUiText } from "@/app/content/es/site/ui";

import { institutPage as deInstitutPage } from "@/app/content/de/pages/institut";
import { verlagPage as deVerlagPage } from "@/app/content/de/pages/verlag";
import { programmPage as deProgrammPage } from "@/app/content/de/pages/programm";
import { programUi as deProgramUi } from "@/app/content/de/pages/program-ui";
import { bookDetailPage as deBookDetailPage } from "@/app/content/de/pages/book-detail";
import { seriesDetailPage as deSeriesDetailPage } from "@/app/content/de/pages/series-detail";
import { akademiePage as deAkademiePage } from "@/app/content/de/pages/akademie";
import { stiftungPage as deStiftungPage } from "@/app/content/de/pages/stiftung";
import { kontaktPage as deKontaktPage } from "@/app/content/de/pages/kontakt";
import { impressumPage as deImpressumPage } from "@/app/content/de/pages/impressum";
import { datenschutzPage as deDatenschutzPage } from "@/app/content/de/pages/datenschutz";
import {
  homeHero as deHomeHero,
  homeFocusItems as deHomeFocusItems,
  homeMission as deHomeMission,
  homeProgram as deHomeProgram,
  homeAcademy as deHomeAcademy,
  homeStiftung as deHomeStiftung,
  homeClosing as deHomeClosing,
} from "@/app/content/de/site/home";

import { institutPage as esInstitutPage } from "@/app/content/es/pages/institut";
import { verlagPage as esVerlagPage } from "@/app/content/es/pages/verlag";
import { programmPage as esProgrammPage } from "@/app/content/es/pages/programm";
import { programUi as esProgramUi } from "@/app/content/es/pages/program-ui";
import { bookDetailPage as esBookDetailPage } from "@/app/content/es/pages/book-detail";
import { seriesDetailPage as esSeriesDetailPage } from "@/app/content/es/pages/series-detail";
import { akademiePage as esAkademiePage } from "@/app/content/es/pages/akademie";
import { stiftungPage as esStiftungPage } from "@/app/content/es/pages/stiftung";
import { kontaktPage as esKontaktPage } from "@/app/content/es/pages/kontakt";
import { impressumPage as esImpressumPage } from "@/app/content/es/pages/impressum";
import { datenschutzPage as esDatenschutzPage } from "@/app/content/es/pages/datenschutz";
import {
  homeHero as esHomeHero,
  homeFocusItems as esHomeFocusItems,
  homeMission as esHomeMission,
  homeProgram as esHomeProgram,
  homeAcademy as esHomeAcademy,
  homeStiftung as esHomeStiftung,
  homeClosing as esHomeClosing,
} from "@/app/content/es/site/home";
import { catalogContent as deCatalogContent } from "@/app/content/de/catalog";
import { catalogContent as esCatalogContent } from "@/app/content/es/catalog";

function getHomeBooksFromCatalog(
  books: readonly {
    slug: string;
    title: string;
    description: string;
    coverImage: string;
  }[],
) {
  return books.map((book) => ({
    slug: book.slug,
    title: book.title,
    description: book.description,
    coverTitle: book.title,
    coverImage: book.coverImage,
  }));
}

const content = {
  de: {
    navigation: deNavigation,
    footerContent: deFooterContent,
    uiText: deUiText,
    institutPage: deInstitutPage,
    verlagPage: deVerlagPage,
    programmPage: deProgrammPage,
    programUi: deProgramUi,
    bookDetailPage: deBookDetailPage,
    seriesDetailPage: deSeriesDetailPage,
    akademiePage: deAkademiePage,
    stiftungPage: deStiftungPage,
    kontaktPage: deKontaktPage,
    impressumPage: deImpressumPage,
    datenschutzPage: deDatenschutzPage,
    homeHero: deHomeHero,
    homeFocusItems: deHomeFocusItems,
    homeMission: deHomeMission,
    homeProgram: deHomeProgram,
    homeBooks: getHomeBooksFromCatalog(deCatalogContent.books),
    homeAcademy: deHomeAcademy,
    homeStiftung: deHomeStiftung,
    homeClosing: deHomeClosing,
    catalogContent: deCatalogContent,
  },
  es: {
    navigation: esNavigation,
    footerContent: esFooterContent,
    uiText: esUiText,
    institutPage: esInstitutPage,
    verlagPage: esVerlagPage,
    programmPage: esProgrammPage,
    programUi: esProgramUi,
    bookDetailPage: esBookDetailPage,
    seriesDetailPage: esSeriesDetailPage,
    akademiePage: esAkademiePage,
    stiftungPage: esStiftungPage,
    kontaktPage: esKontaktPage,
    impressumPage: esImpressumPage,
    datenschutzPage: esDatenschutzPage,
    homeHero: esHomeHero,
    homeFocusItems: esHomeFocusItems,
    homeMission: esHomeMission,
    homeProgram: esHomeProgram,
    homeBooks: getHomeBooksFromCatalog(esCatalogContent.books),
    homeAcademy: esHomeAcademy,
    homeStiftung: esHomeStiftung,
    homeClosing: esHomeClosing,
    catalogContent: esCatalogContent,
  },
} as const;

export function getContent(lang: string) {
  return content[lang as "de" | "es"] ?? content.de;
}
