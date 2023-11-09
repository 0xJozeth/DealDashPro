import { PropertyDataProps } from "../database";
import { EnumPopularity } from "@prisma/client";

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
