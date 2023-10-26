import {
  faArrowUpRightFromSquare,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

const DropdownMenuContent = async () => {
  return (
    //check if the user is logged in
    <>
      <Link href="/account">
        <div className="duration-30 flex h-8 w-full items-center justify-start bg-white py-5 transition-all hover:bg-zinc-100">
          <p className="p-3 text-sm font-normal leading-[14px] text-black">
            Favorites
          </p>
        </div>
      </Link>
      <Link href="/account">
        <div className="duration-30 flex h-8 w-full items-center justify-start border-b border-zinc-300 bg-white py-5 transition-all hover:bg-zinc-100">
          <p className="p-3 text-sm font-normal leading-[14px] text-black">
            Account Settings
          </p>
        </div>
      </Link>
      <Link href="#">
        <div className="duration-30 flex h-8 w-full items-center justify-start bg-white py-5 transition-all hover:bg-zinc-100">
          <p className="p-3 text-sm font-normal leading-[14px] text-black">
            Post A Deal
          </p>
        </div>
      </Link>
      <Link href="#">
        <div className="duration-30 flex h-8 w-full items-center justify-start gap-1 bg-white py-5 transition-all hover:bg-zinc-100">
          <p className="p-3 text-sm font-normal leading-[14px] text-black">
            Contact Support
          </p>
          {/* <FontAwesomeIcon icon={faLink} className="none text-sm" /> */}
        </div>
      </Link>
      <LogoutLink>
        <div className="duration-30 flex h-8 w-full items-center justify-start gap-1 bg-white py-5 transition-all hover:bg-zinc-100">
          <p className="p-3 text-sm font-normal leading-[14px] text-black">
            Log Out
          </p>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-sm"
          />
        </div>
      </LogoutLink>
    </>
  );
};

export default DropdownMenuContent;
