"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Card from "@/components/Card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import { db } from "@/db";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import path from "path";
import { Filter } from "lucide-react";
import { usePropertiesStore, useSearchParamsStore } from "@/store/store";

export default function Home() {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/kindeSession");
      return data.user;
    },
  });

  const setAllProperties = usePropertiesStore(
    (state) => state.setAllProperties,
  );

  // Define pathname and utilize in a useEffect function for dynamic content rendering.
  const pathname = usePathname();

  // Define the searchParams and setter function
  const searchParams = useSearchParamsStore((state) => state.searchParams);
  const setSearchParams = useSearchParamsStore(
    (state) => state.setSearchParams,
  );

  useEffect(() => {
    if (pathname === "/") {
      setSearchParams(null);
    }
  }, [pathname, setSearchParams]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await axios.get("/api/property");
      setAllProperties(response.data);
    };

    fetchProperties();
  }, [pathname, setAllProperties]);

  const {
    data: propertyData,
    isLoading: propertyLoading,
    error,
  } = useQuery({
    queryKey: ["propertyData", searchParams],
    queryFn: async () => {
      if (searchParams) {
        const { pathname, minPrice, maxPrice } = searchParams;
        const url = `/api/search/${pathname}/minPrice/${minPrice}/maxPrice/${maxPrice}`;
        const { data } = await axios.get(url);
        return data as Property[];
      } else {
        const { data } = await axios.get("/api/property");
        return data as Property[];
      }
    },
  });

  console.log("HOME pathname", pathname);
  console.log("HOME searchParams", searchParams);

  // console.log("NEW propertyData", propertyData);

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex flex-col items-start justify-center gap-2 p-2">
          {!searchParams && (
            <h3 className="mt-14 text-[26px] font-medium leading-[30px] text-zinc-800">
              Featured Properties
            </h3>
          )}
          {searchParams && (
            <div className="mt-14 flex items-center">
              <h3 className="text-[26px] font-medium leading-[30px] text-zinc-800">
                Search results for
                <span className="text-[26px] font-medium leading-[30px] text-[#58A053]">
                  {" "}
                  {searchParams.pathname}
                </span>
              </h3>
            </div>
          )}
          <div id="filterButtonsWrapper" className="flex gap-2">
            <button
              title="sort"
              type="button"
              className="flex items-center rounded-[20px] bg-black p-2 px-3 text-xs font-bold leading-[14px] text-white"
            >
              All 99+
            </button>
            <button
              title="sort"
              type="button"
              className="flex items-center rounded-[20px] border border-zinc-300 bg-white p-2 px-3 text-xs font-bold leading-[14px] text-neutral-500"
            >
              New 99+
            </button>
            <button
              title="sort"
              type="button"
              className="flex items-center rounded-[20px] border border-zinc-300 bg-white p-2 px-3 text-xs font-bold leading-[14px] text-neutral-500"
            >
              Price Change 56
            </button>
            <button
              onClick={() => setSearchParams(null)}
              disabled={!searchParams}
              title="reset"
              type="button"
              className={`flex items-center rounded-[20px] border border-zinc-300 ${
                searchParams
                  ? "bg-black text-white"
                  : "bg-zinc-50 text-zinc-200"
              } text-neutral-500" duration-30 p-2 px-3 text-xs font-bold leading-[14px] transition-all`}
            >
              clear filters <Filter className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
        <section className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-4">
          {propertyData &&
            propertyData.map((property) => (
              <Card
                key={property.id}
                propertyData={property}
                user={user}
                isAuthenticated
              />
            ))}
        </section>
      </MaxWidthWrapper>
    </>
  );
}
