import { EnumPopularity } from "@prisma/client";

interface Tag {
  [key: string]: {
    src: string;
    width: string;
  };
}

interface PropertyDataProps {
  heading: string;

  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
  imgAlt: string;
  cn: string;
  views: number;
  popularity: EnumPopularity;

  desc: string;
  streetView: string;
  mapLocation: string;

  askPrice: string;
  arv: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  county: string;
  zip: string;
  beds: number;
  baths: number;
  sqft: number;

  type: string;
  parking: string;
  yearBuilt: number;
  lotSize: number;

  listedAt: string;
}

interface FavoritesDataProps {
  propertyId: string;
  userId: string;
}
