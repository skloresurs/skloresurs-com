import type { CMSSchema } from "@/types/directus";
import { createDirectus, rest } from "@directus/sdk";

const CMS_URL = import.meta.env.PUBLIC_CMS_URL;

const directus = createDirectus<CMSSchema>(CMS_URL).with(rest());

export const getCmsAssetURL = (id: string, fileName = "") =>
  `${CMS_URL}/assets/${id}/${fileName}`;
export default directus;
