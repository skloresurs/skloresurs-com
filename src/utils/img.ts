import type { SyntheticEvent } from "react";

/**
 * Обробник `onError` для `<img>`: повторює завантаження до 2 разів із
 * cache-bust параметром. Захищає від поодиноких мережевих збоїв, щоб
 * зображення не залишалося «битим» до перезавантаження сторінки.
 */
export const retryOnImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget;
  const tries = Number(img.dataset.retry ?? "0");
  if (tries >= 2) return;

  img.dataset.retry = String(tries + 1);
  try {
    const url = new URL(img.src);
    url.searchParams.set("r", String(tries + 1));
    img.src = url.toString();
  } catch {
    // невалідний URL — нічого не робимо
  }
};
