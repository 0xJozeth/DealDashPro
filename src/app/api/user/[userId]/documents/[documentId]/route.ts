import { db } from "@/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string; documentId: string } },
) {
  const { userId, documentId } = params;

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

// }
