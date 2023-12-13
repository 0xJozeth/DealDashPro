"use client";
import { FieldError, set, useForm } from "react-hook-form";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Dropzone from "react-dropzone";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { useToast } from "./ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { trpc } from "@/app/_trpc/client";
import {
  Camera,
  CheckCircle,
  Cloud,
  File,
  File as FileIcon,
} from "lucide-react";
import { Progress } from "./ui/progress";
import { Property, PropertyImage } from "@prisma/client";
import { PropertyData } from "../../prisma/data";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { UploadButton } from "@/utils/uploadthing";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadFileResponse } from "uploadthing/client";

//use Zustand to manage property state
import { usePropertyIdStore } from "@/store/store";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";

// Create interface for the schema
type CreatePropertySchemaType = z.infer<typeof CreatePropertySchema>;

// Create type for zod schema
const MAX_FILE_SIZE = 50000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const CreatePropertySchema = z.object({
  heading: z.string().min(1, "Please enter a valid property title."),
  desc: z.string(),
  matterportUrl: z.string(),
  streetViewUrl: z.string(),
  mapLocationUrl: z.string(),
  winNowPrice: z.string().min(1, "Please enter a valid WinNowPrice price."),
  askPrice: z.string().min(1, "Please enter a valid askPrice price."),
  arv: z.string().min(1, "Please enter a valid after repair value."),
  address1: z.string().min(1, "Please enter a valid address1."),
  address2: z.string(),
  city: z.string().min(1, "Please enter a valid city."),
  state: z.string().min(1, "Please enter a valid state."),
  county: z.string().min(1, "Please enter a valid county."),
  zip: z.string().min(1, "Please enter a valid zip."),
  country: z.string(),
  beds: z.string().min(1, "Please enter a valid beds."),
  baths: z.string().min(1, "Please enter a valid baths."),
  sqft: z.string().min(1, "Please enter a valid sqft."),
  type: z.string().min(1, "Please enter a valid type."),
  parking: z.string().min(1, "Please enter a valid parking."),
  yearBuilt: z.string().min(1, "Please enter a valid yearBuilt."),
  lotSize: z.string().min(1, "Please enter a valid lotSize."),
});

export const Dashboard = () => {
  // State management for the property information and the uploaded images.
  const [propertyInfoAdded, setPropertyInfoAdded] = useState(false);
  const [uploadedImagesAdded, setUploadedImagesAdded] = useState(false);
  const [currentTab, setCurrentTab] = useState("info");
  const [activeTab, setActiveTab] = useState("addProperty");
  const [key, setKey] = useState(0);
  // const steps = ["info", "images", "publishing"];
  const [steps, setSteps] = useState("info");
  const [currentStep, setCurrentStep] = useState(0);
  // const [newPropertyId, setNewPropertyId] = useState("");
  const { propertyId, setPropertyId } = usePropertyIdStore();

  // Destructure useForm props and methods
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    reset,
    clearErrors,
    setValue,
  } = useForm<CreatePropertySchemaType>({
    resolver: zodResolver(CreatePropertySchema),
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/kindeSession");
      return (data.user as KindeUser) || [];
    },
  });

  const { data: publishedProperties, isLoading: publishedPropertiesLoading } =
    useQuery({
      queryKey: ["publishedProperties"],
      queryFn: async () => {
        try {
          const { data } = await axios.get("/api/property");
          return (data.publishedProperties as Property[]) || [];
        } catch (error) {
          console.error(error);
        }
      },
    });

  // Add state variables for the property information and the uploaded images.
  // const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const { toast } = useToast();

  // Instantiate queryClient as useQueryClient hook
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("useEffect propertyId", propertyId);
  }, [propertyId]);

  const mutation = useMutation(
    async (propertyData: CreatePropertySchemaType) => {
      try {
        const response = await axios.post(`/api/property`, propertyData);
        if (!response.data) {
          return toast({
            title: "Now loading...",
            description: "Processing submission. Please wait.",
            variant: "default",
            duration: 5000,
          });
        }

        if (!response.data.id) {
          return null;
        }

        console.log("response.data.id", response.data.id);
        setPropertyId(response.data.id);
        console.log("What is the propertyId?", propertyId);
        return response.data;
      } catch (error) {
        console.error(error);
        return toast({
          title: "Oops! Something went wrong.",
          description: "Post failed. Please try again later.",
          variant: "destructive",
          duration: 5000,
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["unpublishedProperties"]);
        setSteps("images");
      },
    },
  );

  const submitProperty = async (data: CreatePropertySchemaType) => {
    // Check if user or user.id is undefined.
    if (!user || !user.id) {
      return toast({
        title: "Oops! Something went wrong.",
        description: "User information is missing. Please log in again.",
        variant: "destructive",
        duration: 5000,
      });
    }

    // Create a new object and convert user data into approapriate format for the backend
    const propertyData = {
      ...data,
      askPrice: data.askPrice.toString().startsWith("$")
        ? data.askPrice.toLocaleString()
        : "$" + data.askPrice.toLocaleString(),
      winNowPrice: data.winNowPrice.toString().startsWith("$")
        ? data.winNowPrice.toLocaleString()
        : "$" + data.winNowPrice.toLocaleString(),
      arv: data.arv.toString().startsWith("$")
        ? data.arv.toLocaleString()
        : "$" + data.arv.toLocaleString(),
      userId: user.id, // Add the user id to the post data
      listedAt: new Date().toLocaleDateString(), // Add the current date to the post data
      published: false, // Set the published status to false
    };

    // Use the mutate function from useMutation to submit the property data.
    mutation.mutate(propertyData);

    reset(); // Reset the form
    // setPropertyInfoAdded(true); // Set the propertyInfoAdded state to true
    // setCurrentStep((prevStep) => prevStep + 1);
  };

  const submitFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput") as HTMLInputElement;

    // Check if a file was selected
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]; // Get the first file
      const formData = new FormData();
      formData.append("file", file);

      try {
        const { data } = await axios.post(
          `/api/user/${user?.id}/property/draftProperties/${propertyId}/upload-images`,
          formData,
        );
        console.log("Uploaded data", data);
        console.log("Uploaded file", file);
        return (data as PropertyImage) || [];
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Logic for routing
  const router = useRouter();

  // navigate to the Upload Images page after the property is created
  // useEffect(() => {
  //   if (propertyId) {
  //     router.push(`/dashboard/post-property/${propertyId}/upload-images`);
  //   }
  // }, [router, propertyId]);

  // const {
  //   data: unpublishedProperties,
  //   isLoading: unpublishedPropertiesLoading,
  // } = useQuery({
  //   queryKey: ["unpublishedProperties"],
  //   queryFn: async () => {
  //     try {
  //       const { data } = await axios.get(`/api/user/${user?.id}/property`);
  //       return (data as Property[]) || [];
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  // });

  return (
    <div className="flex gap-8">
      <div className="relative flex h-auto min-h-screen w-[300px] flex-col gap-4 bg-blue-900/90">
        <div className="relative mx-auto my-36 flex h-[500px] flex-col justify-evenly gap-4">
          <Link
            href="/dashboard/post-property"
            className="relative mx-auto flex gap-4"
          >
            <h3 className="font-semibold leading-tight text-white">
              Post A Property
            </h3>
          </Link>
          <Link
            href="/dashboard/drafts"
            prefetch={false}
            className="relative mx-auto flex gap-4"
          >
            <h3 className="font-semibold leading-tight text-white">
              View Drafts
            </h3>
          </Link>
        </div>
      </div>
      <div className="my-36 px-8">
        <h1 className="">Post A Property</h1>

        <section className="flex-col gap-8 border border-red-600">
          {steps === "info" && (
            <form
              className="flex flex-col items-start gap-2"
              onSubmit={handleSubmit(submitProperty)}
            >
              <div className="flex flex-col gap-1">
                <input
                  {...register("heading")}
                  title="Enter a catchy heading for your property."
                  aria-label="property heading"
                  type="text"
                  placeholder="Enter a heading"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.heading && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.heading.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <textarea
                  {...register("desc")}
                  title="Enter a catchy description for your property."
                  aria-label="property description"
                  // type="text"
                  placeholder="Enter a description"
                  className={` duration-30 mx-auto h-[75px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.desc && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.desc.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("matterportUrl")}
                  title="Enter a matterport url for your property."
                  aria-label="matterport url"
                  type="text"
                  placeholder="Enter a matterport url"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.matterportUrl && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.matterportUrl.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("streetViewUrl")}
                  title="Enter a catchy streetViewUrl for your property."
                  aria-label="property streetViewUrl"
                  type="text"
                  placeholder="Enter a streetViewUrl"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.streetViewUrl && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.streetViewUrl.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("mapLocationUrl")}
                  title="Enter a catchy mapLocation for your property."
                  aria-label="property mapLocation"
                  type="text"
                  placeholder="Enter a mapLocation"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.mapLocationUrl && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.mapLocationUrl.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("winNowPrice")}
                  onChange={(e) => {
                    // Clear errors when the input changes
                    clearErrors("winNowPrice");
                    // Prevent non-numeric input
                    const value = e.target.value.replace(/[^0-9.]/g, "");
                    // Format the value as a dollar amount
                    const formattedValue = "$" + Number(value).toLocaleString();
                    // Update the form value
                    setValue("winNowPrice", formattedValue);
                  }}
                  title="Enter your Win Now Price."
                  aria-label="Win Now Price"
                  type="text"
                  placeholder="Enter a Win Now Price"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.winNowPrice &&
                  typeof errors.winNowPrice.message === "string" && (
                    <div className="shake h-4 text-sm text-red-400">
                      {errors.winNowPrice.message}
                    </div>
                  )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("askPrice")}
                  onChange={(e) => {
                    // Clear errors when the input changes
                    clearErrors("askPrice");
                    // Prevent non-numeric input
                    const value = e.target.value.replace(/[^0-9.]/g, "");
                    // Format the value as a dollar amount
                    const formattedValue = "$" + Number(value).toLocaleString();
                    // Update the form value
                    setValue("askPrice", formattedValue);
                  }}
                  title="Enter your ask price."
                  aria-label="ask price"
                  type="text"
                  placeholder="Enter an ask price"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.askPrice && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.askPrice.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("arv")}
                  onChange={(e) => {
                    // Clear errors when the input changes
                    clearErrors("arv");
                    // Prevent non-numeric input
                    const value = e.target.value.replace(/[^0-9.]/g, "");
                    // Format the value as a dollar amount
                    const formattedValue = "$" + Number(value).toLocaleString();
                    // Update the form value
                    setValue("arv", formattedValue);
                  }}
                  title="Enter your after repair value."
                  aria-label="after repair value"
                  type="text"
                  placeholder="Enter an after repair value"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.arv && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.arv.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("address1")}
                  title="Enter a catchy address for your property."
                  aria-label="property address-1"
                  type="text"
                  placeholder="Enter an address"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.address1 && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.address1.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("address2")}
                  title="Enter a catchy address for your property."
                  aria-label="property address-2"
                  type="text"
                  placeholder="Enter an address"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("city")}
                  title="City"
                  aria-label="property city"
                  type="text"
                  placeholder="Enter an city"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.city && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.city.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("state")}
                  title="City"
                  aria-label="property state"
                  type="text"
                  placeholder="Enter an state"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.state && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.state.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("county")}
                  title="City"
                  aria-label="property county"
                  type="text"
                  placeholder="Enter an county"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("zip")}
                  title="City"
                  aria-label="property zip"
                  type="text"
                  placeholder="Enter an zip"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.zip && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.zip.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("country")}
                  title="City"
                  aria-label="property country"
                  type="text"
                  placeholder="Enter an country"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.country && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.country.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("beds")}
                  title="Beds"
                  aria-label="property beds"
                  type="text"
                  placeholder="Enter number of beds"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.beds && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.beds.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("baths")}
                  title="Baths"
                  aria-label="property baths"
                  type="text"
                  placeholder="Enter an baths"
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.baths && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.baths.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("sqft")}
                  title="Sqft"
                  aria-label="property sqft"
                  type="text"
                  placeholder="Enter the square footage."
                  className={` duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.sqft && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.sqft.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("type")}
                  title="Type"
                  aria-label="property type"
                  type="string"
                  placeholder="Enter the property type, e.g. single-family, etc.)."
                  className={`duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.type && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.type.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("parking")}
                  title="Parking"
                  aria-label="property parking"
                  type="string"
                  placeholder="Enter the property parking option."
                  className={`duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.parking && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.parking.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("yearBuilt")}
                  title="Year Built"
                  aria-label="property year built"
                  type="text"
                  placeholder="Enter the property build year."
                  className={`duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.yearBuilt &&
                  typeof errors.yearBuilt.message === "number" && (
                    <div className="shake h-4 text-sm text-red-400">
                      {errors.yearBuilt.message}
                    </div>
                  )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  {...register("lotSize")}
                  title="Lot Size"
                  aria-label="property lot size"
                  type="text"
                  placeholder="Enter the property lot size."
                  className={`duration-30 mx-auto h-[35px] w-[360px] rounded-[7px] border border-zinc-400 bg-transparent px-2 outline-none transition-all hover:border-zinc-500`}
                />
                {errors.lotSize && (
                  <div className="shake h-4 text-sm text-red-400">
                    {errors.lotSize.message}
                  </div>
                )}
              </div>
              <div className="mt-10 flex items-start justify-between gap-6">
                <div className="flex items-center justify-center gap-2">
                  <button
                    title="submit-button"
                    type="submit"
                    className="rounded-[10px] border border-zinc-600 p-2 px-4"
                  >
                    Save Draft
                  </button>
                </div>
                <div className="flex items-start justify-center gap-2">
                  <button
                    title="submit-and-upload-images-button"
                    type="button"
                    className="flex justify-between gap-2 rounded-[10px] border border-zinc-600 p-2 px-4"
                  >
                    <Camera className="h-6 w-6 text-zinc-500" />
                    Upload Images
                  </button>
                  {/* <UploadButton
                    endpoint="imageUploader"
                    appearance={{
                      button:
                        "flex justify-between gap-2 rounded-[10px] border border-zinc-600 p-2 px-4 text-black",
                    }}
                    onClientUploadComplete={(
                      res: UploadFileResponse<null>[],
                    ) => {
                      console.log("res", res);
                      console.log(
                        "onClientUploadComplete propertyId",
                        propertyId,
                      );
                      alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                      // TODO: Add toast notification for error
                      console.error(error);
                      alert(`ERROR! ${error.message}`);
                    }}
                  /> */}
                </div>
              </div>
            </form>
          )}
          {steps === "images" && (
            <div className="">
              <h1>Images for id: {propertyId}</h1>
              {/* <form onSubmit={submitFile}>
                <Input id="fileInput" type="file" />
                <button
                  title="submit-button"
                  type="submit"
                  className="rounded-[10px] border border-zinc-600 p-2 px-4"
                >
                  Upload Image
                </button>
              </form> */}
              <UploadDropZone />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

const UploadDropZone = () => {
  // ...

  const router = useRouter();

  const [isUploading, setIsUploading] = useState<boolean | null>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const queryClient = useQueryClient();

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const { data } = await axios.get("/api/kindeSession");
      // Check if there is a user id else return
      if (!data) {
        return;
      }
      return data as KindeUser;
    },
  });

  // Destructure toast function from useToast hook
  const { toast } = useToast();

  // Instantiate useUploadThing hook
  const { startUpload } = useUploadThing("imageUploader");

  // const { mutate: startPolling } = trpc.getImage.useMutation({
  //   onSuccess: (file) => {
  //     router.push(`/user/${file.id}`);
  //   },
  //   onError: (err) => {
  //     console.error("An error occurred:", err);
  //     // Handle the error
  //   },
  //   retry: true,
  //   retryDelay: 500,
  // });

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

        // // Set isFileUploaded to true
        setIsFileUploaded(true);

        //Start polling for file
        // startPolling({ key });

        //refetch new files
        queryClient.invalidateQueries(["documents", userData]);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="mt-20 h-full w-[600px] rounded-lg border border-dashed border-gray-300"
        >
          <div className="flex h-full w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
                <Cloud className="mb-2 h-6 w-6 text-zinc-500" />
                {isUploading && !isFileUploaded ? (
                  <>
                    <p className="mb-2 text-sm text-zinc-500">
                      Upload in progress. Please wait...
                    </p>
                    <p className="text-xs text-zinc-500">PDF (up to 16MB)</p>
                  </>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-zinc-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop your documents.
                    </p>
                    <p className="text-xs text-zinc-500">PDF (up to 16MB)</p>
                  </>
                )}
              </div>

              {acceptedFiles && acceptedFiles[0] && !isFileUploaded && (
                <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <File className="h-4 w-4 text-[#58A053]" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              )}

              {isUploading && !isFileUploaded && (
                <div className="mx-auto my-4 w-full max-w-xs">
                  <Progress
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                  {uploadProgress === 100 && (
                    <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                      <CheckCircle className="h-3 w-3 text-[#58A053]" />
                      Upload complete!
                    </div>
                  )}
                </div>
              )}

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
