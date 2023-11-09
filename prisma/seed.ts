import { PrismaClient } from "@prisma/client";
import { PropertyData } from "./data";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.property.createMany({
      data: PropertyData,
    });
    console.log("Added property data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
