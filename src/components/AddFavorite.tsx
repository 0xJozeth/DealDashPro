import { db } from "@/db";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { EnumFavoriteCategory, Property, User } from "@prisma/client";

async function AddFavorite({
  user,
  property,
}: {
  user: KindeUser;
  property: Property;
}) {
  // Check if the property is already favorited by the user
  const existingFavorite = await db.favorites.findFirst({
    where: {
      userId: user.id!,
      propertyId: property.id,
    },
  });

  // If the property is not already favorited, add it to favorites
  if (!existingFavorite) {
    await db.favorites.create({
      data: {
        userId: user.id!,
        propertyId: property.id,
        propertyType: "defaultPropertyType", // Provide a default value or fetch from the property object
        favoriteTags: "defaultTags", // Provide a default value or fetch from the property object
        favoriteCategory: EnumFavoriteCategory.LightRenovation, // Provide a default value or fetch from the property object
        // Add other necessary fields like propertyType, favoriteTags, favoriteCategory, lastVisitedDate, etc.
      },
    });
  }

  console.log("I am a server component");

  return null;
}

export default AddFavorite;
