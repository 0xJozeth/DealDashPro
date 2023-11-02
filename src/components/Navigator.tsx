import { faHeart, faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const propImages = [
  {
    name: "prop1",
    props: {
      src: "/prop1.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop2",
    props: {
      src: "/prop2.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop3",
    props: {
      src: "/prop3.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop4",
    props: {
      src: "/prop4.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop5",
    props: {
      src: "/prop5.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop6",
    props: {
      src: "/prop6.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop1",
    props: {
      src: "/prop1.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop2",
    props: {
      src: "/prop2.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop3",
    props: {
      src: "/prop3.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop4",
    props: {
      src: "/prop4.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop5",
    props: {
      src: "/prop5.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop6",
    props: {
      src: "/prop6.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  // Add more items to the propImages array if needed
];

function Navigator() {
  return (
    <div className="fixed right-16 top-[15%] z-[9999] flex items-center justify-center">
      <div className="z-[100] m-8 h-[800px] w-[600px] min-w-[300px] rounded-[10px] bg-slate-50 p-8 shadow-xl">
        <form
          id="searchBar"
          className="neutral-500 mb-4 flex w-full items-center justify-between gap-x-2 rounded-full border bg-white p-2 pl-4"
        >
          <input
            type="text"
            placeholder="Search by City or State"
            className="text-base-font-normal  w-1/2 border-r border-neutral-200 leading-normal text-neutral-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Price"
            className="text-base-font-normal leading-normal focus:outline-none"
          />
          <button type="submit" title="Search">
            <Image
              src="/search1.svg"
              width={32}
              height={32}
              alt="search"
              className="flex items-center justify-center"
            />
          </button>
        </form>
        <div className="scrollbar-hide grid max-h-[90%] grid-cols-2 gap-4 overflow-y-scroll !scroll-smooth">
          {propImages.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-t-[10px]"
            >
              {" "}
              {/* TODO: Add  */}
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
                <div className="flex flex-col gap-2 rounded-b-[10px] border border-zinc-300 p-4">
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
      </div>
    </div>
  );
}

export default Navigator;
