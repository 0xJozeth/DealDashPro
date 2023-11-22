import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

// Get request for a specific user's documents
export async function GET(request: Request, params: { userId: string }) {
  const documents = await db.document.findMany({
    where: {
      userId: params.userId,
    },
  });
  return NextResponse.json(documents);
}
