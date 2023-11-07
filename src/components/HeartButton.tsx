"use client";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { EnumPopularity, Property } from "@prisma/client";
import Image from "next/image";
import Router from "next/router";
import { useState } from "react";
import { PropertyDataProps } from "../../database";

// const getServerSideProps = async () => {
//   const res = await fetch("/api/kindeSession");
//   const data = await res.json();
//   console.log("data)", data);
//   return {
//     props: {
//       user: data.user,
//     },
//   };
// };

// getServerSideProps();

const HeartButton = ({
  user,
  property,
}: {
  user: KindeUser;
  property: Property;
}) => {
  return (
    <button title="heart" type="button" className="flex">
      <Image
        src="/heart-outline.svg"
        width={22}
        height={20}
        alt="heart"
        className="h-full"
      />
    </button>
  );
};

export default HeartButton;
