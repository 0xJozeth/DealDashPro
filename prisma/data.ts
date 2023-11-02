import { PrismaClient, EnumStatus, EnumFavoriteCategory } from "@prisma/client";
import { url } from "inspector";
import { v4 as uuidv4 } from "uuid";

// export type OfferData = {
//   image: string;
//   address: string;
//   dateSubmitted: Date;
//   offerSubmitted: string;
//   status: "Accepted" | "Pending" | "Denied";
//   cancel: boolean;
//   userId: string;
// };

// export const OfferData: OfferData[] = [
//   {
//     image: "/prop1.png",
//     address: "645 Parkwood St, Jacksonville, FL 32207",
//     dateSubmitted: new Date(),
//     offerSubmitted: "$224,000",
//     status: EnumStatus.Pending,
//     cancel: false,
//     userId: "kp_2bffb8fd600a4643bc0acda106ab0a0e",
//   },
//   {
//     image: "/prop2.png",
//     address: "4078 Spring Park Cir, Jacksonville, FL 32207",
//     dateSubmitted: new Date(),
//     offerSubmitted: "156,000",
//     status: EnumStatus.Accepted,
//     cancel: false,
//     userId: "kp_2bffb8fd600a4643bc0acda106ab0a0e",
//   },
//   {
//     image: "/prop3.png",
//     address: "4078 Spring Park Cir, Jacksonville, FL 32207",
//     dateSubmitted: new Date(),
//     offerSubmitted: "$70,000",
//     status: EnumStatus.Denied,
//     cancel: false,
//     userId: "kp_2bffb8fd600a4643bc0acda106ab0a0e",
//   },
//   {
//     image: "/prop4.png",
//     address: "645 Parkwood St, Jacksonville, FL 32207",
//     dateSubmitted: new Date(),
//     offerSubmitted: "$224,000",
//     status: EnumStatus.Pending,
//     cancel: false,
//     userId: "kp_2bffb8fd600a",
//   },
//   {
//     image: "/prop5.png",
//     address: "4078 Spring Park Cir, Jacksonville, FL 32207",
//     dateSubmitted: new Date(),
//     offerSubmitted: "$156,000",
//     status: EnumStatus.Accepted,
//     cancel: false,
//     userId: "kp_2bffb8fd600a",
//   },
//   {
//     image: "/prop6.png",
//     address: "4078 Spring Park Cir, Jacksonville, FL 32207",
//     dateSubmitted: new Date(),
//     offerSubmitted: "$70,000",
//     status: EnumStatus.Denied,
//     cancel: false,
//     userId: "kp_2bffb8fd600a",
//   },
// ];

export const FavoritesData = [
  {
    id: 1,
    userId: "1",
    propertyId: 1,
    propertyType: "Single Family",
    favoriteTags: "Spacious, Modern",
    favoriteCategory: "NeedsRehab",
    lastVisitedDate: new Date(),
  },
];
