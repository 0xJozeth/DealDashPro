import { db } from "@/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string; documentId: string } },
) {
  const { userId, documentId } = params;

  console.log(
    "DELETE function called for user/[userId]/documents/[documentId]/route.ts",
  );

  if (!userId || !documentId) {
    return NextResponse.error();
  }

  try {
    const document = await db.document.delete({
      where: {
        id: documentId,
      },
    });
    return NextResponse.json(document);
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.error();
  }
}

// export async function DELETE(
//   request: Request,
//   { params }: { params: { userId: string; offerId: string } },
// ) {
//   const { userId, offerId } = params;

//   if (!userId || !offerId) {
//     return NextResponse.error();
//   }

//   const offer = await db.offer.delete({
//     where: {
//       id: offerId,
//     },
//   });
//   if (!offer) {
//     return NextResponse.error();
//   }
//   // console.log("params", params);

//   return NextResponse.json(offer);
// }
