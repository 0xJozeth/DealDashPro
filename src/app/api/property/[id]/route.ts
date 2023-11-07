import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const property = await db.property.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(property);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const json = await request.json();

  const updated = await db.property.update({
    where: {
      id: id,
    },
    data: json,
  });
  return NextResponse.json(updated);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const json = await request.json();

  const updated = await db.property.update({
    where: {
      id: id,
    },
    data: json,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
  const id = params.id;
  const deleted = await db.property.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}
