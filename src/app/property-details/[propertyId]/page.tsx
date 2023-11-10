"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MoreProperties from "@/components/Property Details/MoreProperties";
import NearbyProperties from "@/components/Property Details/NearbyProperties";
import PropertyImages from "@/components/Property Details/PropertyImages";
import PropertyMain from "@/components/Property Details/PropertyMain";
import PropertyTitle from "@/components/Property Details/PropertyTitle";
import { db } from "@/db";
import { Property } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { use } from "react";

const PropertyDetailsPage = () => {
  const params = useParams();

  console.log("params", params);

  const {
    data: property,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/property/${params.propertyId}`);
      return data as Property;
    },
  });

  if (!property) {
    return <div className="min-h-screen">Loading...</div>;
  }
  return (
    <>
      <MaxWidthWrapper>
        <PropertyTitle property={property} />
        <PropertyImages property={property} />
        <PropertyMain />
        <MoreProperties />
        <NearbyProperties />
      </MaxWidthWrapper>
    </>
  );
};

export default PropertyDetailsPage;
