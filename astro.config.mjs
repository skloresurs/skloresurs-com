// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import bun from "@nurodev/astro-bun";
import playformCompress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import compressor from "astro-compressor";
import favicons from "astro-favicons";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import vtbot from "astro-vtbot";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { PUBLIC_URL } = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");

const defaultLocale = "uk";
const locales = {
  uk: "uk",
  en: "en",
};

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_URL,
  trailingSlash: "ignore",
  output: "server",
  adapter: bun(),
  vite: {
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/paraglide",
      }),
    ],
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
    }),
    icon(),
    robotsTxt(),
    vtbot({
      loadingIndicator: false,
    }),
    favicons({
      name: "Astro Basics",
      short_name: "Astro Basics",
      icons: {
        favicons: true,
        android: true,
        appleIcon: true,
        appleStartup: true,
        windows: true,
        yandex: false,
      },
    }),
    compressor(),
    playformCompress(),
  ],
});
