"use client";

import AccountDocuments from "@/components/AccountDocuments";
import AccountFavorites from "@/components/AccountFavorites";
import AccountOffersSent from "@/components/AccountOffersSent";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  faHeart,
  faUser,
  faFile,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import { accountItems, propImages } from "@/data/data";
// import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

const AccountSettings = () => {
  {
    /* TODO: use a useRef to refactor/concatenate useState spaghetti below */
  }

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

  //     console.log("e.target, title", e.target);
  //   };

  console.log("accountRoute", accountRoute);

  return (
    <MaxWidthWrapper className="max-w-[1280px]">
      <div className="m-24 flex flex-col gap-20 ">
        <div className="flex flex-col items-center p-2  ">
          <div id="account" className="flex w-full flex-col gap-2 ">
            <h1 className="text-4xl font-bold leading-[30px] text-zinc-950">
              Account
            </h1>
            <p className="text-lg font-normal leading-relaxed text-zinc-950">
              <span className="font-bold">user,</span> email address
            </p>
          </div>
        </div>

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

              {/* <LogoutLink type="button" key="" id="">
                <div className="duration-10 flex h-8 w-full items-center gap-2 transition-all hover:bg-zinc-50">
                  <div className="flex w-[20px] flex-shrink-0 items-center justify-center">
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-sm" />
                  </div>
                  <p className="text-sm font-normal leading-[14px] text-zinc-950">
                    Log out
                  </p>
                </div>
              </LogoutLink> */}
            </section>

            {/* Content Section */}

            {accountRoute === "Favorites" && <AccountFavorites />}
            {accountRoute === "Offers sent" && <AccountOffersSent />}
            {accountRoute === "Documents" && <AccountDocuments />}
            {accountRoute === "Account settings" && <AccountSettings />}
          </div>
        </section>
      </div>
    </MaxWidthWrapper>
  );
};

export default AccountSettings;
