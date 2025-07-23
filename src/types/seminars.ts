import type { Translations } from "./base";

export type Seminars = {
  id: string;
  translations: SeminarsTranslations[];
};

export type SeminarsTranslations = Translations & {
  body: string;
};
