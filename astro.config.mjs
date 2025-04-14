// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
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

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_URL,
  trailingSlash: "ignore",
  output: "server",
  adapter: bun(),
  compressHTML: import.meta.env.PROD,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap(),
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
