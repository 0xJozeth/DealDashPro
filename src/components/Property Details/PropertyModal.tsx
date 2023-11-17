import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, ReactElement, useState } from "react";
import { set, useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropzone from "react-dropzone";
import { Clock10, Cloud, File, Loader2 } from "lucide-react";
import { Progress } from "../ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "../ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import next from "next";
import Link from "next/link";

export type offerSchemaType = z.infer<typeof offerSchema>;

export const offerSchema = z.object({
  offerPrice: z
    .string()
    .regex(
      /^\$?(\d{1,3}(,\d{3})*|(\d+))(\.\d{0,2})?$/,
      "Offer price must be a valid dollar amount.",
    )
    .transform((value) => parseFloat(value.replace(/[^0-9.]/g, ""))),
  emdAmount: z
    .string()
    .regex(
      /^\$?(\d{1,3}(,\d{3})*|(\d+))(\.\d{0,2})?$/,
      "Offer price must be a valid dollar amount.",
    )
    .transform((value) => parseFloat(value.replace(/[^0-9.]/g, "")))
    .refine((value) => value >= 5000, "EMD Amount must be at least $5,000."),
  reqFinancing: z
    .string()
    .refine((value) => value !== "", "You must select an option."),
  lenderName: z
    .string()
    .optional()
    .refine((value) => value?.trim() !== "", {
      message: "You must enter a lender name.",
      path: ["lenderName"],
    }),
  buyerName: z.string().min(1, "Enter the full name of the buyer."),
  buyerCompany: z.string().min(1, "Enter the buyer company's name"),
  comments: z.string().optional(),
});

function PropertyModal({
  toggleModal,
  setToggleModal,
  closeModal,
  user,
  propertyId,
}: {
  toggleModal: boolean;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
  user: KindeUser;
  propertyId: string;
}) {
  // Destructure useForm props and methods
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    setValue,
  } = useForm<offerSchemaType>({ resolver: zodResolver(offerSchema) });

  // Logic for steps
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [proceedToPOF, setProceedToPOF] = useState(false);
  const [confirmOffer, setConfirmOffer] = useState(false);
  const [proceedToAcceptance, setProceedToAcceptance] = useState(false);
  const [winNowModalContent, setWinNowModalContent] = useState(false);

  const steps = [
    {
      title: "Offer Details",
      content: "Step 1",
    },
    {
      title: "Proof of Funds",
      content: "Step 2",
    },
    {
      title: "Acceptance",
      content: "Step 3",
    },
  ];

  const handleConfirmOffer = (e: React.MouseEvent) => {
    setConfirmOffer(!true);
  };

  function previousStep() {
    setCurrentStepIndex((currentStepIndex) => {
      // If we're on the first step, do not decrement
      if (currentStepIndex <= 0) {
        return currentStepIndex;
      }
      return currentStepIndex - 1;
    });
  }

  function nextStep() {
    setCurrentStepIndex((currentStepIndex) => {
      // If we're on the last step, do not increment
      if (currentStepIndex >= steps.length - 1) {
        return currentStepIndex;
      }
      console.log("currentStepIndex", currentStepIndex);
      return currentStepIndex + 1;
    });
  }

  const submitAcceptance = async (data: FieldValues) => {
    console.log("data", data);

    {
      /* CREATE ACCEPTANCE API ENDPOINT */
    }
    try {
      const response = await axios.post(
        `/api/user/${user?.id}/offers/property/${propertyId}/acceptance`,
        data,
      );

      console.log("responseData", response.data);
    } catch (error) {
      console.error(error);
    }
    reset(); // Reset the form
    nextStep(); // Go to the next step
  };

  const submitUploadPOF = async (data: FieldValues) => {
    {
      /* CREATE UPLOAD PROOF OF FUNDS LETTER API ENDPOINT. WILL NEED TO USE MUTATION AND PATCH METHOD */
    }
    try {
      const response = await axios.post(`/api/uploadthing`, data);
      console.log("responseData", response.data);
      nextStep(); // Go to the next step
    } catch (error) {
      console.error(error);
    }
    // reset(); // Reset the form
  };

  const submitOffer = async (data: offerSchemaType) => {
    // Create a new object and convert user data into approapriate format for the backend
    const postData = {
      ...data,
      offerPrice: data.offerPrice.toString().startsWith("$")
        ? data.offerPrice.toLocaleString()
        : "$" + data.offerPrice.toLocaleString(),
      emdAmount: data.emdAmount.toString().startsWith("$")
        ? data.emdAmount.toLocaleString()
        : "$" + data.emdAmount.toLocaleString(),
      reqFinancing: data.reqFinancing === "true",
    };

    console.log("data wooo", data);

    try {
      const response = await axios.post(
        `/api/user/${user?.id}/offers/property/${propertyId}`,
        postData,
      );

      // console.log("responseData", response.data);
    } catch (error) {
      console.error(error);
    }
    reset(); // Reset the form
    // Use state to prevent modal from proceeding until database receives offer
    setProceedToPOF(true);
    nextStep(); // Go to the next step
  };

  // Skip to a specific step
  function goToStep(index: number) {
    setCurrentStepIndex(index);
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // needed to "watch" the value of the reqFinancing field to determine if the lenderName field should be disabled
  const reqFinancingValue = watch("reqFinancing");

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
            <header
              className={`duration-30 flex w-full cursor-default justify-center border-b transition-all ${
                currentStepIndex === 0 ? "border-black" : "border-neutral-200"
              } py-2`}
            >
              <h2
                className={`text-center text-base font-semibold leading-tight ${
                  currentStepIndex === 0 ? "text-black" : "text-neutral-500"
                }`}
              >
                Offer Details
              </h2>
            </header>
            <header
              className={`flex w-full cursor-default justify-center border-b ${
                currentStepIndex === 1 ? "border-black" : "border-neutral-200"
              }  py-2`}
            >
              <h2
                className={`text-center text-base font-semibold leading-tight ${
                  currentStepIndex === 1 ? "text-black" : "text-neutral-500"
                } `}
              >
                Proof of funds
              </h2>
            </header>
            <header
              className={`flex w-full cursor-default justify-center border-b ${
                currentStepIndex === 2 ? "border-black" : "border-neutral-200"
              }  py-2`}
            >
              <h2
                className={`text-center text-base font-semibold leading-tight ${
                  currentStepIndex === 2 ? "text-black" : "text-neutral-500"
                } `}
              >
                Acceptance
              </h2>
            </header>
          </div>

          {/* BEGIN form page 1 */}
          {currentStepIndex === 0 && (
            <form
              onSubmit={handleSubmit(submitOffer)}
              className="flex h-full w-full flex-col justify-between gap-4"
            >
              <>
                <div className="flex h-full w-full flex-col justify-between gap-4">
                  <div className="flex w-full justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <input
                        {...register("offerPrice")}
                        onChange={() => clearErrors("offerPrice")}
                        title="Enter your offer price."
                        aria-label="offer price"
                        type="text"
                        placeholder="Offer Price"
                        className={` duration-30 mx-auto h-[50px] w-[280px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                      />
                      {errors.offerPrice &&
                        typeof errors.offerPrice.message === "string" && (
                          <div className="shake h-4 text-sm text-red-400">
                            {errors.offerPrice.message}
                          </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <input
                        {...register("emdAmount")}
                        onChange={() => clearErrors("emdAmount")}
                        name="emdAmount"
                        title="Enter an amount above $5000."
                        aria-label="earnest money deposit amount"
                        className=" duration-30 mx-auto h-[50px] w-[280px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500"
                        placeholder="EMD Amount"
                        type="text"
                        min={5000}
                      />
                      {errors.emdAmount &&
                        typeof errors.emdAmount.message === "string" && (
                          <div className="shake h-4 text-sm text-red-400">
                            {errors.emdAmount.message}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="flex w-full justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <select
                        {...register("reqFinancing")}
                        onChange={(e) => {
                          clearErrors("reqFinancing");
                          setValue("reqFinancing", e.target.value);
                        }}
                        name="reqFinancing"
                        title="financing"
                        aria-label="finacing"
                        className="mx-auto h-[50px] w-[280px] rounded-[7px] border border-zinc-400 bg-transparent text-zinc-400 outline-none"
                        placeholder="Financing"
                      >
                        <option value="">Select an option.</option>
                        <option value="true">Yes, I have a lender.</option>
                        <option value="false">No, this is a cash offer.</option>
                      </select>
                      {errors.reqFinancing &&
                        typeof errors.reqFinancing.message === "string" && (
                          <div className="shake h-4 text-sm text-red-400">
                            {errors.reqFinancing.message}
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <input
                        {...register("lenderName")}
                        name="lenderName"
                        title="lenderName"
                        aria-label="lender name"
                        disabled={reqFinancingValue !== "true"}
                        required={reqFinancingValue === "true"}
                        className={`${
                          reqFinancingValue !== "true" && "bg-zinc-200"
                        } duration-30 mx-auto h-[50px] w-[280px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                        placeholder="Lender Name"
                        type="text"
                      />
                      {errors.lenderName &&
                        typeof errors.lenderName.message === "string" && (
                          <div className="shake h-4 text-sm text-red-400">
                            {errors.lenderName.message}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="flex w-full justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <input
                        {...register("buyerName")}
                        onChange={() => {
                          clearErrors("buyerName");
                        }}
                        name="buyerName"
                        title="buyerName"
                        aria-label="buyer name"
                        className=" duration-30 mx-auto h-[50px] w-[280px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500"
                        placeholder="Buyer Name"
                        type="text"
                      />
                      {errors.buyerName &&
                        typeof errors.buyerName.message === "string" && (
                          <div className="shake h-4 text-sm text-red-400">
                            {errors.buyerName.message}
                          </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <input
                        {...register("buyerCompany")}
                        onChange={() => {
                          clearErrors("buyerCompany");
                        }}
                        name="buyerCompany"
                        title="buyerCompany"
                        aria-label="buyer company"
                        className=" duration-30 mx-auto h-[50px] w-[280px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500"
                        placeholder="Buyer Company"
                        type="text"
                      />
                      {errors.buyerCompany &&
                        typeof errors.buyerCompany.message === "string" && (
                          <div className="shake h-4 text-sm text-red-400">
                            {errors.buyerCompany.message}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="mb-5 flex w-full flex-col gap-1">
                      <input
                        {...register("comments")}
                        name="comments"
                        title="comments"
                        aria-label="comments"
                        className="mx-auto h-24 w-full rounded-[7px] border border-zinc-400 bg-transparent bg-white px-2 outline-none"
                        placeholder="Add a comment..."
                        type="text"
                      />
                    </div>
                  </div>
                  {/* Add confirmation text here */}
                </div>
                <div className="flex w-full justify-center gap-4">
                  {!confirmOffer ? (
                    <button
                      type="button"
                      onClick={() => setConfirmOffer(true)}
                      className={`duration-30 h-[45px] w-full rounded-[5px] border border-neutral-400 bg-white text-base font-normal leading-normal text-neutral-500 shadow-none transition-all hover:border-none hover:bg-black hover:text-white hover:shadow-sm`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Offer "}
                    </button>
                  ) : (
                    <div className="flex w-full justify-center gap-4">
                      <button
                        onClick={handleConfirmOffer}
                        type="button"
                        className={`duration-30 h-[45px] w-1/2 rounded-[5px] border border-zinc-500 bg-white text-base font-normal leading-normal
              text-black transition-all hover:bg-black hover:text-white`}
                      >
                        Revise Offer
                      </button>

                      <button
                        type="submit"
                        onClick={handleSubmit(submitOffer)}
                        className={`duration-30 h-[45px] w-1/2 rounded-[5px]  bg-[#58A053] text-base font-normal leading-normal text-white shadow-none transition-all hover:border-none  hover:bg-[#58A053] hover:text-white hover:shadow-sm`}
                      >
                        {isSubmitting ? "Submitting..." : "SEEEEND ITTT"}
                      </button>
                    </div>
                  )}
                </div>
              </>
            </form>
          )}
          {/* END form page 1 */}
          {/* BEGIN form page 2 */}
          {currentStepIndex === 1 && (
            <div
              // onSubmit={handleSubmit(submitUploadPOF)}
              className="flex h-full w-full flex-col justify-between gap-4"
            >
              <UploadDropZone nextStep={nextStep}></UploadDropZone>

              <div className="flex w-full justify-center gap-4">
                {/* <button
                  onClick={previousStep}
                  type="button"
                  className={`h-[45px] w-1/2 rounded-[5px] bg-black 
              text-base font-normal leading-normal text-neutral-200`}
                >
                  Back
                </button> */}
                <button
                  type="button"
                  onClick={submitUploadPOF}
                  className={`duration-30 h-[45px] w-full rounded-[5px] border border-neutral-500 bg-white text-base font-normal leading-normal text-neutral-500 shadow-none transition-all hover:border-none hover:bg-black hover:text-white hover:shadow-sm`}
                >
                  {isSubmitting ? "Submitting..." : "Upload Proof of Funds"}
                </button>
              </div>
            </div>
          )}
          {currentStepIndex === 2 && (
            <>
              <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg bg-[#58a05345]">
                <p className="text-xl text-[#58a053]">
                  Your Offer has been received. View your active offers below.
                </p>
                <Clock10 className="h-64 w-64 text-[#58a053]" />
              </div>
              <div className="flex w-full justify-center gap-4">
                {/* <button
                  onClick={previousStep}
                  type="button"
                  className={`h-[45px] w-1/2 rounded-[5px] bg-black 
              text-base font-normal leading-normal text-neutral-200`}
                >
                  Back
                </button> */}

                <button
                  type="submit"
                  title="View Active Offers"
                  onClick={handleSubmit(submitAcceptance)}
                  className={`duration-30 h-[45px] w-full rounded-[5px] border border-neutral-500 bg-white text-base font-normal leading-normal text-neutral-500 shadow-none transition-all hover:border-none  hover:bg-[#58A053] hover:text-white hover:shadow-sm`}
                >
                  <Link href="/account/offers">View Active Offers</Link>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type NextStepFunction = () => void;

const UploadDropZone = ({ nextStep }: { nextStep: NextStepFunction }) => {
  // ...

  const router = useRouter();

  const [isUploading, setIsUploading] = useState<boolean | null>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  // Destructure toast function from useToast hook
  const { toast } = useToast();

  // Instantiate useUploadThing hook
  const { startUpload } = useUploadThing("pdfUploader");

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      console.log(file);
      // router.push(`/user/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  // Used to display progress with the progress bar
  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((uploadProgress) => {
        if (uploadProgress >= 95) {
          clearInterval(interval);
          return uploadProgress;
        }

        return uploadProgress + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);

        // Handle file upload
        const progressInterval = startSimulatedProgress();

        // Instantiate startUpload function from useUploadThing hook
        const res = await startUpload(acceptedFile);
        // Handle upload errors
        if (!res) {
          return toast({
            title: "Oops! Something went wrong.",
            description: "Please try again later.",
            variant: "destructive",
            duration: 5000,
          });
        }

        // Get response from destrutured array
        const [fileResponse] = res;
        // Get key from fileResponse object to identify it against database
        const key = fileResponse?.key;
        // Handle missing key error case
        if (!key) {
          return toast({
            title: "Oops! Something went wrong.",
            description: "Please try again later.",
            variant: "destructive",
            duration: 5000,
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);
        nextStep();

        //Start polling for file
        startPolling({ key });
        console.log(acceptedFile);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="m-4 h-full rounded-lg border border-dashed border-gray-300"
        >
          <div className="flex h-full w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
                <Cloud className="mb-2 h-6 w-6 text-zinc-500" />
                <p className="mb-2 text-sm text-zinc-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop your proof of funds.
                </p>
                <p className="text-xs text-zinc-500">PDF (up to 16MB)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <File className="h-4 w-4 text-[#58A053]" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Proceeding to Acceptance...
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default PropertyModal;
