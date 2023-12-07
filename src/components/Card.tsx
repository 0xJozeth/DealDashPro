import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AspectRatio } from "./ui/aspect-ratio";
import { PropertyDataProps, Tag } from "../../prisma/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { db } from "@/db";
import { Property } from "@prisma/client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import HeartButton from "./HeartButton";
import useSWR from "swr";

function Card({
  user,
  isAuthenticated,
  propertyData,
}: {
  user: KindeUser;
  isAuthenticated: boolean;
  propertyData: Property;
}) {
  const imageUrls = propertyData?.images?.map((image) => image.url);

  const tag: Tag = {
    HotHome: {
      src: "/tag-hot-home.svg",
      width: "w-[70px]",
    },
    NewHome: {
      src: "/tag-new-home.svg",
      width: "w-[83px]",
    },
    Sold: {
      src: "/tag-sold-home.svg",
      width: "w-[49px]",
    },
    Pending: {
      src: "/tag-pending-home.svg",
      width: "w-[64px]",
    },
  };

  const selectedTag = propertyData?.popularity
    ? tag[propertyData.popularity]
    : null;

  return (
    <Link href={`/property-details/${propertyData.id}`}>
      <div
        id="cardMainWrapper"
        className="relative flex h-full w-full min-w-[250px] flex-col items-center justify-center overflow-hidden rounded-lg p-2"
      >
        {/* Dynamically render tag from db enum criteria */}
        {selectedTag && (
          <div
            className={`absolute left-4 top-4 z-50 h-[18px] ${selectedTag.width}`}
          >
            <Image
              src={selectedTag.src}
              fill
              alt="demo"
              className="object-cover"
            />
          </div>
        )}
        <AspectRatio ratio={16 / 9} className="h-full w-full">
          {imageUrls?.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt="propertyData-image"
              sizes="(100vw, 100vh)"
              fill
              className="rounded-t-[10px] object-cover"
            />
          ))}
        </AspectRatio>
        <div
          id="cardContents"
          className="flex h-[88px] w-full flex-col justify-center space-y-2 overflow-hidden rounded-b-[10px] border border-zinc-300 bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-normal leading-[14px] text-zinc-950">
              {propertyData?.askPrice}
            </p>
            <div className="flex items-center justify-between gap-[2px]">
              <p className="text-xs font-normal leading-[14px] text-neutral-500">
                ARV:{" "}
              </p>
              <p className="text-xs font-normal leading-[14px] text-neutral-500">
                {propertyData?.arv}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <p className="whitespace-nowrap text-sm font-normal leading-[14px] text-zinc-950">
              {propertyData?.county}, {propertyData?.state}
            </p>
          </div>
          <div className="flex ">
            <div className="flex w-full items-center  justify-start">
              <p className="text-xs font-normal leading-[14px] text-neutral-500 ">
                {propertyData?.beds} bds | {propertyData?.baths} ba |{" "}
                {propertyData?.sqft} sqft
              </p>
            </div>
            <HeartButton property={propertyData} user={user} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
