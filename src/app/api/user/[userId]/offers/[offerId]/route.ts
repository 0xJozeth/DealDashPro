import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string; offerId: string } },
) {
  const { userId, offerId } = params;

  if (!userId || !offerId) {
    return NextResponse.error();
  }

  const offer = await db.offers.findFirst({
    where: {
      id: offerId,
      userId: userId,
    },
  });

  if (!offer) {
    return NextResponse.error();
  }

  return NextResponse.json(offer);
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string; offerId: string } },
) {
  const { userId, offerId } = params;

  if (!userId || !offerId) {
    return NextResponse.error();
  }

  const offer = await db.offers.delete({
    where: {
      id: offerId,
    },
  });
  if (!offer) {
    return NextResponse.error();
  }
  // console.log("params", params);

  return NextResponse.json(offer);
}
