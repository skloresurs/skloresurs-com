import { defineMiddleware } from "astro:middleware";
import { startsWith } from "remeda";
import { paraglideMiddleware } from "./paraglide/server.js";

export const onRequest = defineMiddleware((context, next) => {
  const pathname = new URL(context.request.url).pathname;
  if (startsWith(pathname, "/api")) return next();
  return paraglideMiddleware(context.request, () => next());
});
