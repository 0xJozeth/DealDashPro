"use client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { headers } from "next/headers";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Bath,
  Bed,
  CheckCircle,
  Cloud,
  Delete,
  Edit,
  Eye,
  FileIcon,
  Fullscreen,
  Rss,
} from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useRouter } from "next/router";
import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { Progress } from "@radix-ui/react-progress";
import Dropzone from "react-dropzone";
import { set } from "react-hook-form";

function EditProperty() {
  const id = usePathname().split("/").slice(-2, -1)[0];
  const [propertyId, setPropertyId] = useState<string>(id);

  useEffect(() => {
    setPropertyId(id);
  }, [id]);

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/kindeSession");
      return (data.user as KindeUser) || [];
    },
  });

  const { data: property, isLoading: propertyLoading } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const userId = user?.id;
      try {
        const { data } = await axios.get(
          `/api/user/${userId}/property/draftProperties/${propertyId}`,
        );
        return (data as Property) || null;
      } catch (error) {
        console.error(error);
      }
    },
    enabled: !!user?.id && !!propertyId,
  });

  if (!user) {
    return <div>Loading User info...</div>;
  }

  if (!property) {
    return <div>Loading property information...</div>;
  }

  if (userLoading || propertyLoading) {
    return <div>Loading Property info...</div>;
  }

  return (
    <MaxWidthWrapper className="min-h-screen">
      <UploadDropZone propertyId={propertyId} />
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold leading-[30px] text-zinc-950">
          <span className="font-medium">Now Editing: </span>
          {property.address1}
        </h1>
        <section
          key={property.id}
          className="my-8 flex h-48 w-full items-center justify-between gap-2 rounded-[20px] bg-zinc-50 p-2  shadow-lg"
        >
          <div id="propertyImage" className="flex h-full min-w-[192px]">
            <Image
              src={property.featuredImage || "/noImage.png"} // map data here, also add a placeholder image e.g. src={data.image || "/placeholder.png"} where the placeholder states "upload an image"
              alt="property-image"
              width={192}
              height={192}
              className="rounded-[20px] object-cover"
            />
          </div>
          <div
            id="propertyDetails"
            className="flex h-full w-auto flex-1 flex-col justify-between gap-2 rounded-[20px] bg-white p-4 leading-relaxed text-zinc-950"
          >
            <h3 className="w-full truncate text-lg font-bold">
              {property.heading}
            </h3>
            <p className="max-w-[360px] overflow-hidden truncate text-zinc-600">
              {property.desc}
            </p>
            <div
              id="propertySpecifics"
              className="flex w-full gap-6 text-zinc-600"
            >
              <div id="bedsNo" className="flex items-center gap-1">
                <p>{property.address1}</p>
                <Bed size={16} />
              </div>
              <div id="bedsNo" className="flex items-center gap-1">
                <p>{property.baths}</p>
                <Bath size={16} />
              </div>
              <div id="bedsNo" className="flex items-center gap-1">
                <p>{property.beds}</p>
                <Fullscreen size={16} />
              </div>
              <div id="bedsNo" className="flex items-center gap-1">
                <p>{property.views}</p>
                <Eye size={16} />
              </div>
            </div>
            <div id="actions" className="flex w-full gap-6 text-zinc-600">
              <Link
                prefetch={false}
                href={`/dashboard/drafts/${property.id}`}
                className="flex items-center gap-2"
              >
                <Edit size={16} color="green" />
                <p>Edit</p>
              </Link>
              <div className="flex cursor-pointer items-center gap-2">
                <Delete size={16} color="red" />
                <p>Delete</p>
              </div>
              <div className="flex cursor-pointer items-center gap-2 ">
                <Rss size={16} color="red" />
                <p className="overflow-hidden truncate whitespace-nowrap">
                  Publish Property
                </p>
              </div>
            </div>
          </div>
          <div className="h-full border-l" />
          <div
            id="propertyMetrics"
            className=" mx-auto flex h-full w-auto min-w-[192px] flex-col gap-2 rounded-[20px] bg-white p-4"
          >
            <div
              id="propertySpecifics"
              className="items-between flex h-full w-full flex-col justify-between text-zinc-600"
            >
              <p>{property.askPrice}</p>
              <p>
                {user.given_name} {user.family_name}
              </p>
              <div className="flex justify-between gap-2 overflow-hidden truncate">
                <p>
                  {new Date(property.createdAt).toLocaleString("en-US", {
                    timeZone: "EST",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <p className="text-zinc-400">
                  {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MaxWidthWrapper>
  );
}

const UploadDropZone = ({ propertyId }: { propertyId: string }) => {
  // const router = useRouter();

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

  const { mutate: startPolling } = trpc.getImage.useMutation({
    onSuccess: (image) => {
      // router.push(`/user/${file.id}`);
      console.log("image", image.id);
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
      multiple={true}
      onDrop={async (acceptedFiles) => {
        setIsUploading(true);

        // Handle file upload
        const progressInterval = startSimulatedProgress();

        // // Instantiate startUpload function from useUploadThing hook
        const res = await startUpload(acceptedFiles);
        // Handle upload errors
        if (!res) {
          console.log("res after uploading image", res);
          return toast({
            title: "Oops! Something went wrong.",
            description: "Please try again later.",
            variant: "destructive",
            duration: 5000,
          });
        }

        // // Get response from destrutured array
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

        // setUploadedImages(acceptedFiles);
        console.log("acceptedFiles", acceptedFiles);

        // // Set isFileUploaded to true
        setIsFileUploaded(true);

        //Start polling for file
        // startPolling({ key });

        //refetch new files
        queryClient.invalidateQueries(["images", userData]);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="h-full w-[600px] rounded-lg border border-dashed border-gray-300"
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
                    <p className="text-xs text-zinc-500">
                      Supported file types: jpg, jpeg, png (up to 16MB)
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-zinc-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop your documents.
                    </p>
                    <p className="text-xs text-zinc-500">
                      Supported file types: jpg, jpeg, png (up to 16MB)
                    </p>
                  </>
                )}
              </div>

              {acceptedFiles && !isFileUploaded && (
                <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <FileIcon className="h-4 w-4 text-[#58A053]" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles.map((file) => file.name).join(", ")}
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

export default EditProperty;
