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
import { PrismaClient, Property } from "@prisma/client";
import AccountFavorites from "../_components/Favorites";
import Card from "@/components/Card";
import { useQuery } from "@tanstack/react-query";
import AccountOffersSent from "../_components/OffersSent";
import AccountDocuments from "../_components/Documents";
import AccountSettings from "../_components/Settings";

function AccountPath() {
  const route = usePathname();

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/kindeSession");
      return data.user;
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

  //Loading state...
  if (userLoading || propertyLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  console.log("propertyData", propertyData);

  return (
    <MaxWidthWrapper className="{/*border border-red-600*/} max-w-[1280px]">
      <section className="{/*border border-red-600*/} flex min-h-screen flex-col justify-start p-2">
        <div
          id="mainContainerWrapper"
          className="{/*border border-red-600*/} flex w-full gap-4 p-2"
        >
          {/* Account Navigation Section */}
          <AccountPanel />

          {/* Content Section */}
          {route === "/account/favorites" && (
            <section
              id="contentWrapper"
              className="{/*border border-red-600*/} m-0 block w-full flex-col gap-4 p-0"
            >
              <div className="{/*border border-red-600*/} p-4">
                <div className="{/*border border-red-600*/} p-4">
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
