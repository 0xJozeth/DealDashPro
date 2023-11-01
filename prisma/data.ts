import { PrismaClient, EnumStatus } from "@prisma/client";
import { url } from 'inspector';
import { v4 as uuidv4 } from "uuid";

export type OfferData = {
  image: string;
  address: string;
  dateSubmitted: Date;
  offerSubmitted: string;
  status: "Accepted" | "Pending" | "Denied";
  cancel: boolean;
  userId: string;
};

export const OfferData: OfferData[] = [
  {
    image: "/prop1.png",
    address: "645 Parkwood St, Jacksonville, FL 32207",
    dateSubmitted: new Date(),
    offerSubmitted: "$224,000",
    status: EnumStatus.Pending,
    cancel: false,
    userId: "kp_2bffb8fd600a4643bc0acda106ab0a0e"
  },
  {
    image: "/prop2.png",
    address: "4078 Spring Park Cir, Jacksonville, FL 32207",
    dateSubmitted: new Date(),
    offerSubmitted: "156,000",
    status: EnumStatus.Accepted,
    cancel: false,
    userId: "kp_2bffb8fd600a4643bc0acda106ab0a0e"

  },
  {
    image: "/prop3.png",
    address: "4078 Spring Park Cir, Jacksonville, FL 32207",
    dateSubmitted: new Date(),
    offerSubmitted: "$70,000",
    status: EnumStatus.Denied,
    cancel: false,
    userId: "kp_2bffb8fd600a4643bc0acda106ab0a0e"

  },
  {
    image: "/prop4.png",
    address: "645 Parkwood St, Jacksonville, FL 32207",
    dateSubmitted: new Date(),
    offerSubmitted: "$224,000",
    status: EnumStatus.Pending,
    cancel: false,
    userId: "kp_2bffb8fd600a"
  },
  {
    image: "/prop5.png",
    address: "4078 Spring Park Cir, Jacksonville, FL 32207",
    dateSubmitted: new Date(),
    offerSubmitted: "156,000",
    status: EnumStatus.Accepted,
    cancel: false,
    userId: "kp_2bffb8fd600a"

  },
  {
    image: "/prop6.png",
    address: "4078 Spring Park Cir, Jacksonville, FL 32207",
    dateSubmitted: new Date(),
    offerSubmitted: "$70,000",
    status: EnumStatus.Denied,
    cancel: false,
    userId: "kp_2bffb8fd600a"

  },
];

export type FavoritesDataProps = {
  url: string;
    imgSrc: string;   
    imgWidth: number;
    imgHeight: number;
    alt: string;      
    cn: string;  
    askPrice: string;
    arv     : string;
    location: string;
    beds    : number;
    baths   :number;
    sqft    : number;
    userId: string | null
}

export const FavoritesData: FavoritesDataProps[] = [
  {
    url: uuidv4(),
    imgSrc: "/demo1.png",   
    imgWidth: 246,
    imgHeight: 131,
    alt: "demo",      
    cn: "aspect-square object-cover",  
    askPrice: "$224,000",
    arv     : "$350,000",
    location: "Jacksonville, FL 32207",
    beds    : 4,
    baths   :2,
    sqft    : 1894,
    userId: "kp_2bffb8fd600a"
  },
  {
    url: uuidv4(),
    imgSrc: "/prop1.png",   
    imgWidth: 246,
    imgHeight: 131,
    alt: "demo",      
    cn: "aspect-square object-cover",  

    askPrice: "$224,000",
    arv     : "$350,000",
    location: "Jacksonville, FL 32207",
    beds    : 4,
    baths   :2,
    sqft    : 1894,
    userId: "kp_2bffb8fd600a"
  },
  {
    url: uuidv4(),
    imgSrc: "/prop1.png",   
    imgWidth: 246,
    imgHeight: 131,
    alt: "demo",      
    cn: "aspect-square object-cover",  

    askPrice: "$224,000",
    arv     : "$350,000",
    location: "Jacksonville, FL 32207",
    beds    : 4,
    baths   :2,
    sqft    : 1894,
    userId: "kp_2bffb8fd600a"
  },
  {
    url: uuidv4(),
    imgSrc: "/prop2.png",   
    imgWidth: 246,
    imgHeight: 131,
    alt: "demo",      
    cn: "aspect-square object-cover",  

    askPrice: "$224,000",
    arv     : "$350,000",
    location: "Jacksonville, FL 32207",
    beds    : 4,
    baths   :2,
    sqft    : 1894,
    userId: "kp_2bffb8fd600a4643bc0acda106ab0a0e"
  },
  {
    url: uuidv4(),
    imgSrc: "/prop3.png",   
    imgWidth: 246,
    imgHeight: 131,
    alt: "demo",      
    cn: "aspect-square object-cover",  

    askPrice: "$224,000",
    arv     : "$350,000",
    location: "Jacksonville, FL 32207",
    beds    : 4,
    baths   :2,
    sqft    : 1894,
    userId: "kp_2bffb8fd600a4643bc0acda106ab0a0e"
  },
  {
    url: uuidv4(),
    imgSrc: "/prop4.png",   
    imgWidth: 246,
    imgHeight: 131,
    alt: "demo",      
    cn: "aspect-square object-cover",  

    askPrice: "$224,000",
    arv     : "$350,000",
    location: "Jacksonville, FL 32207",
    beds    : 4,
    baths   :2,
    sqft    : 1894,
    userId: "kp_2bffb8fd600a4643bc0acda106ab0a0e"
  },
]