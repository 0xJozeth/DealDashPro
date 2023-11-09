"use client";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const HeartButton = ({
  user,
  property,
}: {
  user: KindeUser;
  property: Property;
}) => {
  const [favoriteStatus, setFavoriteStatus] = useState(false);

  const toggleFavorite = async () => {
    try {
      const response = await axios.post(
        `/api/user/${user.id}/property/${property.id}/toggle`,
      );
      setFavoriteStatus(response.data.isFavorited);
      console.log(
        `Property ${
          response.data.isFavorited ? "added to" : "removed from"
        } favorites`,
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      title="heart"
      type="button"
      className="flex"
      onClick={toggleFavorite}
    >
      <Image
        src="/heart-outline.svg"
        width={22}
        height={20}
        alt="heart"
        className="h-full"
      />
    </button>
  );
};

export default HeartButton;
