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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface DataTableProps<
  TData extends { status: string; image: string },
  TValue,
> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  user: KindeUser;
  isAuthenticated: boolean;
}

// export function DataTable<
//   TData extends { status: string; image: string },
//   TValue,
// >({
//   user,
//   isAuthenticated,
//   columns,
//   data,
// }: DataTableProps<TData, TValue> & {
//   user: KindeUser;
//   isAuthenticated: boolean;
// }) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   // Redirect if not authenticated
//   if (!isAuthenticated) {
//     redirect("/api/auth/login");
//   }

//   // console.log("table.getHeaderGroups()", table.getHeaderGroups());
//   // console.log("table", table);
//   // console.log("table original", table.getRowModel().rows[1].original.status);

//   return (
//     <div className="rounded-[10px] border border-neutral-200">
//       <Table>
//         {/* ... */}
//         <TableHeader>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow className="" key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <TableHead key={header.id} className="">
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                   </TableHead>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && "selected"}
//                 className="hover:bg-zinc-100"
//               >
//                 {/* Render the Image component in the first cell */}
//                 <TableCell key={row.id} className="p-4 text-red-600">
//                   <Image
//                     src={row.original?.image} // Assuming the property name is "image"
//                     alt="Offer Image"
//                     width={55}
//                     height={55}
//                     className="aspect-square rounded-full"
//                   />
//                 </TableCell>
//                 {row
//                   .getVisibleCells()
//                   .slice(1)
//                   .map((cell) => (
//                     <TableCell key={cell.id} className="">
//                       {/* Render other cells here */}
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext(),
//                       )}
//                     </TableCell>
//                   ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-24 text-center">
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

export type OfferData = {
  id: number;
  image: string;
  address: string;
  dateSubmitted: string;
  offerSubmitted: string;
  status: "Accepted" | "Pending" | "Denied";
  cancel: string;
};

export const OfferData: OfferData[] = [
  {
    id: 1,
    image: "/prop1.png",
    address: "645 Parkwood St, Jacksonville, FL 32207",
    dateSubmitted: "1/1/2022",
    offerSubmitted: "$224,000",
    status: "Pending",
    cancel: "display an x here",
  },
  {
    id: 2,
    image: "/prop2.png",
    address: "4078 Spring Park Cir, Jacksonville, FL 32207",
    dateSubmitted: "1/1/2022",
    offerSubmitted: "$156,000",
    status: "Accepted",
    cancel: "display an x here",
  },
  {
    id: 3,
    image: "/prop3.png",
    address: "4078 Spring Park Cir, Jacksonville, FL 32207",
    dateSubmitted: "1/1/2022",
    offerSubmitted: "$70,000",
    status: "Denied",
    cancel: "display an x here",
  },
];

function getStatusColorClass(status: string): {
  bgColor: string;
  textColor: string;
} {
  switch (status) {
    case "Accepted":
      return { bgColor: "bg-[#58a053]", textColor: "text-white" };
    case "Pending":
      return { bgColor: "bg-[#de7616]", textColor: "text-white" };
    case "Denied":
      return { bgColor: "bg-[#de1616]", textColor: "text-white" };
    default:
      return { bgColor: "", textColor: "" };
  }
}

export function TableDemo() {
  const handleCancel = (id: number) => {
    // Handle cancel logic
    OfferData.pop();
    console.log("id", id);
  };

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow className="">
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Address</TableHead>
          <TableHead className="text-center">Date Submitted</TableHead>
          <TableHead>Offer Submitted</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Cancel</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {OfferData.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium">
              <Image
                src={data.image} // Assuming the property name is "image"
                alt="Offer Image"
                width={55}
                height={55}
                className="aspect-square rounded-full"
              />
            </TableCell>
            <TableCell className="hover:text-blue-300 hover:underline">
              <Link href={`/property-details/${data.id}`}>{data.address}</Link>
            </TableCell>
            <TableCell className="text-center">{data.dateSubmitted}</TableCell>
            <TableCell className="text-center">{data.offerSubmitted}</TableCell>
            <TableCell className="text-center">
              <div
                className={`${
                  getStatusColorClass(data.status as string).bgColor
                } ${
                  getStatusColorClass(data.status as string).textColor
                } flex items-center justify-center rounded-[20px] bg-green-500 p-1`}
              >
                {data.status}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <button
                title="Cancel"
                type="button"
                className="flex w-full items-center justify-center"
                onClick={() => handleCancel(data.id)}
              >
                <FontAwesomeIcon
                  icon={faClose}
                  className="text-sm text-[#6f7070]"
                />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
