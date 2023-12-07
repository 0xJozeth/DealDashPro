import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Property, PropertyImage } from "@prisma/client";
import { PropertyWithImages } from "../../../prisma/database";

const PropertyImages = ({ property }: { property: PropertyWithImages }) => {
  console.log("property images", property);

  const imageUrls = property.images.map((image: PropertyImage) => image.url);
  console.log("imageUrls", imageUrls);

  return (
    <section className="relative flex w-full items-center justify-center gap-1 overflow-hidden rounded-[10px] border border-red-600">
      {/* Featured Property Image */}
      <div className="relative flex min-w-[50%] p-[2px]">
        <Image
          src={imageUrls[0]}
          alt=""
          width={800}
          height={800}
          className="duration-30 aspect-square object-cover transition-all"
        />
        <div className="absolute inset-0 bg-zinc-700 opacity-0 transition-all duration-300 hover:opacity-20"></div>
      </div>

      {/* Gallery of Property Images */}
      <div className="flex ">
        <div className=" mt-1 grid h-full w-full grid-cols-2 gap-1 border border-red-600 p-0">
          {imageUrls
            ?.slice(0, Math.min(imageUrls.length, 4))
            .map((url: string, index: number) => (
              <div
                key={index}
                className="relative flex h-full w-full place-self-center"
              >
                <Image
                  src={url}
                  alt=""
                  width={400}
                  height={400}
                  className="duration-30 aspect-square border border-red-600 object-cover transition-all hover:scale-95"
                />
                <div className="absolute inset-0 bg-zinc-700 opacity-0 transition-all duration-300 hover:opacity-20" />
              </div>
            ))}

          {/* Show all photos button */}
          <Link href="#">
            <div
              id="galleryButtonWrapper"
              className="group absolute bottom-0 right-0 z-[100] mb-[21px] mr-[19px]"
            >
              <div
                id="gallerybutton"
                className=" flex h-7 w-[131px] items-center justify-center  gap-1 rounded-[5px] border border-black bg-white shadow-lg transition-all duration-300  group-hover:border-white group-hover:bg-zinc-600 group-hover:text-white"
              >
                <FontAwesomeIcon
                  icon={faImages}
                  className=" group-hover:text-white"
                />
                <p className="whitespace-nowrap text-xs font-normal leading-tight text-black group-hover:text-white">
                  Show all photos
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropertyImages;
