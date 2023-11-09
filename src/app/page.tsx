import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Card from "@/components/Card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import { db } from "@/db";

export default async function Home() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = getUser();

  const propertyData: Property[] = await db.property.findMany({});

  // console.log("NEW propertyData", propertyData);

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex flex-col items-start justify-center gap-2 p-2">
          <h3 className="mt-14 text-[26px] font-medium leading-[30px] text-zinc-800">
            Featured Properties
          </h3>
          <div id="filterButtonsWrapper" className="flex gap-2">
            <button
              title="sort"
              type="button"
              className="flex rounded-[20px] bg-black p-2 px-3 text-xs font-bold leading-[14px] text-white"
            >
              All 99+
            </button>
            <button
              title="sort"
              type="button"
              className="flex rounded-[20px] border border-zinc-300 bg-white p-2 px-3 text-xs font-bold leading-[14px] text-neutral-500"
            >
              New 99+
            </button>
            <button
              title="sort"
              type="button"
              className="flex rounded-[20px] border border-zinc-300 bg-white p-2 px-3 text-xs font-bold leading-[14px] text-neutral-500"
            >
              Price Change 56
            </button>
          </div>
        </div>
        <section className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-4">
          {propertyData.map((property) => (
            <Card
              key={property.id}
              propertyData={property}
              user={user}
              isAuthenticated
            />
          ))}
        </section>
      </MaxWidthWrapper>
    </>
  );
}
