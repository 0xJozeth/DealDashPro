import { EnumStatus, EnumPopularity } from "@prisma/client";

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

interface OfferProps {
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
  offerPrice: string;
  status: EnumStatus;
}

interface FavoritesDataProps {
  propertyId: string;
  userId: string;
}

interface CompanyProps {
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

type PropertyWithCompany = Property & { company: Company };
type CompanyWithProperties = Company & { properties: Property[] };
