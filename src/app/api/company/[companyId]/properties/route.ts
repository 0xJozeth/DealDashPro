import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { companyId: string } },
) {
  const companyId = params.companyId;

  const companies = await db.company.findMany({
    where: {
      id: companyId,
    },
    include: { properties: true },
  });

  return NextResponse.json(companies);
}
