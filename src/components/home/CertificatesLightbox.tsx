"use client";

import type { Certificate } from "@/types/certificate";
import { getCmsAssetURL } from "@/utils/cms";
import { ZoomIn } from "lucide-react";
import { useState } from "react";
import { map } from "remeda";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";

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
            src={getCmsAssetURL(certificates[0].image, "certificate.webp")}
            alt=""
            className="h-full w-full object-cover duration-300 group-hover:brightness-50"
            loading="lazy"
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
        counter={{
          container: {
            style: { top: "unset", bottom: 0, left: "unset", right: 0 },
          },
        }}
        slides={map(certificates, ({ image }) => ({
          src: getCmsAssetURL(image, "certificate.webp"),
          alt: "Certificate",
        }))}
      />
    </>
  );
}
