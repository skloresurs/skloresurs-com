import directus from "@/utils/cms";
import { createItem, withToken } from "@directus/sdk";
import type { APIRoute } from "astro";
import ky from "ky";
import { endsWith } from "remeda";

const restrictedEmailDomains = ["sigismail.com"];

export const POST: APIRoute = async ({ request }) => {
  const { name, email, phone, message, captcha } = await request.json();

  if (restrictedEmailDomains.some(domain => endsWith(email, domain))) {
    return Response.json(
      {
        message: "invalid-email",
      },
      { status: 400 },
    );
  }

  if (!captcha) {
    return Response.json(
      {
        message: "invalid-captcha",
      },
      { status: 429 },
    );
  }

  if (!(name && email && message)) {
    return Response.json(
      {
        message: "missing-required-params",
      },
      {
        status: 400,
      },
    );
  }

  const response = await ky
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${import.meta.env.G_RECAPTCHA_SECRET}&response=${captcha}`,
    )
    .json<{ success: boolean }>()
    .catch(() => null);

  if (!response?.success) {
    return Response.json(
      {
        message: "invalid-captcha",
      },
      { status: 429 },
    );
  }

  await directus.request(
    withToken(
      import.meta.env.CMS_TOKEN,
      createItem("skloresurs_feedback", {
        name,
        email,
        phone: phone ?? null,
        body: message,
      }),
    ),
  );

  return Response.json(
    {
      message: "success",
    },
    {
      status: 200,
    },
  );
};
