"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";
import { dbPropertyData } from "../../database";

function Card({ propertyData }: { propertyData: dbPropertyData }) {
  return (
    <Link key={propertyData.id} href={`/property-details/${propertyData.url}`}>
      <div
        id="cardMainWrapper"
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg p-2"
      >
        {/* Dynamically render tag from db enum criteria */}
        <div className="absolute left-4 top-4 z-50 h-[18px] w-[70px]">
          <Image
            src="/tag-hot-home.svg"
            alt="demo"
            fill
            className="object-cover"
          />
        </div>
        <AspectRatio ratio={16 / 9} className="h-full w-full">
          <Image
            src={propertyData.imgSrc}
            alt="propertyData-image"
            fill
            className="rounded-t-[10px] object-cover"
          />
        </AspectRatio>
        <div
          id="cardContents"
          className="flex h-[88px] w-full flex-col justify-center space-y-2 rounded-b-[10px] border border-zinc-300 bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-normal leading-[14px] text-zinc-950">
              {propertyData.askPrice}
            </p>
            <div className="flex items-center justify-between gap-[2px]">
              <p className="text-xs font-normal leading-[14px] text-neutral-500">
                ARV:{" "}
              </p>
              <p className="text-xs font-normal leading-[14px] text-neutral-500">
                {propertyData.arv}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <p className="whitespace-nowrap text-sm font-normal leading-[14px] text-zinc-950">
              {propertyData.county}, {propertyData.state}
            </p>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="flex items-center justify-between gap-[2px]">
              <p className="text-xs font-normal leading-[14px] text-neutral-500">
                {propertyData.beds}
              </p>
              <p className="text-xs font-normal leading-[14px] text-neutral-500">
                bds
              </p>
            </div>
            <div className="flex items-center justify-between gap-[2px]">
              <p className="text-xs font-normal leading-[14px] text-neutral-500">
                {propertyData.baths}
              </p>
              <p className="text-xs font-normal leading-[14px] text-neutral-500">
                ba
              </p>
            </div>
            <div className="flex items-center justify-between gap-[2px]">
              <p className="text-xs font-normal leading-[14px] text-neutral-500">
                {propertyData.sqft}
              </p>
              <p className="text-xs font-normal leading-[14px] text-neutral-500">
                sqft
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
