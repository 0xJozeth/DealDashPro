"use client";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Property } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { usePathname } from "next/navigation";

const HeartButton = ({
  user,
  property,
}: {
  user: KindeUser;
  property: Property;
}) => {
  const route = usePathname();

  const addFavorite: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
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
