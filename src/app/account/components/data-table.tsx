"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

interface DataTableProps<
  TData extends { status: string; image: string },
  TValue,
> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  user: KindeUser;
  isAuthenticated: boolean;
}

export function DataTable<
  TData extends { status: string; image: string },
  TValue,
>({
  user,
  isAuthenticated,
  columns,
  data,
}: DataTableProps<TData, TValue> & {
  user: KindeUser;
  isAuthenticated: boolean;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    redirect("/api/auth/login");
  }

  // console.log("table.getHeaderGroups()", table.getHeaderGroups());
  // console.log("table", table);
  // console.log("table original", table.getRowModel().rows[1].original.status);

  return (
    <div className="rounded-[10px] border border-neutral-200">
      <Table>
        {/* ... */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-zinc-100"
              >
                {/* Render the Image component in the first cell */}
                <TableCell key={row.id} className="p-4 text-red-600">
                  <Image
                    src={row.original?.image} // Assuming the property name is "image"
                    alt="Offer Image"
                    width={55}
                    height={55}
                    className="aspect-square rounded-full"
                  />
                </TableCell>
                {row
                  .getVisibleCells()
                  .slice(1)
                  .map((cell) => (
                    <TableCell key={cell.id} className="">
                      {/* Render other cells here */}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
