import { db } from "@/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { userId: string; propertyId: string } },
) {
  const { userId, propertyId } = params;

  const newFavorite = await db.favorite.create({
    data: {
      userId: userId,
      propertyId: propertyId,
    },
  });

  return NextResponse.json(newFavorite);
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string; propertyId: string } },
) {
  const { userId, propertyId } = params;

  const favorite = await db.favorite.findFirst({
    where: {
      userId: userId,
      propertyId: propertyId,
    },
    include: {
      property: true,
    },
  });

  if (!favorite) {
    return NextResponse.json({ message: "Favorite not found" });
  }

  if (!favorite.property) {
    return NextResponse.json({ message: "Property not found" });
  }

  return NextResponse.json(favorite);
}

export async function PATCH(
  request: Request,
  {
    params,
    body,
  }: { params: { userId: string; propertyId: string }; body: any },
) {
  const { userId, propertyId } = params;

  const updatedFavorite = await db.favorite.update({
    where: {
      userId_propertyId: {
        userId: userId,
        propertyId: propertyId,
      },
    },
    data: body,
  });

  return NextResponse.json(updatedFavorite);
}

export async function PUT(
  request: Request,
  {
    params,
    body,
  }: { params: { userId: string; propertyId: string }; body: any },
) {
  const { userId, propertyId } = params;

  // First, delete the existing favorite
  await db.favorite.delete({
    where: {
      userId_propertyId: {
        userId: userId,
        propertyId: propertyId,
      },
    },
  });

  // Then, create a new favorite with the new data
  const newFavorite = await db.favorite.create({
    data: {
      userId: userId,
      propertyId: propertyId,
      ...body,
    },
  });

  return NextResponse.json(newFavorite);
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string; propertyId: string } },
) {
  const { userId, propertyId } = params;

  const deletedFavorite = await db.favorite.delete({
    where: {
      userId_propertyId: {
        userId: userId,
        propertyId: propertyId,
      },
    },
  });

  return NextResponse.json(deletedFavorite);
}
