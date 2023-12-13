import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const property = await db.property.findMany({
    where: {
      published: true, // Check if the property is published
    },
    include: {
      images: true,
    },
  });
  return NextResponse.json(property);
}
