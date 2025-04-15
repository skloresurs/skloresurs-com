import type { Translations } from "./base";

export type Productions = {
  id: string;
  translations: ProductionsTranslations[] | null;
  position: number | null;
  video_mp4: string;
  video_av1: string | null;
  alternative: Productions | null;
};

export type ProductionsTranslations = Translations & {
  title: string;
  description: string;
};
