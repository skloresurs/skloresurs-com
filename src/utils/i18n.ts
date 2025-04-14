import en from "@/locale/en.json";
import uk from "@/locale/uk.json";

import { filter, isTruthy, join, prop, split } from "remeda";

type T = {
  [key: string]: string;
};

export function useTranslations(locale?: string) {
  return (key: string) => {
    if (locale === "en") return prop(en as T, key);
    return prop(uk as T, key);
  };
}

export function getLocalizedUrl(locale: string | undefined, url: string) {
  const path = filter(split(url, "/"), isTruthy);
  if (path[0] === "en") path.shift();

  if (path.length === 0) return `/${locale}`;
  return `/${locale}/${join(path, "/")}`;
}
