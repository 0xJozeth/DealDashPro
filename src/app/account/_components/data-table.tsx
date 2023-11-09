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
import { EnumStatus, PrismaClient } from '@prisma/client';
import { db } from '@/db'
import { allOffersProps, offerDataProps } from '../page';



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

export function TableDemo({allOffers}: {allOffers: allOffersProps[]}) {
const prisma = new PrismaClient();

  const handleCancel = (id: number) => {
    // Handle cancel logic
  };

  return (
    <Table>
      <TableCaption>
        A list of your recent offers.
      
        </TableCaption>
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
        {allOffers.map((offer) => (
           <TableRow key={offer.id}>
            <TableCell className="font-medium">
             <Image
                src={offer.image} // Assuming the property name is "image"
                alt="Offer Image"
                width={55}
                height={55}
                className="aspect-square rounded-full"
              />
            </TableCell>
            <TableCell className="hover:text-blue-300 hover:underline">
              <Link href='/'>{offer.address}</Link>
            </TableCell>
            <TableCell className="text-center">{offer.dateSubmitted.toLocaleDateString("en-US")}</TableCell>
            <TableCell className="text-center">
              <p>
                {offer.offerSubmitted}
              </p>
            </TableCell>
            <TableCell className='text-center'>
                <div className={`${
                  getStatusColorClass(offer.status as string).bgColor
                } ${
                  getStatusColorClass(offer.status as string).textColor
                } flex items-center justify-center rounded-[20px] p-1`}>
              {offer.status}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <button
                title="Cancel"
                type="button"
                className="flex w-full items-center justify-center"
                onClick={() => handleCancel(offer.id)}
              >
                <FontAwesomeIcon
                  icon={faClose}
                  className="text-sm text-[#6f7070]"
                />
              </button>
            </TableCell>
          </TableRow>
         ) )}
      </TableBody>
    </Table>
  );
}
