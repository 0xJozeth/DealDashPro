"use client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React from "react";

function Page() {
  const router = useRouter();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/kindeSession");
      console.log("useQuery data", data);
      return (data.user as KindeUser) || [];
    },
  });

  const { data, isLoading: draftsLoading } = useQuery({
    queryKey: ["drafts"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `/api/user/${user?.id}/property/draftProperties`,
        );
        console.log("User's unpublishedProperties", data);
        return (data as Property[]) || [];
      } catch (error) {
        console.error(error);
      }
    },
  });

  // Auth Logic
  if (userLoading || draftsLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.id) {
    return router.push("/api/auth/login");
  }

  // if the user is authenticated, send them to the post property page
  return router.push("/dashboard/post-property");
}

export default Page;
