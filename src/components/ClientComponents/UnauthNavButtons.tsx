import Link from "next/link";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const UnauthNavButtons = () => {
  //check if the user is logged in
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <div className="flex items-center justify-between gap-6">
      <RegisterLink>
        <div className="duration-30 flex h-11 w-24 items-center justify-center rounded-[10px] border border-black bg-white py-5 transition-all hover:bg-zinc-100">
          <p className="text-sm font-normal leading-normal text-black">
            Sign Up
          </p>
        </div>
      </RegisterLink>
      <LoginLink>
        <div className="duration-30 flex h-11 w-24 items-center justify-center  rounded-[10px] bg-[#58A053] py-5 transition-all hover:bg-[#4D8C49]">
          <p className="text-sm font-normal leading-normal text-white">Login</p>
        </div>
      </LoginLink>
    </div>
    // <Image
    // 	src={
    // 		'https://lh3.googleusercontent.com/a/ACg8ocK7iPDJ2sXN4zD7ZzK_nej3XZKTNewNPkbpde64c8bX=s96-c'
    // 	}
    // 	width={225}
    // 	height={225}
    // 	alt={'logo'}
    // 	className='p-2'
    // />
  );
};

export default UnauthNavButtons;
