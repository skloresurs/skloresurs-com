import type { Translations } from "./base";

export type Vacancy = {
  slug: string;
  status: string;
  image: {
    id: string;
    width: number;
    height: number;
  };
  video?: string;
  translations: VacancyTranslations[] | null;
};

export type VacancyTranslations = Translations & {
  title: string;
  description: string;
  body: string;
};
