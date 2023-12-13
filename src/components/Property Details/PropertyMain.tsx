import Image from "next/image";
import Link from "next/link";

//Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLock,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { Company, Property } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CompanyProps, PropertyWithCompany } from "../../../prisma/database";
import { useState } from "react";

const PropertyMain = ({
  property,
  setToggleModal,
  setWinNowModal,
  closeModal,
}: {
  setWinNowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;

  property: PropertyWithCompany;
}) => {
  // Handles the view more button for the description.
  const [descViewMore, setDescViewMore] = useState(false);
  function handleDescViewMore() {
    setDescViewMore(!descViewMore);
  }

  // Accessing the google maps api key from the .env.local file.
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const googleMapParams = property.mapLocationUrl;

  // Accessing the company data from the property object.
  const company: Company = property.company;

  // Accessing the user data from the session api call.
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/kindeSession");
      return data.user || null;
    },
  });

  // Handles the user session loading state.
  if (userLoading) {
    return <div className="min-h-screen">Loading...</div>;
  }

  return (
    <section className="h-auto w-full py-4">
      <div
        id="mainSection"
        className="flex h-auto w-full justify-between gap-4"
      >
        <div className="flex h-auto w-[708px] flex-col pl-2 pr-16">
          <section
            id="pricingDetails"
            className="flex w-full flex-col gap-y-2 border-b border-b-zinc-300 pb-[24px]"
          >
            <div className="space-between flex w-full items-center gap-x-4">
              <p className="text-lg font-semibold">{property.askPrice}</p>
              <p className="text-xs">ARV: {property.arv}</p>
              <p className="text-xs">
                <span className="text-lg font-semibold">{property.beds}</span>{" "}
                Beds
              </p>
              <p className="text-xs">
                <span className="text-lg font-semibold">{property.baths}</span>{" "}
                Baths
              </p>
              <p className="text-xs">
                <span className="text-lg font-semibold">{property.sqft}</span>{" "}
                Sq Ft
              </p>
            </div>
            <div
              onClick={() => {
                setToggleModal(true);
                setWinNowModal(false);
              }}
              className="hover:cursor-pointer"
            >
              <p className="text-xs font-semibold underline">make an offer</p>
            </div>
          </section>
          <section
            id="aboutThisListing"
            className="flex w-full flex-col gap-y-4 py-[24px]"
          >
            <h2 className="text-[22px] font-semibold leading-relaxed">
              About this listing
            </h2>
            <p
              className={`${
                descViewMore ? "max-h-[2000px]" : "max-h-[68px]"
              } overflow-hidden text-base font-normal leading-normal text-black transition-all duration-300`}
            >
              {property.desc}
            </p>
            <div
              onClick={handleDescViewMore}
              className="cursor-pointer text-xs font-semibold underline"
            >
              <p>View More</p>
            </div>
          </section>

          <section id="details" className="flex w-full flex-col gap-y-4 py-2">
            <h3 className="text-sm font-semibold">Details</h3>
            <div
              id="detailsColumnsWrapper"
              className="flex w-full justify-between gap-8"
            >
              <div className="flex w-full flex-col gap-y-2">
                <div className="flex items-center justify-between border-b border-zinc-200 py-1">
                  <p className="text-sm text-neutral-500">Sq ft</p>

                  <p className="text-sm  font-normal leading-tight text-zinc-950">
                    {property.sqft}
                  </p>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-200 py-1">
                  <p className="text-sm text-neutral-500">Type</p>

                  <p className="text-sm  font-normal leading-tight text-zinc-950">
                    {property.type}
                  </p>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-200 py-1">
                  <p className="text-sm text-neutral-500">Year built</p>

                  <p className="text-sm  font-normal leading-tight text-zinc-950">
                    {property.yearBuilt}
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-y-2">
                <div className="flex items-center justify-between border-b border-zinc-200 py-1">
                  <p className="text-sm text-neutral-500">Lot Size</p>

                  <p className="text-sm  font-normal leading-tight text-zinc-950">
                    {property.lotSize}
                  </p>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-200 py-1">
                  <p className="text-sm text-neutral-500">Bedrooms</p>

                  <p className="text-sm  font-normal leading-tight text-zinc-950">
                    {property.beds}
                  </p>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-200 py-1">
                  <p className="text-sm text-neutral-500">Bathrooms</p>

                  <p className="text-sm  font-normal leading-tight text-zinc-950">
                    {property.baths}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* TODO: Mapping. */}
          <section
            id="documentsSection"
            className="flex w-full flex-col gap-1 py-[24px] "
          >
            <h3 className="text-[22px] font-semibold leading-relaxed">
              Documents
            </h3>
            <Link href="#">
              <p className="text-sm font-normal leading-[18px] text-black underline">
                Inspection Report
              </p>
            </Link>
            <Link href="#">
              <p className="text-sm font-normal leading-[18px] text-black underline">
                Preferred Lender - Quanta
              </p>
            </Link>
          </section>
          {/* TODO: Mapping. */}
          {property.matterportUrl && (
            <section
              id="matterportSection"
              className="flex w-full flex-col gap-1 border-t border-neutral-200 py-[24px]"
            >
              <div className="flex w-[425px] items-center justify-between space-x-6 ">
                <h3 className="text-[22px] font-semibold leading-relaxed">
                  Matterport - 3D walkthrough
                </h3>
              </div>
              <div className="">
                <div className="w-[425px] ">
                  <div className="relative items-center justify-center rounded-[10px]">
                    <div
                      className={`${
                        user ? "hidden" : "absolute z-[999]"
                      } inset-0 flex items-center justify-center opacity-40 transition-all duration-300 hover:opacity-60`}
                    >
                      <div className="h-[31px] w-[31px] rounded-full bg-zinc-300">
                        <FontAwesomeIcon
                          icon={faLock}
                          className="mt-[7px] h-full w-full text-center text-neutral-500"
                        />
                      </div>
                    </div>
                    <iframe
                      title="matterport"
                      width="425px"
                      height="264px"
                      src={property.matterportUrl}
                      className={`rounded-[10px] border-0 ${
                        !user && "pointer-events-none blur-[2px]"
                      }`}
                    />
                  </div>

                  <div className="my-2 flex items-center justify-start space-x-2 opacity-60 transition-all duration-300 hover:opacity-75">
                    <a
                      title="Open matterport in new tab"
                      rel="noopener"
                      href={property.matterportUrl}
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faExpand}
                        className="text-sm font-semibold leading-relaxed text-black opacity-100 transition-all duration-300 hover:opacity-75"
                      />
                    </a>
                    <p className="text-sm leading-normal text-black">
                      View fullscreen
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
          {property.streetViewUrl && (
            <section
              id="streetViewSection"
              className="flex w-full flex-col gap-1 border-t border-neutral-200 py-[24px]"
            >
              <h3 className="text-[22px] font-semibold leading-relaxed">
                Street view
              </h3>
              <div className="relative w-[425px] overflow-hidden rounded-[10px]">
                <iframe
                  title="streetview"
                  width="425px"
                  height="264px"
                  src={`${property.streetViewUrl}${googleApiKey}`}
                  className={`rounded-[10px] border-0 ${
                    !user && "pointer-events-none blur-sm"
                  }`}
                ></iframe>

                <div
                  className={`${
                    user ? "hidden" : "absolute"
                  } inset-0 flex items-center justify-center opacity-40 transition-all duration-300 hover:opacity-60`}
                >
                  <div className="h-[31px] w-[31px] rounded-full bg-zinc-300">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="mt-[7px] h-full w-full text-center text-neutral-500"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {property.mapLocationUrl && (
            <section
              id="media"
              className="flex w-full flex-col gap-1 border-t border-neutral-200 py-[24px]"
            >
              <h3 className="text-[22px] font-semibold leading-relaxed">
                Location
              </h3>
              <div className="relative w-[425px] overflow-hidden rounded-[10px]">
                <div className="relative">
                  <iframe
                    title="map"
                    width="425px"
                    height="264px"
                    className="rounded-[10px] border-0 object-cover"
                    src={`https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${googleMapParams}}`}
                  ></iframe>
                </div>
                {user && (
                  <div
                    className={`${
                      user ? "hidden" : "absolute"
                    } inset-0 flex items-center justify-center opacity-40 transition-all duration-300 hover:opacity-60`}
                  >
                    <div className="absolute inset-0 bg-zinc-700 opacity-50"></div>
                    <div className="h-[31px] w-[31px] rounded-full bg-zinc-300">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="mt-[7px] h-full w-full text-center text-neutral-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* TODO: dynamically update the rail size if view more is opened. */}
        <div id="sidebarRail" className="flex w-[300px] flex-col gap-4">
          <div id="sidebar" className="sticky top-0 flex w-[300px] flex-col">
            {/* TODO: mapping for buttons */}
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div
                onClick={() => {
                  setToggleModal(true);
                  setWinNowModal(false);
                }}
                id="makeAnOffefalseButton"
                className="flex h-[45px] w-[250px] min-w-[175px] items-center justify-center rounded-[5px] bg-[#58A053] hover:cursor-pointer"
              >
                <p className="text-base font-medium leading-normal text-white">
                  Make an offer
                </p>
              </div>
              <div
                onClick={() => {
                  setToggleModal(true);
                  setWinNowModal(true);
                }}
                id="winNowButton"
                className=" flex h-[45px] w-[250px] min-w-[175px] items-center justify-center rounded-[5px] border border-black transition-all duration-300 hover:cursor-pointer group-hover:border-[#58A053]"
              >
                <p className="text-base font-medium leading-normal text-black transition-all duration-300 group-hover:text-[#58A053]">
                  Win it now for {property.winNowPrice}
                </p>
              </div>

              <div className="flex h-[45px] w-[250px] min-w-[175px] items-center justify-center">
                <p className="text-center text-sm font-normal leading-[14px] text-black">
                  If someone buys for this price, no more offers will be
                  accepted.
                </p>
              </div>

              <div
                id="divider"
                className="h-[0px] w-full border border-neutral-200"
              ></div>
              <div
                id="companyDetailsWrapper"
                className="flex w-full items-start justify-center gap-4"
              >
                <div
                  id="companyInfoWrapper"
                  className="flex w-full flex-col gap-4"
                >
                  <div className="flex w-full">
                    <div className="flex w-full">
                      <div
                        id="companyImage"
                        className="flex h-[60px] overflow-hidden rounded-full"
                      >
                        {/* TODO: Mapping. */}
                        {/* TODO: need to look into image resizing by uploader and the correct implementation. */}
                        <Image
                          src={"/companyPic1.png"}
                          width={60}
                          height={60}
                          alt={"logo"}
                          className="aspect-square object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex w-full flex-col">
                      <div className="flex w-full flex-col gap-2">
                        <p
                          id=""
                          className="text-base font-semibold leading-tight text-black"
                        >
                          {company?.companyName}
                        </p>
                        <p
                          id=""
                          className="mb-2 text-sm font-normal leading-tight text-neutral-500"
                        >
                          Disposition Manager
                        </p>
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faPhone}
                            className="text-sm font-normal leading-tight text-[#58A053]"
                          />
                          <a
                            id=""
                            href={`tel:${company?.companyPhone}`}
                            className="text-sm font-normal leading-tight text-[#58A053]"
                          >
                            {company?.companyPhone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-sm font-normal leading-tight text-[#58A053]"
                          />
                          <a
                            id=""
                            href={`mailto:${company?.companyEmail}`}
                            className="text-sm font-normal leading-tight text-[#58A053]"
                          >
                            {company?.companyEmail}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link href="#">
                    <div className="flex h-[45px] w-full min-w-[175px] items-center justify-center rounded-[5px] bg-neutral-500">
                      <p className="text-base font-medium leading-normal text-white">
                        Inquire about property
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={`/${company?.companyName.replace(
                      /\s+/g,
                      "-",
                    )}/listings`}
                  >
                    <div className="flex h-[45px] w-full min-w-[175px] items-center justify-center rounded-[5px] border border-black">
                      <p className="text-base font-medium leading-normal text-black">
                        View all company deals
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyMain;
