import { db } from "@/db";
import { Offer, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  const offers: Offer[] = await db.offer.findMany({
    where: {
      userId: userId,
    },
    include: {
      property: true,
    },
  });

  offers.forEach((offer) => {
    if (offer.property) {
      console.log(offer.property.imgSrc);
    } else {
      console.log("No related property");
    }
  });

  return NextResponse.json(offers);
}
