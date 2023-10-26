"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

// @ts-ignore
import { Menu, Transition } from "@headlessui/react";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faHeart,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function UserButton({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: KindeUser;
}) {
  return (
    <>
      {isAuthenticated ? (
        <Menu as="div" className="relative z-[999999]">
          <Menu.Button>
            {user?.picture ? (
              <div
                id="navbarButtonWrapper"
                className="duration-30 flex h-[51px] w-[95px] items-center justify-center gap-4 rounded-[30px] border border-neutral-200 bg-white shadow transition-all hover:shadow-lg"
              >
                <div className="">
                  <Image
                    src={"/burgerMenu1.svg"}
                    width={19}
                    height={22}
                    alt={"logo"}
                    className="pointer-events-none"
                  />
                </div>
                <div className="relative h-10 w-10">
                  <Image
                    src={user.picture}
                    alt="user avatar"
                    className="inline-block rounded-full"
                    fill
                  />
                </div>
              </div>
            ) : (
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                <span className="text-sm font-medium leading-none text-white">
                  {user?.given_name?.[0]}
                  {user?.family_name?.[0]}
                </span>
              </span>
            )}
          </Menu.Button>
          <Transition
            enter="transition duration-150 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-150 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="dark:text-react absolute right-0 mt-1 flex w-72 origin-top-right flex-col rounded-xl bg-white py-6 text-white shadow-lg focus:outline-none dark:bg-white">
              <div className="mb-4 flex gap-4 px-6 text-sm">
                {user?.picture ? (
                  <div className="relative h-10 w-10">
                    <Image
                      src={user.picture}
                      alt="user avatar"
                      className="inline-block rounded-full"
                      fill
                    />
                  </div>
                ) : (
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                    <span className="text-sm font-medium leading-none text-white">
                      {user?.given_name?.[0]}
                      {user?.family_name?.[0]}
                    </span>
                  </span>
                )}
                <div>
                  <p className="font-medium text-stone-600">
                    {user?.given_name} {user?.family_name}
                  </p>
                  <p className="text-stone-400">{user?.email}</p>
                </div>
              </div>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/account"
                    className={clsx(
                      active && "bg-stone-700/50 dark:bg-stone-200",
                      "inline-flex items-center gap-2 px-[34px] py-2 text-sm font-normal leading-[14px] text-black dark:text-stone-500",
                    )}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="h-5 w-5 text-black"
                    />
                    <span>Favorites</span>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/account"
                    className={clsx(
                      active && "bg-stone-700/50 dark:bg-stone-200",
                      "inline-flex items-center gap-2 px-[34px] py-2 text-sm font-normal leading-[14px] text-black dark:text-stone-500",
                    )}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="h-5 w-5 text-black"
                    />
                    <span>My Account</span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/account"
                    className={clsx(
                      active && "bg-stone-700/50 dark:bg-stone-200",
                      "inline-flex items-center gap-2 px-[34px] py-2 text-sm font-normal leading-[14px] text-black dark:text-stone-500",
                    )}
                  >
                    <FontAwesomeIcon
                      icon={faHouse}
                      className="h-5 w-5 text-black"
                    />
                    <span>Post A Deal</span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/account"
                    className={clsx(
                      active && "bg-stone-700/50 dark:bg-stone-200",
                      "inline-flex items-center gap-2 px-[34px] py-2 text-sm font-normal leading-[14px] text-black dark:text-stone-500",
                    )}
                  >
                    <span>Contact Support</span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/api/auth/logout"
                    className={clsx(
                      active && "bg-stone-700/50 dark:bg-stone-200",
                      "inline-flex items-center gap-2 px-[34px] py-2 text-sm font-normal leading-[14px] text-black dark:text-stone-500",
                    )}
                  >
                    <span>Log out</span>
                    <FontAwesomeIcon
                      icon={faArrowUpFromBracket}
                      className="h-5 w-5 rotate-90 text-black"
                    />
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <Link
          href="/api/auth/login"
          className="rounded-md border border-stone-300 px-3 py-1 text-sm dark:border-stone-600"
        >
          Sign In
        </Link>
      )}
    </>
  );
}
