import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const favorites = await db.favorites.findMany({
    where: {
      userId: params.id,
    },
  });
  return NextResponse.json(favorites);
}
