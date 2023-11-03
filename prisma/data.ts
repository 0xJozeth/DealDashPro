import { EnumPopularity } from "@prisma/client";
import { url } from "inspector";
import { v4 as uuidv4 } from "uuid";
import { PropertyDataProps } from "../database";

export const PropertyData: PropertyDataProps[] = [
  {
    heading: "bruh",
    imgSrc: "/prop1.png",
    imgWidth: 400,
    imgHeight: 200,
    imgAlt: "image alt here",
    cn: "bruh",
    views: 276,
    popularity: EnumPopularity.NewHome,
    desc: "bruh",
    streetView: "street view url here",
    mapLocation: "map location url here",
    askPrice: "$245,000",
    arv: "$328,000",
    address1: "Address 1 here",
    address2: "Address 2 here",
    city: "Jacksonville",
    state: "FL",
    county: "Duval",
    zip: "32255",
    beds: 2,
    baths: 2,
    sqft: 1000,
    type: "Single-family",
    parking: "Street",
    yearBuilt: 1998,
    lotSize: 8998,
    listedAt: new Date().toLocaleDateString("en-US"),
  },
];
