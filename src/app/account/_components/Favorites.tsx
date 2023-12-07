import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { accountItems, propImages } from "@/data/data";
import {
  KindeUser,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Card from "@/components/Card";
import { FavoritesDataProps } from "../../../../prisma/database";
import { db } from "@/db";

function AccountFavorites({
  user,
  isAuthenticated,
}: {
  user: KindeUser;
  isAuthenticated: boolean;
}) {
  return (
    <section
      id="contentWrapper"
      className="m-0 block w-full flex-col gap-4 p-0"
    >
      <div className="p-4">
        <h2 className="ml-6 text-[26px] font-medium leading-[17px] text-black">
          Favorites
        </h2>
      </div>

      <div className="scrollbar-hide box-border flex flex-wrap justify-center gap-6 !scroll-smooth p-4"></div>
      <div className="flex w-full items-center justify-center p-2 ">
        <div>
          <button
            type="submit"
            className="h-[45px] w-[250px] rounded-[5px] border border-black"
          >
            View more
          </button>
        </div>
      </div>
    </section>
  );
}

export default AccountFavorites;
