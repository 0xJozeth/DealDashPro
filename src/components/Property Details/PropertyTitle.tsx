import { Property } from "@prisma/client";
import Link from "next/link";

const PropertyTitle = ({ data }: { data: Property }) => {
  return (
    <div className="flex h-auto w-full flex-col py-2">
      <div className="flex h-[1.8rem] items-center py-4">
        <h1 className="text-[26px] font-medium leading-[30px] text-black">
          {data.heading}
        </h1>
      </div>

      <div className="flex h-[.625rem] items-center justify-between py-4">
        <div className="flex h-[.625rem] items-center gap-16">
          <p className="text-sm font-normal leading-tight text-black">
            {data.county}, {data.city}, {data.state}
          </p>
          <Link
            href="#"
            className="text-sm font-normal leading-[18px] text-black underline"
          >
            <p>View full address</p>
          </Link>
        </div>
        <div className="flex h-[.625rem] items-center justify-between">
          <p className="text-sm font-normal leading-[14px] text-neutral-500">
            Deal Posted: {data.createdAt.toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyTitle;
