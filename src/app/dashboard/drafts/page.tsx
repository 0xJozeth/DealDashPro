"use client";

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";

import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import { DataTable } from "@/components/DraftProperties/data-table";
import { columns } from "@/components/DraftProperties/columns";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

function PropertyDrafts() {
  const { toast } = useToast();

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
    return redirect("/auth-callback?origin=dashboard");
  }

  return (
    <div className="flex gap-8">
      <div className="relative flex h-auto min-h-screen w-[300px] flex-col gap-4 bg-blue-900/90">
        <div className="relative mx-auto my-36 flex h-[500px] flex-col justify-evenly gap-4">
          <Link
            href="/dashboard/post-property"
            prefetch={false}
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

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data || []} />
      </div>
    </div>
  );
}

export default PropertyDrafts;
