import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import React, { useState } from "react";

function OfferStepThree({
  user,
  propertyId,
}: {
  user: KindeUser;
  propertyId: string;
}) {
  const handleOffer = async () => {
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
  };

  // Logic for handling offer form
  const [offerPrice, setOfferPrice] = useState("");
  const [emdAmount, setEmdAmount] = useState("");
  const [reqFinancing, setReqFinancing] = useState(false);
  const [lenderName, setLenderName] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerCompany, setBuyerCompany] = useState("");
  const [comments, setComments] = useState("");

  return (
    <form className="flex h-full w-full flex-col justify-between gap-4 bg-green-300">
      <div className="flex w-full justify-between gap-4">
        <input
          title="offerPrice"
          className=" duration-30 mx-auto h-[50px] w-[290px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500"
          placeholder="Offer Price"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
        />
        <input
          title="emdAmount"
          className=" duration-30 mx-auto h-[50px] w-[290px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500"
          placeholder="EMD Amount"
          value={emdAmount}
          onChange={(e) => setEmdAmount(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <select
          title="financing"
          className="mx-auto h-[50px] w-[290px] rounded-[7px] border border-zinc-400 bg-transparent text-zinc-400 outline-none"
          placeholder="Financing"
          value={reqFinancing.toString()}
          onChange={(e) => setReqFinancing(e.target.value === "true")}
        >
          <option value="">Select an option.</option>
          <option value="true">Yes, I require financing.</option>
          <option value="false">Cash</option>
        </select>
        <input
          title="lenderName"
          className=" duration-30 mx-auto h-[50px] w-[290px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500"
          placeholder="Lender Name"
          value={lenderName}
          onChange={(e) => setLenderName(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <input
          title="buyerName"
          className=" duration-30 mx-auto h-[50px] w-[290px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500"
          placeholder="Buyer Name"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
        />
        <input
          title="buyerCompany"
          className=" duration-30 mx-auto h-[50px] w-[290px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500"
          placeholder="Buyer Company"
          value={buyerCompany}
          onChange={(e) => setBuyerCompany(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <input
          title="comments"
          className="mx-auto h-24 w-full rounded-[7px] border border-zinc-400 bg-transparent bg-white px-2 outline-none"
          placeholder="Add a comment..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
    </form>
  );
}

export default OfferStepThree;
