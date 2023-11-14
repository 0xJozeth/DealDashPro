import { Company, Property } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Card from "../Card";
import { PropertyData } from "../../../prisma/data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { CompanyWithProperties, PropertyWithCompany } from "../../../database";

const PropertyCards = ({
  property,
  user,
  isAuthenticated,
}: {
  property: PropertyWithCompany;
  user: KindeUser;
  isAuthenticated: boolean;
}) => {
  const company: CompanyWithProperties = property.company;
  const companyProperties: Property[] = company.properties;

  console.log("COMPANY", company);
  console.log("PROPERTY", companyProperties);
  return (
    <section
      id="media"
      className="flex w-full flex-col gap-4 border-t border-neutral-200 py-[24px]"
    >
      <h3 className="text-[22px] font-semibold leading-relaxed">
        More Properties from Company Name
      </h3>
      {/* TODO: Mapping. */}
      <div className="flex h-auto w-full justify-start">
        {/* TODO: Exclude the current property */}
        {companyProperties.map((property: Property) => (
          <Card
            key={property.id}
            propertyData={property}
            user={user}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
      <div className="flex items-center justify-center py-4">
        <Link href={`/${company.companyName.replace(/\s+/g, "-")}/listings`}>
          <div className="flex h-[45px] w-[250px] min-w-[175px] items-center justify-center rounded-[5px] border border-black">
            <p className="text-base font-normal leading-normal text-black">
              View more homes
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default PropertyCards;
