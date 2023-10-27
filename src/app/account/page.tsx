import AccountDocuments from "@/app/account/components/Documents";
import AccountFavorites from "@/app/account/components/Favorites";
import AccountOffersSent from "@/app/account/components/OffersSent";
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
import AccountMainContent from "@/app/account/components/MainContent";
import {
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";

const AccountSettings = () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = getUser();

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

        {/* IMPORT CONTENT */}
        <AccountMainContent user={user} isAuthenticated={isAuthenticated()} />
      </div>
    </MaxWidthWrapper>
  );
};

export default AccountSettings;
