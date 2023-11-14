import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import React, { FormEvent, useState } from "react";

function OfferStepThree({
  user,
  propertyId,
}: {
  user: KindeUser;
  propertyId: string;
}) {
  const handleOffer = async () => {
    if (!validateForm()) {
      return;

      const userId = user?.id;
      console.log("userId", userId);
      console.log("propertyId", propertyId);

      if (!userId || !propertyId) return;
      try {
        await axios.post(`/api/user/${userId}/offers/property/${propertyId}`, {
          offerPrice,
          emdAmount,
          reqFinancing,
          lenderName,
          buyerName,
          buyerCompany,
          comments,
        });
      } catch (error) {
        console.error(error);
      }
      // Refresh UI after the offer is deleted
      // location.reload();

      setData(data);
      form.reset();
    }
  };

  return (
    <form
      onSubmit={handleOffer}
      className="flex h-full w-full flex-col justify-between gap-4 bg-green-300"
    >
      <div className="flex w-full justify-between gap-4"></div>
    </form>
  );
}

export default OfferStepThree;
