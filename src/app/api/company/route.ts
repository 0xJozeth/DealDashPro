import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const companies = await db.company.findMany();

  return NextResponse.json(companies);
}
