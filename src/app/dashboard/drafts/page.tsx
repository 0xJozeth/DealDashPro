"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import { DataTable } from "@/components/DraftProperties/data-table";
import { columns } from "@/components/DraftProperties/columns";
import { useToast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Bath,
  Bed,
  Delete,
  Edit,
  Eye,
  Fullscreen,
  FullscreenIcon,
  Rss,
} from "lucide-react";

function PropertyDrafts() {
  // Routing stuff
  const router = useRouter();

  // Logic for popup notifications
  const { toast } = useToast();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/kindeSession");
      console.log("useQuery data", data);
      return (data.user as KindeUser) || [];
    },
  });

  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: ["drafts"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `/api/user/${user?.id}/property/draftProperties`,
        );
        console.log("User's unpublishedProperties", data);
        return (data as Property[]) || [];
      } catch (error) {
        console.error(error);
      }
    },
  });

  // Logic for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Auth Logic
  if (!user || !user.id) {
    return redirect("/auth-callback?origin=dashboard");
  }

  if (userLoading || draftsLoading) {
    return <div>Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <div>Still working</div>;
  }
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  if (!currentItems || currentItems.length === 0) {
    return <div>Try again</div>;
  }

  return (
    <div className="flex gap-8">
      <div className="relative flex h-auto min-h-screen w-[300px] flex-col gap-4 bg-blue-900/90">
        <div className="relative mx-auto my-36 flex h-[500px] flex-col justify-evenly gap-4">
          <Link
            href="/dashboard/post-property"
            prefetch={false}
            className="relative mx-auto flex gap-4"
          >
            <h3 className="font-semibold leading-tight text-white">
              Post A Property
            </h3>
          </Link>
          <Link
            href="/dashboard/drafts"
            prefetch={false}
            className="relative mx-auto flex gap-4"
          >
            <h3 className="font-semibold leading-tight text-white">
              View Drafts
            </h3>
          </Link>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-8 py-10">
        <div className="container mx-auto">
          <h2 className="text-[26px] font-medium leading-[17px] text-black">
            View Property Drafts
          </h2>
        </div>
        <div className="container mx-auto py-10">
          {/* Begin card component, map over this */}
          {currentItems.map((property) => (
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
          ))}
          <div className="mx-auto mt-20 flex max-w-[192px] items-center justify-between">
            <button
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
              }
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage(
                  currentPage < Math.ceil(data.length / itemsPerPage)
                    ? currentPage + 1
                    : currentPage,
                )
              }
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
        {/* <div className="container mx-auto py-10">
          <h2> Version 2</h2>
          <DataTable columns={columns} data={data || []} />
        </div> */}
      </div>
    </div>
  );
}

export default PropertyDrafts;
