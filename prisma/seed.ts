import { PrismaClient } from "@prisma/client";
import { Offers, PropertyData, companiesData } from "./data";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.property.createMany({
      data: PropertyData,
    });
    await prisma.offer.createMany({
      data: Offers,
    });
    await prisma.company.createMany({
      data: companiesData,
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
