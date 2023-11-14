import { PropertyDataProps, OfferProps, CompanyProps } from "../database";
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
    heading: "Amazing New home in the heart of Jacksonville 🏡",
    desc: "Here's a description of the property!",
    imgSrc: "/prop1.png",
    imgWidth: 400,
    imgHeight: 200,
    imgAlt: "image alt here",
    cn: "classname",
    views: 276,
    popularity: EnumPopularity.Pending,
    matterportUrl: "https://my.matterport.com/show/?m=Qojjx8x9Fu4&play=1",
    streetViewUrl:
      "https://www.google.com/maps/embed/v1/streetview?location=30.2959%2C-81.4075&key=",
    mapLocationUrl:
      "910+16th+St+N,+Jacksonville+Beach,+FL+32250/@30.2959119,-81.4074858,17z/data=!3m1!4b1!4m6!3m5!1s0x88e4497494de7533:0x264c12bdc7ebedb4!8m2!3d30.2959119!4d-81.4074858!16s%2Fg%2F11cpp12ftp?entry=ttu",
    winNowPrice: "$295,000",
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
    heading: "Beautiful townhome ready for repairs 🏡",
    desc: "Here's a description of the property!",
    imgSrc: "/prop3.png",
    imgWidth: 400,
    imgHeight: 200,
    imgAlt: "image alt here",
    cn: "classname",
    views: 276,
    popularity: EnumPopularity.Pending,
    matterportUrl: "https://my.matterport.com/show/?m=Qojjx8x9Fu4&play=1",
    streetViewUrl:
      "https://www.google.com/maps/embed/v1/streetview?location=30.2959%2C-81.4075&key=",
    mapLocationUrl:
      "910+16th+St+N,+Jacksonville+Beach,+FL+32250/@30.2959119,-81.4074858,17z/data=!3m1!4b1!4m6!3m5!1s0x88e4497494de7533:0x264c12bdc7ebedb4!8m2!3d30.2959119!4d-81.4074858!16s%2Fg%2F11cpp12ftp?entry=ttu",
    winNowPrice: "$1.1M",
    askPrice: "$745,000",
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
    offerPrice: "String",
    emdAmount: "String",
    reqFinancing: true,
    lenderName: "String",
    buyerName: "String",
    buyerCompany: "String",
    comments: "String",

    accepted: true,
    acceptedAt: new Date().toLocaleDateString("en-US"),

    image: "/prop6.png",
    address1: "123 Adams St",
    address2: "STE 201",
    city: "Jacksonville",
    state: "FL",
    county: "Duval",
    zip: "32256",
    dateSubmitted: new Date().toLocaleDateString("en-US"),
    status: EnumStatus.Pending,
  },
];

export const companiesData: CompanyProps[] = [
  {
    companyName: "Tech Innovators Inc",
    companyLogo: "https://example.com/logo1.png",
    companyUrl: "https://techinnovators.com",
    companyListingsUrl: "TechInnovators",
    companyEmail: "info@techinnovators.com",
    companyPhone: "+1 (555) 123-4567",
    companyAddress1: "123 Tech Street",
    companyAddress2: "Suite 456",
    companyCity: "Techville",
    companyState: "CA",
    companyZip: "90001",
    companyCountry: "USA",
    companyDescription: "Leading the way in technological innovation.",
    companyFacebook: "https://facebook.com/techinnovators",
    companyTwitter: "https://twitter.com/techinnovators",
    companyInstagram: "https://instagram.com/techinnovators",
    companyLinkedin: "https://linkedin.com/company/techinnovators",
    companyYoutube: "https://youtube.com/techinnovators",
  },
  {
    companyName: "Global Solutions Ltd",
    companyLogo: "https://example.com/logo2.png",
    companyUrl: "https://globalsolutions.com",
    companyListingsUrl: "GlobalSolutions",
    companyEmail: "info@globalsolutions.com",
    companyPhone: "+1 (555) 987-6543",
    companyAddress1: "456 Solution Avenue",
    companyAddress2: "Floor 12",
    companyCity: "Solutiontown",
    companyState: "NY",
    companyZip: "10001",
    companyCountry: "USA",
    companyDescription:
      "Providing comprehensive solutions for a connected world.",
    companyFacebook: "https://facebook.com/globalsolutions",
    companyTwitter: "https://twitter.com/globalsolutions",
    companyInstagram: "https://instagram.com/globalsolutions",
    companyLinkedin: "https://linkedin.com/company/globalsolutions",
    companyYoutube: "https://youtube.com/globalsolutions",
  },
  {
    companyName: "Green Energy Co",
    companyLogo: "https://example.com/logo3.png",
    companyUrl: "https://greenenergyco.com",
    companyListingsUrl: "GreenEnergyCo",
    companyEmail: "info@greenenergyco.com",
    companyPhone: "+1 (555) 876-5432",
    companyAddress1: "789 Renewable Street",
    companyAddress2: "Suite 101",
    companyCity: "Eco City",
    companyState: "TX",
    companyZip: "75001",
    companyCountry: "USA",
    companyDescription:
      "Pioneering sustainable energy solutions for a greener tomorrow.",
    companyFacebook: "https://facebook.com/greenenergyco",
    companyTwitter: "https://twitter.com/greenenergyco",
    companyInstagram: "https://instagram.com/greenenergyco",
    companyLinkedin: "https://linkedin.com/company/greenenergyco",
    companyYoutube: "https://youtube.com/greenenergyco",
  },
  {
    companyName: "Innovate Labs",
    companyLogo: "https://example.com/logo4.png",
    companyUrl: "https://innovatelabs.com",
    companyListingsUrl: "InnovateLabs",
    companyEmail: "info@innovatelabs.com",
    companyPhone: "+1 (555) 234-5678",
    companyAddress1: "101 Innovation Boulevard",
    companyAddress2: "Lab Complex A",
    companyCity: "Techtopia",
    companyState: "CA",
    companyZip: "90210",
    companyCountry: "USA",
    companyDescription: "Transforming ideas into groundbreaking innovations.",
    companyFacebook: "https://facebook.com/innovatelabs",
    companyTwitter: "https://twitter.com/innovatelabs",
    companyInstagram: "https://instagram.com/innovatelabs",
    companyLinkedin: "https://linkedin.com/company/innovatelabs",
    companyYoutube: "https://youtube.com/innovatelabs",
  },
];
