import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import bun from "@nurodev/astro-bun";
import compress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import favicons from "astro-favicons";
import icon from "astro-icon";

// sitemap і robots віддаються SSR-ендпоінтами (src/pages/sitemap.xml.ts та
// src/pages/robots.txt.ts), а не інтеграціями @astrojs/sitemap і astro-robots.
// Дві причини: статично згенеровані файли на проді віддавали 404, і
// @astrojs/sitemap принципово не бачить /en/* — фізичних маршрутів під /en
// немає, префікс знімає paraglideMiddleware.

// https://astro.build/config
export default defineConfig({
  site: "https://skloresurs.com",
  trailingSlash: "ignore",
  output: "server",
  adapter: bun(),
  integrations: [
    react(),
    icon(),
    favicons({
      name: "Skloresurs",
      short_name: "Skloresurs",
      icons: {
        favicons: true,
        android: true,
        appleIcon: true,
        appleStartup: true,
        windows: true,
        yandex: false,
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push", "gtag"],
      },
    }),
    compress(),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/paraglide",
        // "url" мусить бути в стратегії, інакше paraglideMiddleware не де-локалізує
        // адресу (див. src/paraglide/server.js: `strategy.includes("url")`), а
        // localizeHref() все одно ставить префікс /en — і всі англомовні
        // посилання віддають 404. "url" стоїть першим, щоб мову визначала
        // виключно адреса: один URL — один контент, без редіректів за cookie.
        strategy: ["url", "cookie", "globalVariable", "baseLocale"],
      }),
    ],
    server: {
      allowedHosts: ["easy-muskox-hardy.ngrok-free.app"],
      headers: {
        "Content-Security-Policy": "frame-ancestors https://cms.skloresurs.com",
      },
    },
  },
  env: {
    schema: {
      PUBLIC_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://skloresurs.com",
      }),
      PUBLIC_CMS_URL: envField.string({
        context: "client",
        access: "public",
      }),
      CMS_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      PUBLIC_G_RECAPTCHA_SITE_KEY: envField.string({
        context: "client",
        access: "public",
      }),
      G_RECAPTCHA_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      GA_ID: envField.string({
        context: "server",
        access: "secret",
      }),
      G_TAG_MANAGER: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
