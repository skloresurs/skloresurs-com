import { useEffect, useState } from "react";
import type { Slide } from "yet-another-react-lightbox";

const withParam = (src: string, key: string, value: string) => {
  try {
    const url = new URL(src);
    url.searchParams.set(key, value);
    return url.toString();
  } catch {
    return src;
  }
};

const slideSrc = (slide: Slide) => ("src" in slide && slide.src ? slide.src : "");
const slideAlt = (slide: Slide) => ("alt" in slide && slide.alt ? slide.alt : "");

/**
 * Кастомний рендер слайда лайтбокса з повтором при збої завантаження:
 * 1) оригінальний (вже оптимізований) src;
 * 2) той самий src із cache-bust — лікує поодинокі мережеві помилки;
 * 3) менша ширина (1024) — запасний варіант для дуже повільних з'єднань.
 */
export default function LightboxImage({ slide }: { slide: Slide }) {
  const initial = slideSrc(slide);
  const [src, setSrc] = useState(initial);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setSrc(initial);
    setAttempt(0);
  }, [initial]);

  const handleError = () => {
    if (attempt === 0) {
      setAttempt(1);
      setSrc(withParam(initial, "r", "1"));
    } else if (attempt === 1) {
      setAttempt(2);
      setSrc(withParam(withParam(initial, "width", "1024"), "r", "2"));
    }
  };

  return (
    <img
      src={src}
      alt={slideAlt(slide)}
      onError={handleError}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        margin: "auto",
      }}
    />
  );
}
