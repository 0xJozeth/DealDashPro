"use client";
import Link from "next/link";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";

import UserButton from "./UserButton";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import React from "react";
import SearchBar from "./SearchBar";
import { headers } from "next/headers";
import { dom } from "@fortawesome/fontawesome-svg-core";
import { R } from "uploadthing/dist/upload-builder-6c9b2b59";
import { usePathname } from "next/navigation";
import { useSearchParamsStore } from "@/store/store";

function Header({
  user,
  isAuthenticated,
}: {
  user: KindeUser;
  isAuthenticated: boolean;
}) {
  const pathname = usePathname();

  const notHome = pathname !== "/";

  // Define the searchParams and setter function
  const searchParams = useSearchParamsStore((state) => state.searchParams);
  const setSearchParams = useSearchParamsStore(
    (state) => state.setSearchParams,
  );

  {
    /* NAVBAR ACROSS SITE */
  }
  if (pathname !== "/") {
    return (
      <>
        <header className="relative z-[9999] flex h-[84px] items-center justify-between border-b border-zinc-300 bg-white px-20">
          <nav className="group relative z-[9999] flex w-full items-center justify-between gap-8 bg-white">
            <Link
              href="/"
              onClick={() => {
                setSearchParams(null);
              }}
            >
              <Image
                src={"/ddpBlack.svg"}
                width={225}
                height={225}
                alt={"logo"}
                className="min-w-[185px] p-2 md:min-w-[225px]"
              />
            </Link>
            {!isAuthenticated ? (
              <>
                <div className="hidden items-center justify-between gap-4 md:flex">
                  <Link href="#">
                    <div>
                      <p
                        className={`whitespace-nowrap text-sm font-normal leading-[14px] text-black`}
                      >
                        Post a deal
                      </p>
                    </div>
                  </Link>
                  <div className="flex items-center justify-between gap-6">
                    <Link href="/api/auth/register">
                      <div className="duration-30 flex h-11 w-24 items-center justify-center rounded-[10px] border border-zinc-600 bg-transparent py-5 text-black transition-all hover:bg-zinc-100 hover:text-black">
                        <p className="text-sm font-normal leading-normal">
                          Sign Up
                        </p>
                      </div>
                    </Link>
                    <Link href="api/auth/login">
                      <div className="flex h-11 w-24 items-center justify-center rounded-[10px] bg-[#4D8C49]  py-5 text-white transition-all duration-300 hover:bg-[#58a053] hover:text-white">
                        <p className="text-sm font-normal leading-normal">
                          Login
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="md:hidden">
                  <UserButton user={user} isAuthenticated={isAuthenticated} />
                </div>
              </>
            ) : (
              <div className="flex w-full items-center justify-end gap-4">
                <UserButton user={user} isAuthenticated={isAuthenticated} />
              </div>
            )}
          </nav>
        </header>
      </>
    );
  }

  {
    /* NAVBAR HOMEPAGE */
  }

  return (
    <>
      <header className="relative z-[9999] flex h-[324px] items-start justify-between bg-[url('/hero.jpeg')] bg-cover bg-local bg-center bg-no-repeat px-20 ">
        <div className="absolute left-0 top-0 z-[2] h-full w-full bg-gradient-to-t from-transparent via-transparent to-black opacity-[70%] mix-blend-multiply" />
        <nav className="group relative z-[9999] mt-8 flex w-full items-center justify-between gap-8 bg-transparent">
          <Link
            href="/"
            onClick={() => {
              setSearchParams(null);
            }}
          >
            <Image
              src={"/ddpWhite.svg"}
              width={225}
              height={225}
              alt={"logo"}
              className="min-w-[185px] p-2 md:min-w-[225px]"
            />
          </Link>
          {!isAuthenticated ? (
            <>
              <div className="hidden items-center justify-between gap-4 md:flex">
                <Link href="#">
                  <div>
                    <p className="whitespace-nowrap text-sm font-normal leading-[14px] text-white">
                      Post a deal
                    </p>
                  </div>
                </Link>
                <div className="flex items-center justify-between gap-6">
                  <Link href="/api/auth/register">
                    <div className="duration-30 flex h-11 w-24 items-center justify-center rounded-[10px] border border-white bg-transparent py-5 text-white transition-all hover:bg-zinc-100 hover:text-black">
                      <p className="text-sm font-normal leading-normal">
                        Sign Up
                      </p>
                    </div>
                  </Link>
                  <Link href="api/auth/login">
                    <div className="flex h-11 w-24 items-center justify-center rounded-[10px]  bg-white py-5 transition-all duration-300 hover:bg-[#4D8C49] hover:text-white">
                      <p className="text-sm font-normal leading-normal">
                        Login
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="md:hidden">
                <UserButton user={user} isAuthenticated={isAuthenticated} />
              </div>
            </>
          ) : (
            <div className="flex w-full items-center justify-end gap-4">
              <UserButton user={user} isAuthenticated={isAuthenticated} />
            </div>
          )}
        </nav>
        {/* Search Bar Section */}
        <div className="absolute left-20 top-0 z-50 mt-8 flex h-full w-[450px] min-w-[450px] flex-col items-center justify-center gap-5 transition-all duration-100 md:left-96">
          <h1 className="whitespace-nowrap text-4xl font-bold leading-[30px] text-white">
            Properties With Potential
          </h1>
          <p className="text-left text-base font-semibold leading-[14px] text-white">
            Find your next investment property
          </p>
          <SearchBar />
        </div>
      </header>
    </>
  );
}

export default Header;
