import type { Translations } from "./base";

export type News = {
  date_created: string;
  slug: string;
  status: string;
  thumbnail: {
    id: string;
    width: number;
    height: number;
  };
  translations: NewsTranslations[] | null;
};

export type NewsTranslations = Translations & {
  title: string;
  description: string;
  external_url: string | null;
  body: string | null;
};
