"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Offers, PrismaClient } from "@prisma/client";
import { db } from "@/db";
import { allOffersProps, offerDataProps } from "../page";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

function getStatusColorClass(status: string): {
  bgColor: string;
  textColor: string;
} {
  switch (status) {
    case "Accepted":
      return { bgColor: "bg-[#58a053]", textColor: "text-white" };
    case "Pending":
      return { bgColor: "bg-[#de7616]", textColor: "text-white" };
    case "Denied":
      return { bgColor: "bg-[#de1616]", textColor: "text-white" };
    default:
      return { bgColor: "", textColor: "" };
  }
}

// TableDemoProps definition

export function TableDemo({
  offer,
  HandleCancel,
}: {
  HandleCancel: React.ReactNode;
  offer: Offers[];
}) {
  return (
    <Table className="mt-[72px]">
      <TableCaption>A list of your recent offers.</TableCaption>
      <TableHeader>
        <TableRow className="">
          <TableHead className="w-[100px]">Property</TableHead>
          <TableHead>Address</TableHead>
          <TableHead className="text-center">Date Submitted</TableHead>
          <TableHead>Offer Submitted</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Cancel</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offer.map((offers) => (
          <TableRow key={offers.id}>
            <TableCell className="font-medium">
              <Image
                src={offers.image} // Assuming the property name is "image"
                alt="Offer Image"
                width={55}
                height={55}
                className="aspect-square rounded-full"
              />
            </TableCell>
            <TableCell className="hover:text-blue-300 hover:underline">
              <Link href="/">{offers.address1}</Link>
            </TableCell>
            <TableCell className="text-center">
              {/* {offers.dateSubmitted} */}
            </TableCell>
            <TableCell className="text-center">
              <p>{offers.offerSubmitted}</p>
            </TableCell>
            <TableCell className="text-center">
              <div
                className={`${
                  getStatusColorClass(offers.status as string).bgColor
                } ${
                  getStatusColorClass(offers.status as string).textColor
                } flex items-center justify-center rounded-[20px] p-1`}
              >
                {offers.status}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <HandleCancel id={offers.id} userData={offers} />
              {/* <button
                title="Cancel"
                type="button"
                className="flex w-full items-center justify-center"
                // onClick={}
              >
                <FontAwesomeIcon
                  icon={faClose}
                  className="text-sm text-[#6f7070]"
                />
              </button> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
