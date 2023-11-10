import { PrismaClient } from "@prisma/client";
import { Offers, PropertyData } from "./data";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.property.createMany({
      data: PropertyData,
    });
    await prisma.offers.createMany({
      data: Offers,
    });
    console.log("Added offer data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
