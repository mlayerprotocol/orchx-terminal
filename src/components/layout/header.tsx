import React from "react";
import Link from "next/link";


export const Header = () => {
  return (
    <div
      className={`absolute top-0 flex flex-wrap w-full justify-between items-start`}
    >
      <img src={"/logo-black.png"} className="w-16 lg:w-20 " alt="" />
      <div className="flex flex-col gap-4">
        <Link
          target="_blank"
          className="text-[#12E16C] mb-1  self-start"
          href={"https://x.com/0xorchx"}
        >
          <img src={"/x.svg"} className="w-4 lg:w-5 invert" alt="" />
        </Link>

        <Link
          target="_blank"
          className="text-[#12E16C] mb-1  self-start"
          href={"https://t.me/mlayerprotocol"}
        >
          <img src={"/telegram.svg"} className="w-4 lg:w-5 invert" alt="" />
        </Link>

        <Link
          target="_blank"
          className="text-[#12E16C] mb-1  self-start"
          href={"https://mlayer.gitbook.io/orchx"}
        >
          <img src={"/gitbook.svg"} className="w-4 lg:w-5" alt="" />
        </Link>

        <Link
          target="_blank"
          className="text-[#12E16C] mb-1  self-start"
          href={"https://github.com/orgs/mlayerprotocol"}
        >
          <img src={"/github.svg"} className="w-4 lg:w-5 invert" alt="" />
        </Link>
      </div>
    </div>
  );
};
