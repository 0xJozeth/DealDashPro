import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  PrismaClient,
  Property,
  EnumFavoriteCategory,
  Favorites,
  EnumPopularity,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  const { id: userId } = user;

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const favorite = await db.property.findFirst({
    where: {
      id: userId,
      userId,
    },
  });

  console.log("favorite", favorite);

  if (!favorite) {
    return new Response("Not Found", { status: 404 });
  }

  const body = await req.json();
};
