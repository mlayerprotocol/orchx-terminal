import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TypeWriter } from "../typewrite";

export const Footer = () => {
  return (
    <div className="mt-52 mb-8 flex flex-col items-center">
      <div className="flex items-center justify-center flex-wrap gap-4 mb-4">
        <TypeWriter
          text={"POWERED BY "}
          className="text-5xl font-extrabold"
          speed={10}
          delay={9000}
          cursor={false}
        />
        <Link href="/" className="block">
          <div className="relative mx-auto sm:mx-0 w-[160px] lg:w-auto mb-2">
            <Image
              src="/mLAYER-logo-2.png"
              width={209}
              height={46}
              alt="logo"
              className="object-contain"
            />
          </div>
        </Link>
      </div>
      <Link
        href={"https://www.mlayer.network"}
        className="text-purple-600 text-lg mb-10"
      >
        www.mlayer.network
      </Link>
      <Link href={"https://mlayer.gitbook.io/orchx"} className="text-xl mb-4">
        Orch Whitepaper
      </Link>
      <Link
        href={"https://mlayer.gitbook.io/white-paper"}
        className="text-xl mb-4"
      >
        MLayer Whitepaper
      </Link>
      <Link
        href={"https://github.com/orgs/mlayerprotocol"}
        className="text-xl"
      >
        Github
      </Link>
    </div>
  );
};
