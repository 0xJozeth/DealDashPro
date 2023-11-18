// import { db } from "@/db";
import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  const offers = await db.offer.findMany({
    where: {
      userId: userId,
    },
  });

  return NextResponse.json(offers);
}

// TODO: CHANGE THIS TO SIMPLY LOOK THROUGH ALL OFFERS
