import Link from "next/link";

import {
  getKindeServerSession,
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

import UserButton from "./UserButton";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import React from "react";
import SearchBar from "./SearchBar";
import hero from "../../public/hero.jpeg";

function Header() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <>
      <header className="relative z-[9999] flex h-[324px] items-start justify-between bg-[url('/hero.jpeg')] bg-cover bg-local bg-center bg-no-repeat px-20 ">
        <div className="absolute left-0 top-0 z-[2] h-full w-full bg-gradient-to-t from-transparent via-transparent to-black opacity-[70%] mix-blend-multiply" />
        <nav className="group relative z-[9999] mt-8 flex w-full items-center justify-between gap-8 bg-transparent">
          <Link href="/">
            <Image
              src={"/ddpWhite.svg"}
              width={225}
              height={225}
              alt={"logo"}
              className="min-w-[185px] p-2 md:min-w-[225px]"
            />
          </Link>
          {!isAuthenticated() ? (
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
                  <RegisterLink>
                    <div className="duration-30 flex h-11 w-24 items-center justify-center rounded-[10px] border border-white bg-transparent py-5 text-white transition-all hover:bg-zinc-100 hover:text-black">
                      <p className="text-sm font-normal leading-normal">
                        Sign Up
                      </p>
                    </div>
                  </RegisterLink>
                  <LoginLink>
                    <div className="flex h-11 w-24 items-center justify-center rounded-[10px]  bg-white py-5 transition-all duration-300 hover:bg-[#4D8C49] hover:text-white">
                      <p className="text-sm font-normal leading-normal">
                        Login
                      </p>
                    </div>
                  </LoginLink>
                </div>
              </div>
              <div className="md:hidden">
                <UserButton user={user} isAuthenticated={isAuthenticated()} />
              </div>
            </>
          ) : (
            <div className="flex w-full items-center justify-end gap-4">
              <UserButton user={user} isAuthenticated={isAuthenticated()} />
            </div>
          )}
        </nav>
        {/* Search Bar Section */}
        <div className="absolute left-0 right-0 top-0 z-50 mx-auto mt-8 flex h-full w-[450px] min-w-[450px] flex-col items-start justify-center gap-5 ">
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
