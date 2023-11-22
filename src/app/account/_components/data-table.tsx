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
import { useState } from "react";
import {
  KindeUser,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";

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

export function TableDemo({
  user,
  offer,
}: {
  user: KindeUser;
  offer: Offers[];
}) {
  const [toggleModal, setToggleModal] = useState(false);
  const [offerId, setOfferId] = useState("");

  const userId = user.id;

  const handleConfirm = async (id: string) => {
    // Toggle confirmation modal useState
    setToggleModal(!toggleModal);
  };

  const handleCancel = async () => {
    if (!userId) return;
    await axios.delete(`/api/user/${userId}/offers/${offerId}`);
    // Refresh UI after the offer is deleted
    location.reload();
  };

  const ConfirmationModal = () => {
    const closeModal = () => {
      setToggleModal(false);
    };

    const stopPropagation = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    return (
      <div
        onClick={closeModal}
        className="absolute left-0 top-0 z-[9999] mx-auto h-full w-full bg-slate-600/20 p-4 shadow-xl"
      >
        <div
          onClick={stopPropagation}
          id="modal"
          className="relative left-1/2 top-1/2 z-[9999] h-[250px] w-[400px] space-y-2 rounded-[20px] bg-white p-4 shadow-xl"
        >
          <div className="flex w-full items-start justify-end">
            <button
              onClick={closeModal}
              title="Close Modal"
              type="button"
              className=""
            >
              <Image
                src="/x-button.svg"
                alt="Close Icon"
                width={17}
                height={17}
                className="h-[17px] w-auto"
              />
            </button>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
            <div className="flex w-full justify-center">
              <p className="text-center text-[22px] font-semibold leading-relaxed text-black">
                Are you sure you want to <br /> remove this offer?
              </p>
            </div>
            <div className="flex w-full justify-center gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="h-[45px] w-[128px] rounded-[5px] bg-black text-base font-normal leading-normal text-white"
              >
                Cancel Offer
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="h-[45px] w-[128px] rounded-[5px] border border-black bg-white text-base font-normal leading-normal text-black"
              >
                Keep Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {toggleModal && <ConfirmationModal />}
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
                  onClick={() => {
                    setOfferId(offers.id);
                    setToggleModal(true);
                  }}
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
    </>
  );
}
