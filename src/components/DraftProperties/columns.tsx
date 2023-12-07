"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Property } from "@prisma/client";

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "heading",
    header: "Heading",
  },
  {
    accessorKey: "address1",
    header: "Address",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
];
