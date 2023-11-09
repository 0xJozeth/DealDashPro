import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  const favorites = await db.favorite.findMany({
    where: {
      userId: userId,
    },
  });

  // Check all Favorite records & DELETE any that don't have a related Property
  for (const favorite of favorites) {
    const property = await db.property.findUnique({
      where: { id: favorite.propertyId },
    });

    if (!property) {
      await db.favorite.delete({
        where: { id: favorite.id },
      });
    }
  }

  /* First fetch the Favorite records. 
  Then, for each Favorite, fetch the related Property using db.property.findUnique. 
  Combine the Favorite and Property data into a new object, which is included in the response.
  */

  const properties = await Promise.all(
    favorites.map(async (favorite) => {
      return db.property.findUnique({
        where: { id: favorite.propertyId },
      });
    }),
  );

  return NextResponse.json(properties);
}
