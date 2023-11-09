"use client";
import React, { useState, useEffect } from "react";
import { accountItems } from "@/data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";

function AccountPanel() {
  return (
    <section
      id="accountPanel"
      className="mt-[72px] hidden h-[217px] w-auto min-w-[200px] flex-col justify-center rounded-[20px] border  border-black p-4 md:flex"
    >
      {accountItems.map((item) => (
        <button
          type="button"
          key={item.name}
          id={item.title}
          className="{/*border border-red-600*/}"
        >
          <Link href={`/account/${item.url}`}>
            <div className="duration-10 flex h-8 w-full items-center gap-2 transition-all hover:bg-zinc-50">
              <div className="flex w-[20px] flex-shrink-0 items-center justify-center">
                <FontAwesomeIcon icon={item.icon} className="text-sm" />
              </div>
              <p className="text-sm font-normal leading-[14px] text-zinc-950">
                {item.name}
              </p>
            </div>
          </Link>
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
  );
}

export default AccountPanel;
