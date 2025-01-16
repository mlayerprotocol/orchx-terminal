"use client";
import React, { useEffect, useRef, useState } from "react";

export interface Message {
  sender: "uknown_entity" | "0xOrchx";
  text: string;
}

interface MessageBoxProps {
  handleSubmit: (message: Message) => void;
}

export const MessageBox: React.FC<MessageBoxProps> = (
  props: MessageBoxProps
) => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInterval(() => {
      inputRef.current?.focus();
    }, 4000);
  }, []);

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage: Message = { sender: "uknown_entity", text: input };
    props.handleSubmit(userMessage);
    setInput("");
  };

  return (
    <div className="flex w-full gap-1 items-center">
      <span>{">"}</span>
      <input
        type="text"
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            event.preventDefault(); // Prevent default form submission if needed
            handleSend();
            // document.getElementById("myForm").submit(); // Submit the form programmatically
          }
        }}
        className="flex-1 p-2 rounded-lg focus:outline-none bg-transparent"
      />
    </div>
  );
};
