import React from "react";
import { TypeWriter } from "../typewrite";

interface ChatBoxProps {
  //
  username?: string;
  message: string;
  messageColor?: string;
  className?: string;
}
export const ChatBox = ({
  username,
  message,
  messageColor,
  className,
}: ChatBoxProps) => {
  return (
    <span className={`${className} flex gap-2 flex-wrap mb-2`}>
      {username != "0xOrchx" && <span>{"> "}</span>}
      {username == "0xOrchx" && <span className="w-2" />}
      <span className="text-[#837E7E]">{username}: </span>
      {"  "}
      <span className="flex gap-2" style={{ color: messageColor }}>
        <span className="w-2 shrink-0" />
        <TypeWriter speed={10} text={message} />
      </span>
    </span>
  );
};
