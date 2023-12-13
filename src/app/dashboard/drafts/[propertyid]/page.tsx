"use client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { headers } from "next/headers";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Bath, Bed, Delete, Edit, Eye, Fullscreen, Rss } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

function EditProperty() {
  const propertyId = usePathname().split("/").pop();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/kindeSession");
      console.log("useQuery data", data);
      return (data.user as KindeUser) || [];
    },
  });

  const { data: property, isLoading: propertyLoading } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `/api/user/${user?.id}/property/draftProperties/${propertyId}`,
        );
        console.log("Editing the user's specific property", property);
        return (data as Property) || [];
      } catch (error) {
        console.error(error);
      }
    },
    enabled: !!user?.id && !!propertyId,
  });

  if (!user) {
    return <div>Loading User info...</div>;
  }

  if (!property) {
    return <div>Loading Property info...</div>;
  }

  return (
    <MaxWidthWrapper className="min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold leading-[30px] text-zinc-950">
          <span className="font-medium">Now Editing: </span>
          {property.address1}
        </h1>
        <section
          key={property.id}
          className="my-8 flex h-48 w-full items-center justify-between gap-2 rounded-[20px] bg-zinc-50 p-2  shadow-lg"
        >
          <div id="propertyImage" className="flex h-full min-w-[192px]">
            <Image
              src={property.featuredImage || "/noImage.png"} // map data here, also add a placeholder image e.g. src={data.image || "/placeholder.png"} where the placeholder states "upload an image"
              alt="property-image"
              width={192}
              height={192}
              className="rounded-[20px] object-cover"
            />
          </div>
          <div
            id="propertyDetails"
            className="flex h-full w-auto flex-1 flex-col justify-between gap-2 rounded-[20px] bg-white p-4 leading-relaxed text-zinc-950"
          >
            <h3 className="w-full truncate text-lg font-bold">
              {property.heading}
            </h3>
            <p className="max-w-[360px] overflow-hidden truncate text-zinc-600">
              {property.desc}
            </p>
            <div
              id="propertySpecifics"
              className="flex w-full gap-6 text-zinc-600"
            >
              <div id="bedsNo" className="flex items-center gap-1">
                <p>{property.address1}</p>
                <Bed size={16} />
              </div>
              <div id="bedsNo" className="flex items-center gap-1">
                <p>{property.baths}</p>
                <Bath size={16} />
              </div>
              <div id="bedsNo" className="flex items-center gap-1">
                <p>{property.beds}</p>
                <Fullscreen size={16} />
              </div>
              <div id="bedsNo" className="flex items-center gap-1">
                <p>{property.views}</p>
                <Eye size={16} />
              </div>
            </div>
            <div id="actions" className="flex w-full gap-6 text-zinc-600">
              <Link
                prefetch={false}
                href={`/dashboard/drafts/${property.id}`}
                className="flex items-center gap-2"
              >
                <Edit size={16} color="green" />
                <p>Edit</p>
              </Link>
              <div className="flex cursor-pointer items-center gap-2">
                <Delete size={16} color="red" />
                <p>Delete</p>
              </div>
              <div className="flex cursor-pointer items-center gap-2 ">
                <Rss size={16} color="red" />
                <p className="overflow-hidden truncate whitespace-nowrap">
                  Publish Property
                </p>
              </div>
            </div>
          </div>
          <div className="h-full border-l" />
          <div
            id="propertyMetrics"
            className=" mx-auto flex h-full w-auto min-w-[192px] flex-col gap-2 rounded-[20px] bg-white p-4"
          >
            <div
              id="propertySpecifics"
              className="items-between flex h-full w-full flex-col justify-between text-zinc-600"
            >
              <p>{property.askPrice}</p>
              <p>
                {user.given_name} {user.family_name}
              </p>
              <div className="flex justify-between gap-2 overflow-hidden truncate">
                <p>
                  {new Date(property.createdAt).toLocaleString("en-US", {
                    timeZone: "EST",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <p className="text-zinc-400">
                  {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MaxWidthWrapper>
  );
}

export default EditProperty;
