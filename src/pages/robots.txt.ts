import type { APIRoute } from "astro";

const SITE_URL = import.meta.env.PUBLIC_URL || "https://skloresurs.com";

/**
 * robots.txt як SSR-ендпоінт, а не як файл, згенерований у dist на етапі білда.
 * Причина: на проді статично згенеровані robots.txt і sitemap віддавали 404,
 * тоді як усе з `public/` віддавалося нормально. Маршрут проходить через
 * `App.match()` в адаптері й від вмісту `dist/client` не залежить узагалі.
 */
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
