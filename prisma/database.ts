import { CreatePropertySchemaType } from "@/components/Dashboard";
import { Company, Property, PropertyImage } from "@prisma/client";

export interface Tag {
  [key: string]: {
    src: string;
    width: string;
  };
}

export interface PropertyDataProps {
  heading: string;

  imgSrc: string;

  imgAlt: string;
  cn: string;
  popularity: EnumPopularity;

  desc: string;
  matterportUrl: string;
  streetViewUrl: string;
  mapLocationUrl: string;

  winNowPrice: string;
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

export interface OfferProps {
  offerPrice: string;
  emdAmount: string;
  reqFinancing: boolean;
  lenderName: string;
  buyerName: string;
  buyerCompany: string;
  comments: string;

  accepted: true;
  acceptedAt: string;
  image: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  county: string;
  zip: string;
  dateSubmitted: string;
  status: EnumOfferStatus;
}

export interface FavoritesDataProps {
  propertyId: string;
  userId: string;
}

export interface CompanyProps {
  companyName: string;
  companyLogo: string;
  companyListingsUrl: string;
  companyUrl: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress1: string;
  companyAddress2: string;
  companyCity: string;
  companyState: string;
  companyZip: string;
  companyCountry: string;

  companyDescription: string;

  companyFacebook: string;
  companyTwitter: string;
  companyInstagram: string;
  companyLinkedin: string;
  companyYoutube: string;
}

export type PropertyWithCompany = Property & { company: Company };
export type CompanyWithProperties = Company & { properties: Property[] };
export type PropertyWithImages = Property & { images: PropertyImage[] };
export type ImagesWithProperty = PropertyImage & { properties: Property[] };

export enum EnumOfferStatus {
  Accepted,
  Pending,
  Denied,
}

export enum EnumPopularity {
  NewListing,
  HotHome,
  ShortSale,
  Pending,
  Sold,
  OffMarket,
}
