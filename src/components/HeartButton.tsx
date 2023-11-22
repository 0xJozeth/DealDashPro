"use client";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const HeartButton = ({
  user,
  property,
}: {
  user: KindeUser;
  property: Property;
}) => {
  const route = usePathname();
  const [favorite, setFavorite] = React.useState(false);

  const addFavorite: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setFavorite(true);
    try {
      const response = await axios.post(
        `/api/user/${user.id}/property/${property.id}`,
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteFavorite: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.preventDefault();
    setFavorite(false);
    try {
      const response = await axios.delete(
        `/api/user/${user.id}/property/${property.id}`,
      );
      location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      title="heart"
      type="button"
      className="flex"
      onClick={route === "/" ? addFavorite : deleteFavorite}
    >
      {!favorite ? (
        <Heart className="h-3 w-3 text-zinc-600" />
      ) : (
        <HeartFilledIcon className="h-3 w-3 text-red-600" />
      )}
    </button>
  );
};

export default HeartButton;
