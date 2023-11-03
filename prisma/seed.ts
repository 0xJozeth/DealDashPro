import { PrismaClient, EnumStatus, EnumPopularity } from "@prisma/client";
import { PropertyData } from "./data";
import { v4 as uuidv4 } from "uuid";

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
