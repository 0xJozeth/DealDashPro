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

function Header() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <>
      <header className="flex h-[80px] items-center justify-between px-20">
        <nav className="group relative flex w-full items-center justify-between gap-8">
          <Link href="/">
            <Image
              src={"/ddpBlack.svg"}
              width={225}
              height={225}
              alt={"logo"}
              className="min-w-[225px] p-2"
            />
          </Link>
          {!isAuthenticated() ? (
            <div className="flex items-center justify-between gap-4">
              <Link href="#">
                <div>
                  <p className="whitespace-nowrap text-sm font-normal leading-[14px] text-black">
                    Post a deal
                  </p>
                </div>
              </Link>
              <div className="flex items-center justify-between gap-6">
                <RegisterLink>
                  <div className="duration-30 flex h-11 w-24 items-center justify-center rounded-[10px] border border-black bg-white py-5 transition-all hover:bg-zinc-100">
                    <p className="text-sm font-normal leading-normal text-black">
                      Sign Up
                    </p>
                  </div>
                </RegisterLink>
                <LoginLink>
                  <div className="duration-30 flex h-11 w-24 items-center justify-center  rounded-[10px] bg-[#58A053] py-5 transition-all hover:bg-[#4D8C49]">
                    <p className="text-sm font-normal leading-normal text-white">
                      Login
                    </p>
                  </div>
                </LoginLink>
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center justify-end gap-4">
              <UserButton user={user} isAuthenticated={isAuthenticated()} />
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
