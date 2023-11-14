import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const offer = await db.offer.findMany({});

  if (!offer) {
    return NextResponse.error();
  }

  return NextResponse.json(offer);
}
