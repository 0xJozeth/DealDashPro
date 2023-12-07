import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function DemoPage() {
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

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
