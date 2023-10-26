import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { accountItems, propImages } from "@/data/data";

function AccountFavorites() {
  return (
    <section
      id="contentWrapper"
      className="flex min-h-full w-full flex-col	gap-4 p-4 "
    >
      <div>
        <h2 className="text-[26px] font-medium leading-[17px] text-black">
          Favorites
        </h2>
      </div>

      {/* TODO: Turn this into a reuseable component. */}
      {/* TODO: Remove grid and place cards in a flexbox container. */}

      <div className="grid max-h-[66%] grid-cols-3  gap-4 overflow-y-scroll !scroll-smooth scrollbar-hide">
        {propImages.map((item, index) => (
          <div
            key={index}
            className="relative h-[225px] w-[245px] overflow-hidden rounded-t-[10px]"
          >
            {" "}
            {/* TODO: Add outline heart */}
            <FontAwesomeIcon
              icon={faHeart}
              className="absolute right-4 top-4 cursor-pointer text-white shadow-lg"
            />
            <Link href={`/property-details/${item.props.id}`}>
              <Image
                src={item.props.src}
                width={item.props.width}
                height={item.props.height}
                alt={item.props.alt}
                className={item.props.className}
              />
              <div className="flex flex-col gap-2 rounded-b-[10px] border border-zinc-300 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-normal leading-[14px] text-zinc-950">
                    {item.props.price}
                  </p>
                  <div className="flex items-center justify-between gap-[2px]">
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      ARV:{" "}
                    </p>
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      {item.props.arv}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <p className="whitespace-nowrap text-sm font-normal leading-[14px] text-zinc-950">
                    {item.props.location}
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="flex items-center justify-between gap-[2px]">
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      {item.props.beds}
                    </p>
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      bds
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-[2px]">
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      {item.props.baths}
                    </p>
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      ba
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-[2px]">
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      {item.props.sqft}
                    </p>
                    <p className="text-xs font-normal leading-[14px] text-neutral-500">
                      sqft
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-center p-2 ">
        <div>
          <button
            type="submit"
            className="h-[45px] w-[250px] rounded-[5px] border border-black"
          >
            View more
          </button>
        </div>
      </div>
    </section>
  );
}

export default AccountFavorites;
