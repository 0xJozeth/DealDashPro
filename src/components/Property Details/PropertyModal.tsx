import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import Image from "next/image";
import React, { ReactElement, useState } from "react";
import OfferStepOne from "./propertyModalComponents/OfferStepOne";
import OfferStepTwo from "./propertyModalComponents/OfferStepTwo";
import OfferStepThree from "./propertyModalComponents/OfferStepThree";

function PropertyModal({
  toggleModal,
  setToggleModal,
  closeModal,
  user,
  propertyId,
  steps,
}: {
  toggleModal: boolean;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
  user: KindeUser;
  propertyId: string;
  steps: ReactElement[];
}) {
  // Logic for steps
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  console.log("currentStepIndex", currentStepIndex + 1);

  function nextStep() {
    setCurrentStepIndex((currentStepIndex) => {
      // If we're on the last step, do not increment
      if (currentStepIndex >= steps.length - 1) {
        console.log("You're on the last step!");
        return currentStepIndex;
      }
      return currentStepIndex + 1;
    });
  }

  function previousStep() {
    setCurrentStepIndex((currentStepIndex) => {
      // If we're on the first step, do not decrement
      if (currentStepIndex <= 0) {
        return currentStepIndex;
      }
      return currentStepIndex - 1;
    });
  }

  function goToStep(index: number) {
    setCurrentStepIndex(index);
  }

  //   const handleConfirm = async (id: string) => {
  //     // Toggle confirmation modal useState
  //     setToggleModal(!toggleModal);
  //     console.log("toggleModal", toggleModal);
  //   };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={closeModal}
      className={
        "fixed left-0 top-0 z-[9999] mx-auto flex h-full w-full items-center justify-center bg-slate-600/20 p-4 shadow-xl"
      }
    >
      <div
        onClick={stopPropagation}
        id="modal"
        className="relative z-[9999] h-[630px] w-[800px] space-y-2 rounded-[20px] bg-white p-4 shadow-xl"
      >
        <div className="mr-8 mt-4 flex items-start justify-end">
          <button
            onClick={closeModal}
            title="Close Modal"
            type="button"
            className=""
          >
            <Image
              src="/x-button.svg"
              alt="Close Icon"
              width={17}
              height={17}
              className="h-[17px] w-auto"
            />
          </button>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-between gap-8 px-24 pb-24">
          <div className="flex w-full justify-center">
            <div
              onClick={() => setCurrentStepIndex(0)}
              className="flex w-full cursor-pointer justify-center border-b border-black py-2"
            >
              <p className="text-center text-base font-semibold leading-tight text-black">
                Offer Details
              </p>
            </div>
            <div
              onClick={() => setCurrentStepIndex(1)}
              className="flex w-full cursor-pointer justify-center border-b border-neutral-200 py-2"
            >
              <p className="text-center text-base font-semibold leading-tight text-neutral-500">
                Proof of funds
              </p>
            </div>
            <div
              onClick={() => setCurrentStepIndex(2)}
              className="flex w-full cursor-pointer justify-center border-b border-neutral-200 py-2"
            >
              <p className="text-center text-base font-semibold leading-tight text-neutral-500">
                Acceptance
              </p>
            </div>
          </div>

          <div className="flex h-full w-full">
            {currentStepIndex === 0 && (
              <OfferStepOne user={user} propertyId={propertyId} />
            )}
            {currentStepIndex === 1 && (
              <OfferStepTwo user={user} propertyId={propertyId} />
            )}
            {currentStepIndex === 2 && (
              <OfferStepThree user={user} propertyId={propertyId} />
            )}
          </div>
          <div className="flex w-full justify-center gap-4">
            <button
              type="submit"
              // onClick={nextStep}
              // onClick={nextStep}
              className={`duration-30 h-[45px] w-full rounded-[5px] border ${
                currentStepIndex === 0
                  ? "border-neutral-500"
                  : currentStepIndex === 1
                  ? "border-neutral-500"
                  : "border-[#58A053]"
              } bg-white 
              text-base font-normal leading-normal text-neutral-500 shadow-none transition-all hover:border-none hover:bg-black hover:text-white hover:shadow-sm`}
            >
              {currentStepIndex === 0
                ? "Make an offer"
                : currentStepIndex === 1
                ? "Upload Proof of Funds"
                : "Submit Offer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyModal;
