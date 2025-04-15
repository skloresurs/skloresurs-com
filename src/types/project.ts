import type { Translations } from "./base";

type Image = {
  id: string;
  name: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  year: number;
  glass: string;
  glass_types: {
    skloresurs_project_glasses_id: ProjectGlassType;
  }[];
  location: {
    id: string;
    translations: ProjectLocationTranslations[] | null;
  };
  thumbnail: {
    id: string;
    name: string;
    width: number;
    height: number;
  };
  images: {
    directus_files_id: Image;
  }[];
  translations: ProjectTranslations[] | null;
};

export type ProjectTranslations = Translations & {
  title: string;
};

export type ProjectLocationTranslations = Translations & {
  title: string;
};

export type ProjectGlassType = {
  id: string;
  title: string;
};
