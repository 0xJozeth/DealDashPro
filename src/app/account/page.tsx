
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AccountMainContent from "@/app/account/components/MainContent";
import {
  KindeUser,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from '@/db';
import AccountOffersSent from './components/OffersSent';
import { TableDemo } from './components/data-table';
import { EnumStatus } from '@prisma/client';
import { redirect } from 'next/navigation';
import { FavoritesDataProps } from '../../../prisma/data';

export interface offerDataProps {
    id: number;
    image: string;
    address: string;
    dateSubmitted: Date;
    offerSubmitted: string;
    status: EnumStatus;
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
  }

const AccountSettings = async () => {
  //Step 1: Get the current user
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = getUser();
  
  //Step 2: Redirect if not logged in
  if (!user || !user.id) return redirect('/auth-callback?origin=dashboard');
  
  //Step 3: Get all offers "where" the UserId of the OffersSent matches the current user's id
    const allOffers = await db.offersSent.findMany({
      where: {
        userId: user.id,
      },
    })
   
    
  //Step 4: Get all favorites "where" the UserId of the Favorites matches the current user's id
  const favorites = await db.favorites.findMany({
    where: {
      userId: user?.id
    }
  })

  return (
    <MaxWidthWrapper className="max-w-[1280px]">
      <div className="m-24 flex flex-col gap-20 ">
        <div className="flex flex-col items-center p-2  ">
          <div id="account" className="flex w-full flex-col gap-2 ">
            <h1 className="text-4xl font-bold leading-[30px] text-zinc-950">
              Account 
            </h1>
            <p className="text-lg font-normal leading-relaxed text-zinc-950">Welcome back, 
              {' '}<span className="font-bold">{user?.given_name}.</span> {' '}
              {/* {data?.email} */}
              {user?.email}
            </p>
          </div>
        </div>

        {/* IMPORT CONTENT */}
        <AccountMainContent user={user} isAuthenticated={isAuthenticated()} favorites={favorites}>
          <AccountOffersSent>
            <TableDemo allOffers={allOffers}/>
          </AccountOffersSent>
        </AccountMainContent>
      </div>
    </MaxWidthWrapper>
  );
};

export default AccountSettings;
