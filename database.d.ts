import { EnumPopularity } from "@prisma/client";

interface dbPropertyData {
  id: number;
  url: string;
  heading: string;
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
  imgAlt: string;
  cn: string;
  views: number;
  popularity: string; // or use the EnumPopularity type if available
  desc: string;
  streetView: string;
  mapLocation: string;
  askPrice: string;
  arv: string;
  address1: string;
  address2: string | null;
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
  listedAt: string; // or use the Date type if available
  userId: string | null;
  favoritedByUserId: string | null;
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
