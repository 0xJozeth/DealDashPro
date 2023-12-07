import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

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

  return { user, userId: user.id, offerId: offerId?.id };
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

  const createdFile = await db.document.create({
    data: {
      userId: metadata.userId,
      key: file.key,
      name: file.name,
      url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
      offerId: metadata.offerId,
      uploadStatus: "PROCESSING",
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
const imageMiddleware = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) throw new Error("Unauthorized");
  const propertyId = await db.property.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      images: true,
    },
  });

  return { user, userId: user.id, propertyId: propertyId?.id };
};

const onImageUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof imageMiddleware>>;
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

  if (!metadata.propertyId) {
    throw new Error("propertyId is required");
  }

  console.log("SHOW ME THE metadata", metadata);

  const createdFile = await db.propertyImage.create({
    data: {
      userId: metadata.userId,
      key: file.key,
      name: file.name,
      url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
      propertyId: metadata.propertyId,
      uploadStatus: "PROCESSING",
    },
  });
  try {
    const response = await fetch(
      `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
    );
    await db.propertyImage.update({
      data: {
        uploadStatus: "SUCCESS",
      },
      where: {
        id: createdFile.id,
      },
    });
  } catch (err) {
    await db.propertyImage.update({
      data: {
        uploadStatus: "FAILED",
      },
      where: {
        id: createdFile.id,
      },
    });
  }
};

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 50 } })
    .middleware(imageMiddleware)
    .onUploadComplete(onImageUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// export const ourImageRouter = {
//   pdfUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 50 } })
//     .middleware(middleware)
//     .onUploadComplete(onUploadComplete),
// } satisfies FileRouter;

// export type OurImageRouter = typeof ourImageRouter;
