import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import bun from "@nurodev/astro-bun";
import compress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import favicons from "astro-favicons";
import icon from "astro-icon";
import robots from "astro-robots";
import vtbot from "astro-vtbot";

const defaultLocale = "uk";
const locales = {
  uk: "uk",
  en: "en",
};

// https://astro.build/config
export default defineConfig({
  site: "https://skloresurs.com",
  trailingSlash: "ignore",
  output: "server",
  adapter: bun(),
  integrations: [
    react(),
    icon(),
    vtbot({
      loadingIndicator: false,
    }),
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
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
    }),
    robots(),
    compress(),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/paraglide",
      }),
    ],
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
