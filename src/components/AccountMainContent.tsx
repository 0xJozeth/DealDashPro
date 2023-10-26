"use client";

import { accountItems } from "@/data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Children, useEffect, useState } from "react";
import AccountFavorites from "./AccountFavorites";
import AccountOffersSent from "./AccountOffersSent";
import AccountDocuments from "./AccountDocuments";
import AccountSettings from "./AccountSettings";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function AccountMainContent({
  user,
  isAuthenticated,
}: {
  user: KindeUser;
  isAuthenticated: boolean;
}) {
  const [accountRoute, setAccountRoute] = useState("Favorites");

  const handleContent = (itemName: string) => {
    const selectedItem = accountItems.find((item) => item.name === itemName);
    if (selectedItem) {
      setAccountRoute((prev) => selectedItem.name);
    }
  };
  useEffect(() => {
    const selectedItem = accountItems.find(
      (item) => item.name === accountRoute,
    );
    if (!selectedItem) {
      setAccountRoute("");
    }
  }, [accountRoute]);

  console.log("accountRoute", accountRoute);

  return (
    <section className="flex flex-col justify-center p-2 ">
      <div id="mainContainerWrapper" className="flex w-full gap-4 p-2 ">
        {/* Account Navigation Section */}
        <section
          id="accountPanel"
          className="flex h-[217px] w-auto min-w-[200px] flex-col justify-center rounded-[20px]  border border-black p-4"
        >
          {accountItems.map((item) => (
            <button
              type="button"
              key={item.name}
              id={item.title}
              onClick={() => {
                handleContent(item.name), console.log(accountRoute);
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

        {accountRoute === "Favorites" && <AccountFavorites />}
        {accountRoute === "Offers sent" && <AccountOffersSent />}
        {accountRoute === "Documents" && <AccountDocuments />}
        {accountRoute === "Account settings" && <AccountSettings />}
      </div>
    </section>
  );
}

export default AccountMainContent;
