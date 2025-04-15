interface ImportMetaEnv {
  readonly PUBLIC_URL: string;
  readonly PUBLIC_CMS_URL: string;
  readonly CMS_TOKEN: string;
  readonly PUBLIC_G_RECAPTCHA_SITE_KEY: string;
  readonly G_RECAPTCHA_SECRET: string;
  readonly GA_ID: string;
  readonly G_TAG_MANAGER: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
