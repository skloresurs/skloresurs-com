"use client";

import { ZoomIn } from "lucide-react";
import { useState } from "react";
import { map } from "remeda";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import LightboxImage from "@/components/ui/LightboxImage";
import type { Certificate } from "@/types/certificate";
import { getCmsAssetURL } from "@/utils/cms";
import { retryOnImageError } from "@/utils/img";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

interface IProps {
  certificates: Certificate[];
}

export default function CertificatesLightbox({ certificates }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-lg">
        <button type="button" onClick={() => setIsOpen(true)} className="group">
          <img
            src={getCmsAssetURL(certificates[0].certificate, "certificate.webp", {
              width: 768,
              quality: 75,
              format: "webp",
            })}
            alt=""
            className="h-full w-full object-cover duration-300 group-hover:brightness-50"
            loading="lazy"
            onError={retryOnImageError}
          />
          <div className="-translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 opacity-0 transition group-hover:opacity-100">
            <ZoomIn />
          </div>
        </button>
      </div>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        plugins={[Counter]}
        render={{ slide: ({ slide }) => <LightboxImage slide={slide} /> }}
        counter={{
          container: {
            style: { top: "unset", bottom: 0, left: "unset", right: 0 },
          },
        }}
        slides={map(certificates, ({ certificate: image }) => ({
          src: getCmsAssetURL(image, "certificate.webp", {
            width: 2048,
            quality: 80,
            format: "webp",
          }),
          alt: "Certificate",
        }))}
      />
    </>
  );
}
