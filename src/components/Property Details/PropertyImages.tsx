import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Property } from "@prisma/client";
const PropertyImages = ({ property }: { property: Property }) => {
  return (
    <section className="relative my-2 flex w-full gap-1 overflow-hidden rounded-[10px]">
      {/* Featured Property Image */}
      <Link href="#">
        <div className="relative flex min-w-[50%]">
          <Image
            src={property.imgSrc}
            alt=""
            width={800}
            height={800}
            className="duration-30 aspect-square object-cover transition-all hover:scale-95"
          />
          <div className="absolute inset-0 bg-zinc-700 opacity-0 transition-all duration-300 hover:opacity-20"></div>
        </div>
      </Link>

      {/* Gallery of Property Images */}
      <div className="grid h-auto w-auto grid-cols-2 gap-1">
        <div className="relative flex">
          <Link href="#">
            <Image
              src="/demo2.png"
              alt=""
              width={400}
              height={400}
              className="duration-30 aspect-square object-cover transition-all hover:scale-95"
            />
            <div className="absolute inset-0 bg-zinc-700 opacity-0 transition-all duration-300 hover:opacity-20"></div>
          </Link>
        </div>

        <div className="relative flex">
          <Link href="#">
            <Image
              src="/demo3.png"
              alt=""
              width={400}
              height={400}
              className="duration-30 aspect-square object-cover transition-all hover:scale-95"
            />
            <div className="absolute inset-0 bg-zinc-700 opacity-0 transition-all duration-300 hover:opacity-20"></div>
          </Link>
        </div>

        <Link href="#">
          <div className="relative flex">
            <Image
              src="/demo4.png"
              alt=""
              width={400}
              height={400}
              className="duration-30 aspect-square object-cover transition-all hover:scale-95"
            />
            <div className="absolute inset-0 bg-zinc-700 opacity-0 transition-all duration-300 hover:opacity-20"></div>
          </div>
        </Link>

        <div className="relative flex">
          <Link href="#">
            <Image
              src="/demo5.png"
              alt=""
              width={400}
              height={400}
              className="duration-30 aspect-square object-cover transition-all hover:scale-95"
            />
            <div className="absolute inset-0 bg-zinc-700 opacity-0 transition-all duration-300 hover:opacity-20"></div>
          </Link>

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
