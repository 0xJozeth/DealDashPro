import useModalContext from "@/app/hooks/useModalContext";
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
  const context = useModalContext();

  let handleOfferPrice = (e: React.ChangeEvent<HTMLInputElement>) => {},
    offerPrice,
    setOfferPrice = (value: string) => {},
    offerPriceError,
    setOfferPriceError = (value: string) => {},
    emdAmount,
    setEmdAmount = (value: string) => {},
    emdAmountError,
    setEmdAmountError = (value: string) => {},
    reqFinancing,
    setReqFinancing = (value: boolean) => {},
    reqFinancingError,
    setReqFinancingError = (value: string) => {},
    lenderName,
    setLenderName = (value: string) => {},
    buyerName,
    setBuyerName = (value: string) => {},
    buyerCompany,
    setBuyerCompany = (value: string) => {},
    comments,
    setComments = (value: string) => {};

  if (context) {
    handleOfferPrice = context.handleOfferPrice;
    offerPrice = context.offerPrice;
    setOfferPrice = context.setOfferPrice;

    offerPriceError = context.offerPriceError;
    setOfferPriceError = context.setOfferPriceError;

    emdAmount = context.emdAmount;
    setEmdAmount = context.setEmdAmount;

    emdAmountError = context.emdAmountError;
    setEmdAmountError = context.setEmdAmountError;

    reqFinancing = context.reqFinancing;
    setReqFinancing = context.setReqFinancing;

    reqFinancingError = context.reqFinancingError;
    setReqFinancingError = context.setReqFinancingError;

    lenderName = context.lenderName;
    setLenderName = context.setLenderName;

    buyerName = context.buyerName;
    setBuyerName = context.setBuyerName;

    buyerCompany = context.buyerCompany;
    setBuyerCompany = context.setBuyerCompany;

    comments = context.comments;
    setComments = context.setComments;
  }

  // Validation function
  // const validateForm = useCallback(() => {
  //   let isValid = true;

  //   if (!offerPrice) {
  //     setOfferPriceError("Please enter an offer price.");
  //     isValid = false;
  //   } else {
  //     setOfferPriceError("");
  //   }

  //   if (!emdAmount) {
  //     setEmdAmountError("Please enter an EMD amount.");
  //     isValid = false;
  //   } else {
  //     setEmdAmountError("");
  //   }

  //   if (!reqFinancing) {
  //     setReqFinancingError("Please select an option.");
  //     isValid = false;
  //   } else {
  //     setReqFinancingError("");
  //   }

  //   if (!lenderName) {
  //     setLenderNameError("Please enter a lender name.");
  //     isValid = false;
  //   } else {
  //     setLenderNameError("");
  //   }

  //   if (!buyerName) {
  //     setBuyerNameError("Please enter a buyer name.");
  //     isValid = false;
  //   } else {
  //     setBuyerNameError("");
  //   }

  //   if (!buyerCompany) {
  //     setBuyerCompanyError("Please enter a buyer company.");
  //     isValid = false;
  //   } else {
  //     setBuyerCompanyError("");
  //   }

  //   if (!comments) {
  //     setCommentsError("Please enter a comment.");
  //     isValid = false;
  //   } else {
  //     setCommentsError("");
  //   }

  //   return isValid;
  // }, [
  //   offerPrice,
  //   emdAmount,
  //   reqFinancing,
  //   lenderName,
  //   buyerName,
  //   buyerCompany,
  //   comments,
  // ]);

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
            type="text"
            value={offerPrice}
            required
            onChange={(e) => setOfferPrice(e.target.value)}
            // onBlur={() => offerPrice}
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
            type="text"
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
            value={reqFinancing?.toString() === "false" ? "false" : "true"}
            required
            onChange={(e) =>
              setReqFinancing(e.target.value === "false" ? false : true)
            }
          >
            <option value="Select an option">Select an option.</option>
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
