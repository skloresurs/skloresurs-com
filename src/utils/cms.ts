import { createDirectus, rest } from "@directus/sdk";
import type { CMSSchema } from "@/types/directus";

const CMS_URL = import.meta.env.PUBLIC_CMS_URL;

const directus = createDirectus<CMSSchema>(CMS_URL).with(rest());

export type AssetTransform = {
  width?: number;
  height?: number;
  quality?: number;
  fit?: "cover" | "contain" | "inside" | "outside";
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
};

/**
 * Будує URL ассета Directus. За наявності `transform` додає параметри
 * трансформації на льоту (ширина/формат/якість), щоб не віддавати важкі
 * оригінали — це головна причина «битих» зображень на повільних з'єднаннях.
 */
export const getCmsAssetURL = (id: string, fileName = "", transform?: AssetTransform) => {
  const base = `${CMS_URL}/assets/${id}/${fileName}`;
  if (!transform) return base;

  const params = new URLSearchParams();
  if (transform.width) params.set("width", String(transform.width));
  if (transform.height) params.set("height", String(transform.height));
  if (transform.quality) params.set("quality", String(transform.quality));
  if (transform.fit) params.set("fit", transform.fit);
  if (transform.format) params.set("format", transform.format);

  const query = params.toString();
  return query ? `${base}?${query}` : base;
};

export default directus;
