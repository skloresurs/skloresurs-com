import { defineMiddleware } from "astro:middleware";
import { startsWith } from "remeda";
import { paraglideMiddleware } from "./paraglide/server.js";

export const onRequest = defineMiddleware((context, next) => {
  const pathname = new URL(context.request.url).pathname;
  if (startsWith(pathname, "/api")) return next();
  // `request` тут уже де-локалізований (/en/projects → /projects). Його
  // обов'язково треба передати в next(), інакше Astro маршрутизує адресу з
  // префіксом, для якої сторінки не існує, і віддає 404.
  return paraglideMiddleware(context.request, ({ request }) => next(request));
});
