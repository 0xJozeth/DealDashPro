
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { accountItems, propImages } from "@/data/data";
import { KindeUser, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { FavoritesDataProps } from '../../../../prisma/data';
import Card from '@/components/Card';



function AccountFavorites({favorites, user, isAuthenticated}: {favorites: FavoritesDataProps[], user: KindeUser, isAuthenticated: boolean}) {
  
  return (
    <section
      id="contentWrapper"
      className="block m-0 p-0 w-full flex-col gap-4">
      <div className='p-4'>
        <h2 className="text-[26px] font-medium leading-[17px] text-black ml-6">
          Favorites 
        </h2>
      </div>

      <div className="flex flex-wrap p-4 gap-6 justify-center box-border !scroll-smooth scrollbar-hide">
        {favorites.map((item, index) => (
          <Card key={index} item={item} index={index} favorites={favorites}/>
        ))}

      </div>
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
