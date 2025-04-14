import type { Props } from "astro-seo";

interface IProps {
  title?: string;
  description?: string;
  pathname: string;
  locale?: string;
}

const titleDefault = "Astro Basis";
const descriptionDefault = "Astro Template";

export default function generateSeoData(props: IProps): Props {
  const title = props.title ? `${props.title} | ${titleDefault}` : titleDefault;
  const description = props.description || descriptionDefault;
  const canonical = `${import.meta.env.PUBLIC_URL}/${props.pathname}`;

  return {
    title: props.title,
    titleTemplate: `%s | ${titleDefault}`,
    titleDefault,
    charset: "UTF-8",
    description,
    canonical,
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
        locale: props.locale,
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
