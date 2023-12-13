import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { usePropertyIdStore } from "@/store/store";
import { usePropertyId } from "@/utils/usePropertyId";

const f = createUploadthing();

const middleware = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) throw new Error("Unauthorized");

  const offerId = await db.offer.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      documents: true,
    },
  });

  return {
    user,
    userId: user.id,
    offerId: offerId?.id,
    propertyId: offerId?.propertyId,
  };
};

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  // Check if document already exists and return early if it does
  const isFileExist = await db.document.findFirst({
    where: {
      key: file.key,
    },
  });

  if (isFileExist) return;
  if (!metadata.propertyId) {
    throw new Error("Property ID is required");
  }

  const createdFile = await db.document.create({
    data: {
      userId: metadata.userId,
      key: file.key,
      name: file.name,
      url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
      offerId: metadata.offerId,
      uploadStatus: "PROCESSING",
      propertyId: metadata.propertyId,
    },
  });
  try {
    const response = await fetch(
      `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
    );
    await db.document.update({
      data: {
        uploadStatus: "SUCCESS",
      },
      where: {
        id: createdFile.id,
      },
    });
  } catch (err) {
    await db.document.update({
      data: {
        uploadStatus: "FAILED",
      },
      where: {
        id: createdFile.id,
      },
    });
  }
};

{
  /* IMAGE UPLOAD LOGIC */
}

const ImageMiddleware = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) throw new Error("Unauthorized");

  const property = await db.property.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { user, userId: user.id, property };
};

const onImageUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof ImageMiddleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  // Check if image already exists and return early if it does
  const isFileExist = await db.propertyImage.findFirst({
    where: {
      key: file.key,
    },
  });

  if (isFileExist) return;

  // Check if propertyId exists and return early if it does not

  if (!metadata.property) {
    throw new Error("propertyId is required");
  }

  const createdFile = await db.propertyImage.create({
    data: {
      userId: metadata.userId,
      key: file.key,
      name: file.name,
      url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
      propertyId: metadata.property.id,
      uploadStatus: "PROCESSING",
    },
  });

  // try {
  //   const response = await fetch(
  //     `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
  //   );
  // } catch (err) {
  //   console.error("Error fetching file:", err);
  //   // Handle error
  // }

  if (!createdFile) {
    throw new Error("Error creating property image");
  }

  try {
    await db.propertyImage.update({
      data: {
        uploadStatus: "SUCCESS",
      },
      where: {
        id: createdFile.id,
      },
    });
  } catch (err) {
    console.error("Error updating property image:", err);
    // Handle error
  }

  console.log("metadata.property:", metadata.property);

  // Update the property's featuredImage
  await db.property.update({
    where: { id: metadata.property.id },
    data: { featuredImage: createdFile.url },
  });
};

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 50 } })
    .middleware(ImageMiddleware)
    .onUploadComplete(onImageUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
