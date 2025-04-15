import type { Project } from "@/types/project";
import { getCmsAssetURL } from "@/utils/cms";
import { Calendar, Info, MapPin, ZoomIn } from "lucide-react";
import { useState } from "react";
import { map } from "remeda";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";

interface IProps {
  project: Project;
}

export default function ProjectCardCarousel({ project }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const title = project.translations?.at(0)?.title;
  const images = map(project.images, el => el.directus_files_id);
  const location = project.location?.translations?.at(0)?.title;

  return (
    <>
      <button
        type="button"
        className="group relative block overflow-hidden rounded-lg"
        onClick={() => setIsOpen(true)}
        data-aos="zoom-out"
        data-aos-anchor-placement="top-bottom"
      >
        <img
          className="size-40 w-full rounded-lg object-cover duration-300 group-hover:brightness-[0.40]"
          src={getCmsAssetURL(project.thumbnail.id, project.thumbnail.name)}
          alt={title}
        />
        <div className="absolute right-2 bottom-2 left-2 opacity-0 transition group-hover:opacity-100">
          <h2 className="text-center text-lg">{title}</h2>
        </div>
        <div className="-translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 opacity-0 transition group-hover:opacity-100">
          <ZoomIn />
        </div>
      </button>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        plugins={[Captions, Counter]}
        counter={{
          container: {
            style: { top: "unset", bottom: 0, left: "unset", right: 0 },
          },
        }}
        slides={map(images, image => ({
          src: getCmsAssetURL(image.id, image.name),
          alt: title,
          width: image.width,
          height: image.height,
          title: title,
          description: (
            <div className="flex flex-col gap-1">
              <p className="flex flex-row items-center gap-1">
                <Info size={14} />
                {project.glass}
              </p>
              <p className="flex flex-row items-center gap-1">
                <MapPin size={14} />
                {location}
              </p>
              <p className="flex flex-row items-center gap-1">
                <Calendar size={14} />
                {project.year}
              </p>
            </div>
          ),
        }))}
      />
    </>
  );
}
