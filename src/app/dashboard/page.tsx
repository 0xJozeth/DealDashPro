"use client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!userLoading && (!user || !user.id)) {
      router.push("/api/auth/login");
    } else if (!userLoading && !draftsLoading) {
      router.push("/dashboard/post-property");
    }
  }, [userLoading, draftsLoading, user, router]);
}

export default Page;
