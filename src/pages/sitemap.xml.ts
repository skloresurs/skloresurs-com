import { readItems } from "@directus/sdk";
import type { APIRoute } from "astro";
import { baseLocale, locales, localizeHref } from "@/paraglide/runtime";
import directus from "@/utils/cms";

const SITE_URL = import.meta.env.PUBLIC_URL || "https://skloresurs.com";

/**
 * Статичні сторінки. Список ведеться вручну: у SSR немає рантайм-доступу до
 * таблиці маршрутів Astro. Додаєш сторінку — додай і сюди.
 *
 * `/.well-known/matrix/client` свідомо відсутній — це службовий маршрут, якому
 * в sitemap не місце (раніше @astrojs/sitemap його туди клав).
 */
const STATIC_PATHS = [
  "/",
  "/productions",
  "/projects",
  "/catalog",
  "/delivery",
  "/news",
  "/reports",
  "/seminars",
  "/vacancies",
];

const PUBLISHED = { status: { _eq: "published" } };

interface Entry {
  path: string;
  lastmod?: string;
}

const XML_ESCAPES: Record<string, string> = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  "'": "&apos;",
  '"': "&quot;",
};

const escapeXml = (value: string) => value.replace(/[<>&'"]/g, char => XML_ESCAPES[char]);

const absolute = (path: string, locale: string) => new URL(localizeHref(path, { locale }), SITE_URL).href;

/**
 * Один `<url>` на кожну пару (сторінка, мова), і в кожному — повний набір
 * альтернатив. Саме цю форму рекомендує Google для багатомовних сайтів.
 */
const renderUrl = ({ path, lastmod }: Entry, locale: string) => {
  const alternates = [...locales, "x-default"]
    .map(hreflang => {
      const target = absolute(path, hreflang === "x-default" ? baseLocale : hreflang);
      return `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(target)}"/>`;
    })
    .join("");

  const lastmodTag = lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : "";

  return `<url><loc>${escapeXml(absolute(path, locale))}</loc>${lastmodTag}${alternates}</url>`;
};

export const GET: APIRoute = async () => {
  const [news, vacancies, productions] = await Promise.all([
    directus.request(
      readItems("skloresurs_news", {
        filter: PUBLISHED,
        fields: ["slug", "date_created"],
        limit: -1,
      }),
    ),
    directus.request(
      readItems("skloresurs_vacancies", {
        filter: PUBLISHED,
        fields: ["slug"],
        limit: -1,
      }),
    ),
    directus.request(
      readItems("skloresurs_productions", {
        filter: { position: { _nnull: true } },
        fields: ["position"],
        limit: -1,
      }),
    ),
  ]);

  const entries: Entry[] = [
    ...STATIC_PATHS.map(path => ({ path })),
    ...news.map(item => ({
      path: `/news/${item.slug}`,
      lastmod: item.date_created ?? undefined,
    })),
    ...vacancies.map(item => ({ path: `/vacancies/${item.slug}` })),
    ...productions.map(item => ({ path: `/productions/${item.position}` })),
  ];

  const urls = entries.flatMap(entry => locales.map(locale => renderUrl(entry, locale))).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
