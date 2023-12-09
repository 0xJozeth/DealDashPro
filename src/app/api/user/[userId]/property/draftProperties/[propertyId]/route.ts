import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string; propertyId: string } },
) {
  const { userId, propertyId } = params;

  const property = await db.property.findUnique({
    where: {
      userId: userId,
      id: propertyId,
    },
    include: {
      images: true,
    },
  });

  if (!property) {
    return NextResponse.json({ message: "Property not found" });
  }

  return NextResponse.json(property);
}
