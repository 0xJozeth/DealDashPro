import { db } from "@/db";
import { NextResponse } from "next/server";

//CREATE OFFER
export async function POST(
  request: Request,
  { params }: { params: { userId: string; propertyId: string } },
) {
  const { userId, propertyId } = params;
  const offerDetails = await request.json();

  console.log("offerDetails", offerDetails);

  const newOffer = await db.offer.create({
    data: {
      ...offerDetails,
      userId: userId,
      propertyId: propertyId,
    },
  });

  return NextResponse.json(newOffer);
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string; propertyId: string } },
) {
  const { userId, propertyId } = params;

  const offer = await db.offer.findFirst({
    where: {
      userId: userId,
      propertyId: propertyId,
    },
  });

  return NextResponse.json(offer);
}

//UPDATE OFFER
export async function PATCH(
  request: Request,
  { params }: { params: { userId: string; propertyId: string } },
) {
  const { userId, propertyId } = params;
  const updatedOfferDetails = await request.json();

  // Fetch the offer first
  const offerDetails = await db.offer.findFirst({
    where: {
      userId: userId,
      propertyId: propertyId,
    },
  });

  console.log("updatedOfferDetails", offerDetails);

  if (!offerDetails) {
    return NextResponse.error();
  }

  const updatedOffer = await db.offer.update({
    where: {
      id: offerDetails.id,
      userId: userId,
      propertyId: propertyId,
    },
    data: updatedOfferDetails,
  });

  return NextResponse.json(updatedOffer);
}

// DELETE OFFER
export async function DELETE(
  request: Request,
  { params }: { params: { userId: string; propertyId: string } },
) {
  const { userId, propertyId } = params;

  // Fetch the offer first, instantiate a variable to hold the offer
  const offerDetails = await db.offer.findFirst({
    where: {
      userId: userId,
      propertyId: propertyId,
    },
  });

  console.log("offerDetails", offerDetails);

  if (!offerDetails) {
    return NextResponse.error();
  }

  console.log("offerDetails.id", offerDetails.id);
  const deletedOffer = await db.offer.delete({
    where: {
      id: offerDetails.id,
      userId: userId,
      propertyId: propertyId,
    },
  });

  return NextResponse.json(deletedOffer);
}
