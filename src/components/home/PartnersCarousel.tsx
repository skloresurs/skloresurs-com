import "keen-slider/keen-slider.min.css";
import type { Brand } from "@/types/brand";
import { useKeenSlider } from "keen-slider/react";
import { map } from "remeda";

interface IProps {
  partners: Brand[];
}

export default function PartnersCarousel({ partners }: IProps) {
  const animation = {
    duration: partners.length * 500,
    easing: (t: number) => t,
  };
  const [sliderRef] = useKeenSlider({
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    breakpoints: {
      "(min-width: 1024px)": {
        slides: {
          perView: 7,
          spacing: 10,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 8,
          spacing: 10,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 5,
          spacing: 10,
        },
      },
    },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    drag: false,
    loop: true,
    renderMode: "performance",
    slides: {
      perView: 3,
      spacing: 10,
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  return (
    <div ref={sliderRef} className="keen-slider">
      {map(partners, e => (
        <div key={e.id} className="keen-slider__slide">
          <img
            src={`${import.meta.env.PUBLIC_CMS_URL}/assets/${e.logo}`}
            alt={e.name}
            width={512}
            height={512}
            loading="lazy"
            className="select-none rounded-md object-contain"
          />
        </div>
      ))}
    </div>
  );
}
