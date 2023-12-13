import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    //check if the user is in the database.
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    //if the check fails, add them to the database
    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
    }
    return { success: true };
  }),

  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    return await db.document.findMany({
      where: {
        userId,
      },
    });
  }),

  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log("getFile called with input:", input);
      console.log("ctx:", ctx);

      const { userId } = ctx;

      console.log("userId:", userId);

      const file = await db.document.findFirst({
        where: {
          key: input.key,
          userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      return file;
    }),

  getImage: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log("getFile called with input:", input);
      console.log("ctx:", ctx);

      const { userId } = ctx;

      console.log("userId:", userId);

      const file = await db.propertyImage.findFirst({
        where: {
          key: input.key,
          propertyId: ctx.propertyId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      return file;
    }),

  getFileUploadStatus: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ input, ctx }) => {
      const file = await db.document.findFirst({
        where: {
          id: input.fileId,
          userId: ctx.userId,
        },
      });

      if (!file) return { status: "PENDING" as const };

      return { status: file.uploadStatus };
    }),

  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const file = await db.document.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!document) throw new TRPCError({ code: "NOT_FOUND" });

      await db.document.delete({
        where: {
          id: input.id,
        },
      });

      return document;
    }),

  /* IMAGE UPLOAD LOGIC */
  getUserImages: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    const { propertyId } = ctx;

    return await db.propertyImage.findMany({
      where: {
        // userId,
        propertyId,
      },
    });
  }),

  getImage: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { propertyId } = ctx;

      const image = await db.propertyImage.findFirst({
        where: {
          key: input.key,
          // userId,
          // work in progress
          propertyId,
        },
      });

      if (!image) throw new TRPCError({ code: "NOT_FOUND" });

      return image;
    }),
});

export type AppRouter = typeof appRouter;
