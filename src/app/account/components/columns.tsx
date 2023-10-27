"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//   },
// ];

type OfferData = {
  image: string;
  address: string;
  dateSubmitted: string;
  offerSubmitted: string;
  status: "Accepted" | "Pending" | "Denied";
};

export const OfferData: OfferData[] = [
  {
    image: "/prop1.png",
    address: "645 Parkwood St, Jacksonville, FL 32207",
    dateSubmitted: "1/1/2022",
    offerSubmitted: "$224,000",
    status: "Accepted",
  },
  {
    image: "/prop2.png",
    address: "4078 Spring Park Cir, Jacksonville, FL 32207",
    dateSubmitted: "1/1/2022",
    offerSubmitted: "156,000",
    status: "Accepted",
  },
  {
    image: "/prop3.png",
    address: "4078 Spring Park Cir, Jacksonville, FL 32207",
    dateSubmitted: "1/1/2022",
    offerSubmitted: "$70,000",
    status: "Accepted",
  },
];

export const columns: ColumnDef<OfferData>[] = [
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "dateSubmitted",
    header: "Date Submitted",
  },
  {
    accessorKey: "offerSubmitted",
    header: "Offer Submitted",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
