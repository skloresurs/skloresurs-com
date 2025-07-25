import type { Catalog, CatalogTranslations } from "./catalog";
import type { Certificate } from "./certificate";
import type { Feedback } from "./feedback";
import type { News, NewsTranslations } from "./news";
import type { Partner } from "./partner";
import type { Productions, ProductionsTranslations } from "./productions";
import type { Project, ProjectTranslations } from "./project";
import type { QualityGuide } from "./quality-book";
import type { Report } from "./report";
import type { Seminars, SeminarsTranslations } from "./seminars";
import type { Vacancy, VacancyTranslations } from "./vacancy";

export type CMSSchema = {
  skloresurs_feedbacks: Feedback[];
  skloresurs_reports: Report[];
  skloresurs_certificates: Certificate[];
  skloresurs_quality_guide: QualityGuide;
  skloresurs_news: News[];
  skloresurs_news_translations: NewsTranslations[];
  skloresurs_partners: Partner[];
  skloresurs_productions_translations: ProductionsTranslations[];
  skloresurs_seminar: Seminars;
  skloresurs_seminar_translations: SeminarsTranslations[];
  skloresurs_productions: Productions[];
  skloresurs_catalog: Catalog[];
  skloresurs_catalog_translations: CatalogTranslations[];
  skloresurs_vacancies: Vacancy[];
  skloresurs_vacancies_translations: VacancyTranslations[];
  skloresurs_projects: Project[];
  skloresurs_projects_translations: ProjectTranslations[];
};
