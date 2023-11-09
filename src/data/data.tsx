import {
  faCog,
  faFile,
  faHeart,
  faPaperPlane,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { ColumnDef } from "@tanstack/react-table";

type accountItems = {
  name: string;
  icon: any;
  title: string;
  url: string;
};

export const accountItems: accountItems[] = [
  {
    name: "Favorites",
    icon: faHeart,
    title: "favorites",
    url: "favorites",
  },
  {
    name: "Offers sent",
    icon: faPaperPlane,
    title: "offers_sent",
    url: "offers",
  },
  {
    name: "Documents",
    icon: faFile,
    title: "documents",
    url: "documents",
  },
  {
    name: "Account settings",
    icon: faCog,
    title: "account_settings",
    url: "settings",
  },
];

type propImages = {
  name: string;
  props: {
    src: string;
    id: number;
    width: number;
    height: number;
    alt: string;
    className: string;
    arv: string;
    price: string;
    location: string;
    beds: string;
    baths: string;
    sqft: string;
  };
};

export const propImages: propImages[] = [
  {
    name: "prop1",
    props: {
      src: "/prop1.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop2",
    props: {
      src: "/prop2.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop3",
    props: {
      src: "/prop3.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop4",
    props: {
      src: "/prop4.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop5",
    props: {
      src: "/prop5.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop6",
    props: {
      src: "/prop6.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop1",
    props: {
      src: "/prop1.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop2",
    props: {
      src: "/prop2.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop3",
    props: {
      src: "/prop3.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop4",
    props: {
      src: "/prop4.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop5",
    props: {
      src: "/prop5.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  {
    name: "prop6",
    props: {
      src: "/prop6.png",
      id: 12913781,
      width: 350,
      height: 115,
      alt: "property",
      className: "object-cover aspect-square max-h-[115px]",
      arv: "$325,000",
      price: "$273,000",
      location: "Duval County, Jacksonville, FL",
      beds: "3",
      baths: "2",
      sqft: "1800",
    },
  },
  // Add more items to the propImages array if needed
];
