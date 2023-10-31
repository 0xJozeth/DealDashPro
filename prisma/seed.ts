import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.propertyDetails.create({
      data: {
        id: 1,
        image: "/prop1.png",
        address: "645 Parkwood St, Jacksonville, FL 32207",
        dateSubmitted: "1/1/2022",
        offerSubmitted: "$224,000",
        status: "Pending",
        cancel: false,
      },
    });
    console.log("Added property details data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
