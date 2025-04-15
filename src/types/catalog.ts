import type { Translations } from "./base";

export type Catalog = {
  category: string;
  image: string;
  translations: CatalogTranslations[] | null;
};

export type CatalogTranslations = Translations & {
  title: string;
  description: string;
};
