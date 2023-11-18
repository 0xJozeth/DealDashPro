"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MoreProperties from "@/components/Property Details/MoreProperties";
import NearbyProperties from "@/components/Property Details/NearbyProperties";
import PropertyImages from "@/components/Property Details/PropertyImages";
import PropertyMain from "@/components/Property Details/PropertyMain";
import PropertyModal from "@/components/Property Details/PropertyModal";
import PropertyTitle from "@/components/Property Details/PropertyTitle";
import FormContext, {
  FormContextType,
  FormProvider,
} from "@/app/context/ModalContext";

import { db } from "@/db";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SetStateAction, useState } from "react";
import useModalContext from "@/app/hooks/useModalContext";

const PropertyDetailsPage = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [winNowModal, setWinNowModal] = useState(false);
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

  const winNowPrice = property.winNowPrice;

  return (
    <>
      <MaxWidthWrapper>
        {toggleModal && (
          <PropertyModal
            user={user}
            propertyId={property.id}
            closeModal={closeModal}
            winNowModal={winNowModal}
            winNowPrice={winNowPrice}
          />
        )}

        <PropertyTitle property={property} />
        <PropertyImages property={property} />
        <PropertyMain
          winNowModal={winNowModal}
          setWinNowModal={setWinNowModal}
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
