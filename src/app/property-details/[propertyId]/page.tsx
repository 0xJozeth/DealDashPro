"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MoreProperties from "@/components/Property Details/MoreProperties";
import NearbyProperties from "@/components/Property Details/NearbyProperties";
import PropertyImages from "@/components/Property Details/PropertyImages";
import PropertyMain from "@/components/Property Details/PropertyMain";
import PropertyModal from "@/components/Property Details/PropertyModal";
import PropertyTitle from "@/components/Property Details/PropertyTitle";
import OfferStepOne from "@/components/Property Details/propertyModalComponents/OfferStepOne";
import OfferStepThree from "@/components/Property Details/propertyModalComponents/OfferStepThree";
import OfferStepTwo from "@/components/Property Details/propertyModalComponents/OfferStepTwo";
import { db } from "@/db";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SetStateAction, use, useState } from "react";

const PropertyDetailsPage = () => {
  const [isFormValid, setIsFormValid] = useState(false);

  const [toggleModal, setToggleModal] = useState(false);
  const closeModal = () => {
    setToggleModal(false);
  };

  const params = useParams();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/kindeSession");
      return data.user;
    },
  });
  const { data: isAuthenticated, isLoading: authLoading } = useQuery({
    queryKey: ["isAuthenticated"],
    queryFn: async () => {
      const { data } = await axios.get("/api/kindeSession");
      return data.isAuthenticated;
    },
  });

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

  const step1 = <OfferStepOne user={user} propertyId={property.id} />;
  const step2 = <OfferStepTwo user={user} propertyId={property.id} />;
  const step3 = <OfferStepThree user={user} propertyId={property.id} />;

  return (
    <>
      <MaxWidthWrapper>
        {toggleModal && (
          <PropertyModal
            user={user}
            propertyId={property.id}
            toggleModal={toggleModal}
            setToggleModal={setToggleModal}
            closeModal={closeModal}
            steps={[step1, step2, step3]}
          />
        )}

        <PropertyTitle property={property} />
        <PropertyImages property={property} />
        <PropertyMain
          property={property}
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          closeModal={closeModal}
        />
        <MoreProperties
          property={property}
          user={user}
          isAuthenticated={isAuthenticated}
        />
        {/* TODO: The NearbyProperties component will need data from the google maps api */}
        {/* <NearbyProperties /> */}
      </MaxWidthWrapper>
    </>
  );
};

export default PropertyDetailsPage;
