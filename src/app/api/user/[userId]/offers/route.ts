import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const offer = await db.offers.findMany({
    where: {
      id: id,
    },
  });
  return NextResponse.json(offer);
}
