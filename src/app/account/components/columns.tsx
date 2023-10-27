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

export type OfferData = {
  image: string;
  address: string;
  dateSubmitted: string;
  offerSubmitted: string;
  status: "Accepted" | "Pending" | "Denied";
  cancel: string;
};

export const OfferData: OfferData[] = [
  {
    image: "/prop1.png",
    address: "645 Parkwood St, Jacksonville, FL 32207",
    dateSubmitted: "1/1/2022",
    offerSubmitted: "$224,000",
    status: "Pending",
    cancel: "display an x here",
  },
  {
    image: "/prop2.png",
    address: "4078 Spring Park Cir, Jacksonville, FL 32207",
    dateSubmitted: "1/1/2022",
    offerSubmitted: "156,000",
    status: "Accepted",
    cancel: "display an x here",
  },
  {
    image: "/prop3.png",
    address: "4078 Spring Park Cir, Jacksonville, FL 32207",
    dateSubmitted: "1/1/2022",
    offerSubmitted: "$70,000",
    status: "Denied",
    cancel: "display an x here",
  },
];

export const columns: ColumnDef<OfferData>[] = [
  {
    accessorKey: "image",
    header: "Image",
    // cell: (props) => {
    //   <p>{props.getValue()}</p>;
    // },
  },
  {
    accessorKey: "address",
    header: "Address",
    // cell: (props) => {
    //   <p>{props.getValue()}</p>;
    // },
  },
  {
    accessorKey: "dateSubmitted",
    header: "Date Submitted",
    // cell: (props) => {
    //   <p>{props.getValue()}</p>;
    // },
  },
  {
    accessorKey: "offerSubmitted",
    header: "Offer Submitted",
    // cell: (props) => {
    //   <p>{props.getValue()}</p>;
    // },
  },
  {
    accessorKey: "status",
    header: "Status",
    // cell: (props) => {
    //   <p>{props.getValue()}</p>;
    // },
  },
  {
    accessorKey: "cancel",
    header: "Cancel",
    // cell: (props) => {
    //   <p>{props.getValue()}</p>;
    // },
  },
];
