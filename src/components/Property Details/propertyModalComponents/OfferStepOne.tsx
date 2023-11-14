import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

function OfferStepOne({
  user,
  propertyId,
}: {
  user: KindeUser;
  propertyId: string;
}) {
  // Logic for handling offer form & validation
  const [offerPrice, setOfferPrice] = useState<string>("");
  const [offerPriceError, setOfferPriceError] = useState(
    "Enter your offer price.",
  );

  const [emdAmount, setEmdAmount] = useState<string>("");
  const [emdAmountError, setEmdAmountError] = useState(
    "Enter an amount above $5000.",
  );

  const [reqFinancing, setReqFinancing] = useState<boolean>(false);
  const [reqFinancingError, setReqFinancingError] =
    useState("Select an option.");

  const [lenderName, setLenderName] = useState<string>("");
  const [lenderNameError, setLenderNameError] = useState("Error");

  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerNameError, setBuyerNameError] = useState("Error");

  const [buyerCompany, setBuyerCompany] = useState<string>("");
  const [buyerCompanyError, setBuyerCompanyError] = useState("Error");

  const [comments, setComments] = useState<string>("");
  const [commentsError, setCommentsError] = useState("Error");

  const handleOfferPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setOfferPriceError("Please enter an offer price.");
    } else {
      setOfferPriceError("");
    }
    setOfferPrice(e.target.value);
  };

  // Validation function
  const validateForm = useCallback(() => {
    let isValid = true;

    if (!offerPrice) {
      setOfferPriceError("Please enter an offer price.");
      isValid = false;
    } else {
      setOfferPriceError("");
    }

    if (!emdAmount) {
      setEmdAmountError("Please enter an EMD amount.");
      isValid = false;
    } else {
      setEmdAmountError("");
    }

    if (!reqFinancing) {
      setReqFinancingError("Please select an option.");
      isValid = false;
    } else {
      setReqFinancingError("");
    }

    if (!lenderName) {
      setLenderNameError("Please enter a lender name.");
      isValid = false;
    } else {
      setLenderNameError("");
    }

    if (!buyerName) {
      setBuyerNameError("Please enter a buyer name.");
      isValid = false;
    } else {
      setBuyerNameError("");
    }

    if (!buyerCompany) {
      setBuyerCompanyError("Please enter a buyer company.");
      isValid = false;
    } else {
      setBuyerCompanyError("");
    }

    if (!comments) {
      setCommentsError("Please enter a comment.");
      isValid = false;
    } else {
      setCommentsError("");
    }

    return isValid;
  }, [
    offerPrice,
    emdAmount,
    reqFinancing,
    lenderName,
    buyerName,
    buyerCompany,
    comments,
  ]);

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
    }
  };

  return (
    <form className="flex h-full w-full flex-col justify-between gap-4">
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col gap-1">
          <input
            title="Enter your offer price."
            aria-label="offer price"
            className={` duration-30 mx-auto h-[50px] w-[290px] rounded-[7px] border ${
              offerPriceError && "border-red-400 hover:border-red-500"
            } border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
            placeholder="Offer Price"
            type="number"
            value={offerPrice}
            required
            onChange={handleOfferPrice}
            onBlur={() => handleOfferPrice}
          />
          {offerPriceError && (
            <div className="h-4 text-sm text-red-400">{offerPriceError}</div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            title="Enter an amount above $5000."
            aria-label="earnest money deposit amount"
            className=" duration-30 mx-auto h-[50px] w-[290px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500"
            placeholder="EMD Amount"
            type="number"
            value={emdAmount}
            min={5000}
            required
            onChange={(e) => setEmdAmount(e.target.value)}
          />
          {emdAmountError && (
            <div className="h-4 text-sm text-red-400">{emdAmountError}</div>
          )}
        </div>
      </div>
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col gap-1">
          <select
            title="financing"
            aria-label="finacing"
            className="mx-auto h-[50px] w-[290px] rounded-[7px] border border-zinc-400 bg-transparent text-zinc-400 outline-none"
            placeholder="Financing"
            value={reqFinancing.toString()}
            required
            onChange={(e) => setReqFinancing(e.target.value === "true")}
          >
            <option value="">Select an option.</option>
            <option value="true">Yes, I require financing.</option>
            <option value="false">Cash</option>
          </select>
          {reqFinancingError && (
            <div className="h-4 text-sm text-red-400">{reqFinancingError}</div>
          )}
        </div>

        <input
          title="lenderName"
          aria-label="lender name"
          className=" duration-30 mx-auto h-[50px] w-[290px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500"
          placeholder="Lender Name"
          type="text"
          value={lenderName}
          required
          onChange={(e) => setLenderName(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <input
          title="buyerName"
          aria-label="buyer name"
          className=" duration-30 mx-auto h-[50px] w-[290px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500"
          placeholder="Buyer Name"
          type="text"
          value={buyerName}
          required
          onChange={(e) => setBuyerName(e.target.value)}
        />
        <input
          title="buyerCompany"
          aria-label="buyer company"
          className=" duration-30 mx-auto h-[50px] w-[290px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500"
          placeholder="Buyer Company"
          type="text"
          value={buyerCompany}
          required
          onChange={(e) => setBuyerCompany(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <input
          title="comments"
          aria-label="comments"
          className="mx-auto h-24 w-full rounded-[7px] border border-zinc-400 bg-transparent bg-white px-2 outline-none"
          placeholder="Add a comment..."
          type="text"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
    </form>
  );
}

export default OfferStepOne;
