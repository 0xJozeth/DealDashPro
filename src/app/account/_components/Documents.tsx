import { trpc } from "@/app/_trpc/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import {
  KindeUser,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { get } from "http";
import { CheckCircle, Cloud, Delete, File, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { set } from "zod";

type Document = {
  id: string;
  name: string;
  url: string;
  // add other properties as needed
};

function AccountDocuments() {
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/kindeSession");
      // Check if there is a user id else return
      if (!data.user.id) {
        return;
      }

      setUserId(data.user.id);
      const userId = data.user.id;
      return data.user.id as KindeUser;
    },
  });

  const { data: documents, isLoading: documentsLoading } = useQuery({
    queryKey: ["documents", user],
    queryFn: async () => {
      // const userId = user?.id;
      const { data } = await axios.get(`/api/user/${userId}/documents`);
      return data;
    },
  });

  const HandleDocumentDelete = async (documentId: string) => {
    if (!userId || userLoading) {
      // userId is undefined, handle this case as needed
      console.error("User ID is undefined");
      return;
    }
    const res = await axios.delete(
      `/api/user/${userId}/documents/${documentId}`,
    );
    // After a successful deletion, invalidate the 'documents' query
    queryClient.invalidateQueries(["documents", user]);
  };

  return (
    <MaxWidthWrapper>
      <section className="m-4 flex flex-col gap-4">
        <h3 className="mt-20  text-[26px] font-medium leading-[30px] text-black">
          Documents
        </h3>
        {!documentsLoading && documents.length <= 0 ? (
          <h2 className="text-base font-semibold leading-tight text-zinc-400">
            Your uploaded documents will appear here.
          </h2>
        ) : (
          <h2 className="text-base font-semibold leading-tight text-black">
            Uploaded Documents
          </h2>
        )}

        <div className="flex w-fit flex-col justify-start gap-4">
          {documentsLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
          {documents &&
            !documentsLoading &&
            documents.map((document: Document) => (
              <div
                key={document.id}
                className="flex items-center justify-start gap-4 hover:underline"
              >
                <a
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  {document.name}
                </a>
                {userLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <div>
                    <Delete
                      className="h-4 w-4 text-red-500"
                      onClick={() => HandleDocumentDelete(document.id)}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>

        <UploadDropZone />
      </section>
    </MaxWidthWrapper>
  );
}

type NextStepFunction = () => void;

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
  const { startUpload } = useUploadThing("pdfUploader");

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
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

        // // Set isFileUploaded to true
        setIsFileUploaded(true);

        //Start polling for file
        startPolling({ key });

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

export default AccountDocuments;
