import { db } from "@/db";
import { EnumPopularity } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const property = await db.property.findMany();
  return NextResponse.json(property);
}

export async function POST(request: Request) {
  const json = await request.json();

  const created = await db.property.create({
    data: json,
  });

  return new NextResponse(JSON.stringify(created), {
    status: 201,
  });
}
