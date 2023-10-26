"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/" && (
        <div className="flex h-[184px] w-full items-center justify-center bg-gray-200">
          <MaxWidthWrapper>
            <div
              id="footerOuterWrapper"
              className="flex w-full flex-col items-center gap-4 py-4"
            >
              <div
                id="footerInnerWrapper"
                className="flex w-full items-center justify-between border-b border-neutral-500"
              >
                <Link href="/">
                  <Image
                    src={"/ddpBlack.svg"}
                    width={225}
                    height={35}
                    alt={"logo"}
                    className="p-2"
                  />
                </Link>

                <Link href="#" id="legalese">
                  <div className="flex w-[219px] items-center justify-between">
                    <p className="text-sm font-normal leading-[14px] text-black">
                      Privacy Policy
                    </p>
                    <p className="text-sm font-normal leading-[14px] text-black">
                      {" "}
                      {" • "}{" "}
                    </p>
                    <p className="text-sm font-normal leading-[14px] text-black">
                      Terms of service
                    </p>
                  </div>
                </Link>

                <Link href="#" id="contact">
                  <div className="flex w-[219px] items-center gap-x-1">
                    <p className="text-sm font-normal leading-[14px] text-black">
                      {/* insert email icon */}@
                    </p>
                    <p className="text-sm font-normal leading-[14px] text-black">
                      Contact Support
                    </p>
                  </div>
                </Link>

                <Link href="#" id="socialLinks">
                  <div className="flex w-[219px] items-center justify-between">
                    <p className="text-sm font-normal leading-[14px] text-black">
                      Facebook
                    </p>
                    <p className="text-sm font-normal leading-[14px] text-black">
                      Instagram
                    </p>
                    <p className="text-sm font-normal leading-[14px] text-black">
                      Twitter
                    </p>
                    <p className="text-sm font-normal leading-[14px] text-black">
                      TikTok
                    </p>
                    <p className="text-sm font-normal leading-[14px] text-black">
                      Youtube
                    </p>
                    <p className="text-sm font-normal leading-[14px] text-black">
                      LinkedIn
                    </p>
                  </div>
                </Link>
              </div>
              <div
                id="footerBelow"
                className="flex w-full items-center justify-center "
              >
                <p className="text-sm font-normal leading-[14px] text-black">
                  © {new Date().getFullYear()} DealDashPro. All Rights
                  Reserved.
                </p>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      )}
    </>
  );
};

export default Footer;
