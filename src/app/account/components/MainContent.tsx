"use client";

import { accountItems } from "@/data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AccountFavorites from "./Favorites";
import AccountOffersSent from "./OffersSent";
import AccountDocuments from "./Documents";
import AccountSettings from "./Settings";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FavoritesDataProps } from '../../../../prisma/data';

function AccountMainContent({
  children,
  user,
  isAuthenticated,
  favorites,
}: {
  children: React.ReactNode;
  user: KindeUser;
  isAuthenticated: boolean;
  favorites: FavoritesDataProps[];
}) {
  
  // Define state to store the selected item
  const [accountRoute, setAccountRoute] = useState("Favorites");

  // Define function to handle the content when onClick listener is triggered
  function handleContent(itemName: string) {
    const selectedItem = accountItems.find((item) => item.name === itemName);
    if (selectedItem) {
      setAccountRoute((prev) => selectedItem.name);
    }
  };
  // Check if the selected item exists
  useEffect(() => {
    const selectedItem = accountItems.find(
      (item) => item.name === accountRoute,
    );
    if (!selectedItem) {
      setAccountRoute("");
    }
  }, [accountRoute]);

  return (
    <section className="flex flex-col justify-center p-2 ">
      <div id="mainContainerWrapper" className="flex w-full gap-4 p-2 ">
        {/* Account Navigation Section */}
        <section
          id="accountPanel"
          className="hidden md:flex h-[217px] w-auto min-w-[200px] flex-col justify-center rounded-[20px]  border border-black p-4"
        >
          {accountItems.map((item) => (
            <button
              type="button"
              key={item.name}
              id={item.title}
              onClick={() => {
                handleContent(item.name);
              }}
            >
              <div className="duration-10 flex h-8 w-full items-center gap-2 transition-all hover:bg-zinc-50">
                <div className="flex w-[20px] flex-shrink-0 items-center justify-center">
                  <FontAwesomeIcon icon={item.icon} className="text-sm" />
                </div>
                <p className="text-sm font-normal leading-[14px] text-zinc-950">
                  {item.name}
                </p>
              </div>
              {item.name === "Documents" && (
                <div className="my-1 h-[1px] w-full border-b border-zinc-300"></div>
              )}
            </button>
          ))}
          <Link id="" href="/api/auth/logout">
            <div className="duration-10 flex h-8 w-full items-center gap-2 transition-all hover:bg-zinc-50">
              <div className="flex w-[20px] flex-shrink-0 items-center justify-center">
                <FontAwesomeIcon icon={faSignOutAlt} className="text-sm" />
              </div>
              <p className="text-sm font-normal leading-[14px] text-zinc-950">
                Log out
              </p>
            </div>
          </Link>
        </section>

        {/* Content Section */}

        {accountRoute === "Favorites" && <AccountFavorites user={user} isAuthenticated={isAuthenticated} favorites={favorites}/>}
        {accountRoute === "Offers sent" && (
          <AccountOffersSent>
            {children}
          </AccountOffersSent>
        )}
        {accountRoute === "Documents" && <AccountDocuments />}
        {accountRoute === "Account settings" && <AccountSettings />}
      </div>
    </section>
  );
}

export default AccountMainContent;
