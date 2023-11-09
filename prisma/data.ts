import { PropertyDataProps, OfferProps } from "../database";
import { EnumStatus, EnumPopularity } from "@prisma/client";

// const { getUser } = getKindeServerSession();
// const user = getUser();

// const getServerSideProps = async () => {
//   const res = await fetch("/api/property/clonkhcyo0004p01l0vbwak2o");
//   const data = await res.json();
//   console.log("data)", data);
//   return {
//     props: {
//       propertyId: data.id,
//     },
//   };
// };

// getServerSideProps();

export const PropertyData: PropertyDataProps[] = [
  {
    heading: "NO favorite properties",
    imgSrc: "/prop1.png",
    imgWidth: 400,
    imgHeight: 200,
    imgAlt: "image alt here",
    cn: "classname",
    views: 276,
    popularity: EnumPopularity.Pending,
    desc: "Here's a description of the property!",
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
  {
    heading: "HAS favorite property",
    imgSrc: "/prop1.png",
    imgWidth: 400,
    imgHeight: 200,
    imgAlt: "image alt here",
    cn: "classname",
    views: 276,
    popularity: EnumPopularity.Pending,
    desc: "Here's a description of the property!",
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

export const Offers: OfferProps[] = [
  {
    image: "/prop6.png",
    address1: "123 Adams St",
    address2: "STE 201",
    city: "Jacksonville",
    state: "FL",
    county: "Duval",
    zip: "32256",
    dateSubmitted: new Date().toLocaleDateString("en-US"),
    offerPrice: "$741,000",
    status: EnumStatus.Pending,
    userId: "kp_2bffb8fd600a4643bc0acda106ab0a0e",
  },
  {
    image: "/prop4.png",
    address1: "456 Elm St",
    address2: "STE 301",
    city: "Miami",
    state: "FL",
    county: "Miami-Dade",
    zip: "33101",
    dateSubmitted: new Date().toLocaleDateString("en-US"),
    offerPrice: "$820,000",
    status: EnumStatus.Accepted,
    userId: "kp_6b4b1e68f72340fdbb69a9c60634d084",
  },
  {
    image: "/prop2.png",
    address1: "789 Maple Ave",
    address2: "STE 401",
    city: "Tampa",
    state: "FL",
    county: "Hillsborough",
    zip: "33601",
    dateSubmitted: new Date().toLocaleDateString("en-US"),
    offerPrice: "$900,000",
    status: EnumStatus.Denied,
    userId: "kp_1234567890abcdef",
  },
];
