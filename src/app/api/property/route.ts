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
  console.log("property:", property);
  return NextResponse.json(property);
}

export async function POST(request: Request) {
  console.log("POST hit");
  const json = await request.json();
  console.log("json:", json);

  const created = await db.property.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), {
    status: 201,
  });
}
