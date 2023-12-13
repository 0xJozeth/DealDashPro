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

export async function POST(req: NextRequest) {
  console.log("POST hit");
  const json = await req.json();
  console.log("json:", json);

  const created = await db.property.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), {
    status: 201,
  });
}
