import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    file,
    params,
  }: {
    params: { userId: string; propertyId: string };
    file: { key: string; name: string; url: string };
  },
) {
  const { userId, propertyId } = params;

  try {
    const propertyImage = await db.propertyImage.create({
      data: {
        userId: userId,
        propertyId: propertyId,
        // url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
        // key: file
        // name: file.name,
        // uploadStatus: "PROCESSING",
      },
    });

    if (!propertyImage) {
      return NextResponse.json({ message: "Property image not found" });
    }

    return NextResponse.json(propertyImage);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "An error occurred while uploading the image",
    });
  }
}
