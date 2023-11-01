import { PrismaClient, EnumStatus } from "@prisma/client";
import { FavoritesData, OfferData } from './data';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.favorites.createMany({
      data: FavoritesData,
    });
    console.log("Added favorites data");
    await prisma.offersSent.createMany({
      data: OfferData,
    });
    console.log("Added favorites data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
