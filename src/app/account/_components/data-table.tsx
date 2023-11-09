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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Offers } from "@prisma/client";
import axios from "axios";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

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

export function TableDemo({ offer }: { offer: Offers[] }) {
  const userId = offer.map((i) => i.userId);
  const handleCancel = async (id: string) => {
    console.log(
      `Cancel button clicked for offer id: ${id} and userid: ${userId}`,
    );
    if (!userId) return;
    await axios.delete(`/api/user/${userId}/offers/${id}`);
    // Add logic to update the UI after the offer is deleted
    location.reload();
  };

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
              <AspectRatio
                ratio={1 / 1}
                className="flex items-center justify-center"
              >
                <Image
                  src={offers.image} // Assuming the property name is "image"
                  alt="Offer Image"
                  fill
                  sizes="(max-width: 640px) 40px, (max-width: 768px) 50px, (max-width: 1024px) 60px, (max-width: 1280px) 70px, (max-width: 1536px) 80px, 90px"
                  className="m-auto max-h-[55px] max-w-[55px] rounded-full object-cover"
                />
              </AspectRatio>
            </TableCell>
            <TableCell className="hover:text-blue-300 hover:underline">
              <Link href={`/property-details/${offers.id}`}>
                {offers.address1}, <br />
                {offers.city}, {offers.state}
              </Link>
            </TableCell>
            <TableCell className="text-center">
              {offers.dateSubmitted?.toLocaleString() || null}
            </TableCell>
            <TableCell className="text-center">
              <p>{offers.offerPrice}</p>
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
              <button
                title="Cancel"
                type="button"
                className="flex w-full items-center justify-center"
                onClick={() => handleCancel(offers.id)}
              >
                <FontAwesomeIcon
                  icon={faClose}
                  className="text-sm text-[#6f7070]"
                />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
