"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AccountPanel from "../_components/accountPanel";
import { usePathname } from "next/navigation";
import { GetServerSideProps } from "next";
import {
  KindeUser,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";
import { Offers, PrismaClient, Property } from "@prisma/client";
import AccountFavorites from "../_components/Favorites";
import Card from "@/components/Card";
import { useMutation, useQuery } from "@tanstack/react-query";
import AccountOffersSent from "../_components/OffersSent";
import AccountDocuments from "../_components/Documents";
import AccountSettings from "../_components/Settings";
import { TableDemo } from "../_components/data-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Loader2 } from "lucide-react";

function AccountPath() {
  const route = usePathname();

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/kindeSession");
        return data.user || null;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });

  const { data: propertyData, isLoading: propertyLoading } = useQuery({
    queryKey: ["favorites", userData?.id],
    queryFn: async () => {
      if (!userData) return [];
      const { data } = await axios.get(`/api/user/${userData.id}/favorites`);
      return data;
    },
  });

  const { data: offerData, isLoading: offerLoading } = useQuery({
    queryKey: ["offers", userData?.id],
    queryFn: async () => {
      if (!userData) return [];
      const { data } = await axios.get(`/api/user/${userData.id}/offers`);
      return data as Offers;
    },
  });

  //Loading state...
  if (userLoading || propertyLoading || offerLoading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-zinc-600" />
      </div>
    );
  }

  return (
    <MaxWidthWrapper className="max-w-[1280px]">
      <section className="flex min-h-screen flex-col justify-start p-2">
        <div id="mainContainerWrapper" className="flex w-full gap-4 p-2">
          {/* Account Navigation Section */}
          <AccountPanel />

          {/* Content Section */}
          {route === "/account/favorites" && (
            <section
              id="contentWrapper"
              className="m-0 block w-full flex-col gap-4 p-0"
            >
              <div className="p-4">
                <div className="p-4">
                  <h2 className=" text-[26px] font-medium leading-[17px] text-black">
                    Favorites
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-4">
                  {propertyData.map((property: Property) => (
                    <Card
                      key={property.id}
                      propertyData={property}
                      user={userData}
                      isAuthenticated
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
          {route === "/account/offers" && <AccountOffersSent />}
          {route === "/account/documents" && <AccountDocuments />}
          {route === "/account/settings" && <AccountSettings />}
        </div>
      </section>
    </MaxWidthWrapper>
  );
}

export default AccountPath;
