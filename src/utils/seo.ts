import type { SEOProps } from "astro-seo";
import { m } from "@/paraglide/messages";
import { baseLocale, getLocale, locales, localizeHref } from "@/paraglide/runtime";

/**
 * Дефолт зі схеми `astro.config.ts` діє лише при імпорті з `astro:env/client`,
 * тому для сирого `import.meta.env` тримаємо запобіжник тут: без нього відсутня
 * змінна валила б рендер сторінки у 500 на `new URL()`.
 */
const SITE_URL = import.meta.env.PUBLIC_URL || "https://skloresurs.com";

/** OpenGraph очікує формат language_TERRITORY, а не голий код мови. */
const OG_LOCALES: Record<string, string> = {
  uk: "uk_UA",
  en: "en_US",
};

interface IProps {
  title?: string;
  description?: string;
  pathname: string;
}

/**
 * Абсолютний URL локалізованої версії шляху.
 *
 * `pathname` приходить із `Astro.url`, тобто вже без префікса мови — його знімає
 * middleware. Тому шлях завжди проганяємо через `localizeHref`, а не склеюємо
 * рядками: інакше canonical англомовної сторінки вказував би на українську, і
 * Google викидав би /en з індексу.
 */
const absoluteUrl = (pathname: string, locale?: string) =>
  new URL(localizeHref(pathname, locale ? { locale } : undefined), SITE_URL).href;

export default function generateSeoData(props: IProps): SEOProps {
  const titleTemplate = m.meta_layout_title_template();
  const titleDefault = m.meta_layout_title();

  const title = props.title ? `${props.title} | ${titleTemplate}` : titleDefault;
  const description = props.description || m.meta_home_description();
  const canonical = absoluteUrl(props.pathname);

  return {
    title: props.title,
    titleTemplate: `%s | ${titleTemplate}`,
    titleDefault,
    charset: "UTF-8",
    description,
    canonical,
    languageAlternates: [
      ...locales.map(locale => ({
        hrefLang: locale,
        href: absoluteUrl(props.pathname, locale),
      })),
      { hrefLang: "x-default", href: absoluteUrl(props.pathname, baseLocale) },
    ],
    openGraph: {
      basic: {
        title,
        type: "website",
        image: "/og.png",
        url: canonical,
      },
      optional: {
        description,
        siteName: titleDefault,
        locale: OG_LOCALES[getLocale()] ?? getLocale(),
      },
    },
    twitter: {
      card: "summary_large_image",
      site: props.title,
      title,
      description,
      image: "/og.png",
    },
    extend: {
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
        {
          rel: "sitemap",
          href: "/sitemap.xml",
        },
        {
          rel: "stylesheet",
          href: "https://unpkg.com/aos@next/dist/aos.css",
        },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
    },
  };
}
