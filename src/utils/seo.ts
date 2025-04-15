import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";
import type { Props } from "astro-seo";

interface IProps {
  title?: string;
  description?: string;
  pathname: string;
}

export default function generateSeoData(props: IProps): Props {
  const titleTemplate = m.meta_layout_title_template();
  const titleDefault = m.meta_layout_title();

  const title = props.title
    ? `${props.title} | ${titleTemplate}`
    : titleDefault;
  const description = props.description || m.meta_home_description();
  const canonical = `${import.meta.env.PUBLIC_URL}/${props.pathname}`;

  return {
    title: props.title,
    titleTemplate: `%s | ${titleTemplate}`,
    titleDefault,
    charset: "UTF-8",
    description,
    canonical,
    languageAlternates: [
      {
        hrefLang: "uk",
        href: `${import.meta.env.PUBLIC_URL}/en${props.pathname}`,
      },
      {
        hrefLang: "en",
        href: `${import.meta.env.PUBLIC_URL}${props.pathname}`,
      },
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
        locale: getLocale(),
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
          href: "/sitemap-index.xml",
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
