import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AccountMainContent from "@/app/account/_components/MainContent";
import {
  KindeUser,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";
import AccountOffersSent from "./_components/OffersSent";
// import { EnumStatus } from "@prisma/client";
import { redirect } from "next/navigation";

export interface offerDataProps {
  id: number;
  image: string;
  address: string;
  dateSubmitted: Date;
  offerSubmitted: string;
  // status: EnumStatus;
  cancel: boolean;
  userId: string | null;
}

export type allOffersProps = {
  id: number;
  image: string;
  address: string;
  dateSubmitted: Date;
  offerSubmitted: string;
  status: string;
  cancel: boolean;
  userId: string | null;
};

const AccountSettings = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) return redirect("/auth-callback?origin=dashboard");

  // const favorites = await db.favorites.findMany({
  //   where: {
  //     userId: user?.id,
  //   },
  // });

  return (
    <MaxWidthWrapper className="max-w-[1280px] border border-red-600">
      <div className="m-24 flex flex-col gap-20 border border-red-600">
        <div className="flex flex-col items-center p-2  ">
          <div id="account" className="flex w-full flex-col gap-2 ">
            <h1 className="text-4xl font-bold leading-[30px] text-zinc-950">
              Account
            </h1>
            <p className="text-lg font-normal leading-relaxed text-zinc-950">
              Welcome back,{" "}
              <span className="font-bold">{user?.given_name}.</span>{" "}
            </p>
          </div>
        </div>

        {/* IMPORT CONTENT */}
        {/* <AccountMainContent */}
        {/* user={user} */}
        {/* isAuthenticated={isAuthenticated()} */}
        {/* favorites={favorites} */}
        {/* > */}
        {/* <AccountOffersSent> */}
        {/* <TableDemo allOffers={allOffers} /> */}
        {/* </AccountOffersSent> */}
        {/* </AccountMainContent> */}
      </div>
      <div className="m-24 flex h-24 flex-col gap-20 border border-red-600"></div>
    </MaxWidthWrapper>
  );
};

export default AccountSettings;
