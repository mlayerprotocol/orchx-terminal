import React, { useState } from "react";
import { TypeWriter } from "../typewrite";
import { CopyButton } from "../copy";

interface ChatBoxProps {
  //
  username?: string;
  message: string;
  messageColor?: string;
  className?: string;
  copyText?: boolean;
}
export const ChatBox = ({
  username,
  message,
  messageColor,
  className,
  copyText = false,
}: ChatBoxProps) => {
  const [hasFinishTyping, setHasFinishTyping] = useState(false);
  return (
    <div className="flex flex-col">
      <span className={`${className} flex gap-2 flex-wrap mb-2`}>
        {username != "0xOrchX" && <span>{"> "}</span>}
        {username == "0xOrchX" && <span className="w-2" />}
        <span className="text-[#837E7E]">{username}: </span>
        {"  "}
        <span className="flex gap-2" style={{ color: messageColor }}>
          <span className="w-2 shrink-0" />
          <TypeWriter
            speed={10}
            text={message}
            onFinish={() => {
              setHasFinishTyping(true);
            }}
          />
        </span>
      </span>
      {copyText && hasFinishTyping && (
        <CopyButton className="self-end" text={message} />
      )}
    </div>
  );
};
