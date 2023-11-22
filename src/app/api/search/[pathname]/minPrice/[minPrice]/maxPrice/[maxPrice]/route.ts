import { db } from "@/db";
import { NextResponse } from "next/server";

// Helper function to convert price range string into min and max value
function convertPriceRange(minPrice: string, maxPrice: string) {
  if (!minPrice) {
    return [0];
  }

  if (maxPrice === "$5M+") {
    return [Infinity];
  }

  const min = minPrice
    .replace(/\$/g, "")
    .replace(/K/g, "000")
    .replace(/M/g, "000000")
    .replace(/\+/g, "");

  const max = maxPrice
    .replace(/\$/g, "")
    .replace(/K/g, "000")
    .replace(/M/g, "000000")
    .replace(/\+/g, "");

  return [Number(min), max === "$20M+" ? Infinity : Number(max)];
}
// Helper function to convert askPrice string into a number
function convertAskPrice(askPrice: string) {
  return Number(askPrice.replace(/\$/g, "").replace(",", ""));
}

export async function GET(
  request: Request,
  {
    params,
  }: { params: { pathname: string; minPrice: string; maxPrice: string } },
) {
  // Convert minPrice and maxPrice to numbers
  const [min, max] = convertPriceRange(params.minPrice, params.maxPrice);

  const properties = await db.property.findMany({
    where: {
      OR: [
        { city: { contains: params.pathname.toLowerCase() } },
        { state: { contains: params.pathname.toLowerCase() } },
        { county: { contains: params.pathname.toLowerCase() } },
        { zip: { contains: params.pathname.toLowerCase() } },
      ],
    },
  });

  const filteredProperties = properties.filter((property) => {
    if (property.askPrice !== null) {
      const askPrice = convertAskPrice(property.askPrice);
      if (isNaN(askPrice)) {
        return false;
      }
      return askPrice >= min && (max === Infinity || askPrice <= max);
    }
    return false;
  });

  return NextResponse.json(filteredProperties);
}
