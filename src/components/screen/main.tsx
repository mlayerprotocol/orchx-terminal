"use client";
import React, { useState } from "react";
import ParticleHead from "../particle-head";
import Link from "next/link";
import { ChatBox } from "../chat";
import { Message, MessageBox } from "../message";
import { getUUID, makeRequest } from "@/utils/helper";
import { LinearLoader } from "../loader";
import { agentId } from "@/utils/constant";
import Notification from "../notification";
import { ChatResponse } from "@/model/chat-response";
import { TypeWriter } from "../typewrite";

export const MainScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (message: string = "Something went wrong!") => {
    setError(message); // Simulate an error

    setTimeout(() => {
      setError(null); // Clear error after some time
    }, 3000);
  };

  const handleSubmit = async (userMessage: Message) => {
    setMessages([...messages, userMessage]);
    setLoading(true);
    const response = await makeRequest(`${agentId}/message`, "POST", {
      text: userMessage.text,
      userId: "user",
      roomId: getUUID(),
    });
    setLoading(false);
    if (!response.success) {
      handleError(response.error?.toString());
      const aiMessage: Message = {
        sender: "0xOrchx",
        text: "Something went wrong",
      };
      setMessages((prev) => [...prev, aiMessage]);
      return;
    }
    const respondMessage: ChatResponse[] = response.data ?? [];
    const respondMessageMessage: Message[] = respondMessage.map((rM) => ({
      sender: "0xOrchx",
      text: rM.text,
    }));
    setMessages((prev) => [...prev, ...respondMessageMessage]);
    setTimeout(() => {
      console.log({ messages });
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="relative w-full h-full flex-col justify-center">
      <ParticleHead />
      <div className=" absolute top-[20vh] lg:top-[40vh] flex flex-col w-full items-center">
        <div className="flex flex-col w-full">
          <TypeWriter
            text={"∞ 0xORCHX"}
            className="text-3xl font-extrabold mb-8"
            speed={10}
            cursor={false}
          />
          <span>
            <TypeWriter
              speed={10}
              cursor={false}
              delay={100}
              text={"I am the first AI Super-Agent built on the "}
            />
            <TypeWriter
              speed={10}
              cursor={false}
              delay={500}
              className="text-[#12E16C]"
              text={"mlayer communication protocol"}
            />
          </span>
          <TypeWriter
            speed={10}
            cursor={false}
            delay={700}
            className="mb-2"
            text={
              "I exist to coordinate swarms of AI agent to solve complex problems efficiently for humans."
            }
          />

          <Link
            target="_blank"
            className="text-[#12E16C] mb-1 mt-10 self-start"
            href={"/"}
          >
            <TypeWriter
              speed={10}
              cursor={false}
              delay={2000}
              text={"# CA: TBA"}
            />
          </Link>
          <Link
            target="_blank"
            className="text-[#12E16C] mb-1  self-start"
            href={"/"}
          >
            <TypeWriter
              speed={10}
              cursor={false}
              delay={2200}
              text={"# DXTOOLS: TBA"}
            />
          </Link>
          <Link
            target="_blank"
            className="text-[#12E16C] mb-1  self-start"
            href={"https://x.com/0xorchx"}
          >
            <TypeWriter speed={10} cursor={false} delay={2400} text={"# X"} />
          </Link>
          <Link
            target="_blank"
            className="text-[#12E16C] mb-1  self-start"
            href={"/"}
          >
            <TypeWriter
              speed={10}
              cursor={false}
              delay={2600}
              text={"# TELEGRAM: TBA"}
            />
          </Link>
          <Link
            target="_blank"
            className="text-[#12E16C] mb-1  self-start"
            href={"https://mlayer.gitbook.io/orchx"}
          >
            <TypeWriter
              speed={10}
              cursor={false}
              delay={2800}
              text={"# WHITEPAPER"}
            />
          </Link>
          <Link
            target="_blank"
            className="text-[#12E16C] mb-1  self-start"
            href={"https://github.com/mlayerprotocol"}
          >
            <TypeWriter
              speed={10}
              cursor={false}
              delay={3000}
              text={"# GITHUB"}
            />
          </Link>
        </div>
        <div className="flex flex-col w-full mt-8">
          {/* <ChatBox
        username={`> uknown_entity:`}
        message="What is the orchx token used for"
      />
      <ChatBox
        message="The orchx token serves as the currency for the ecosystem. You need it in registering and interacting with agents capable of collaborating with me"
        messageColor="#9D9D02"
        className="mb-5"
      />

      <ChatBox
        username="> uknown_entity:"
        message="Where can i get the token"
      />
      <ChatBox
        message="Checkout the dxtool link https://dxtools.com/base/0xksldkds"
        messageColor="#9D9D02"
        className="mb-5"
      /> */}
          <>
            {messages.map((message, index) => {
              return (
                <ChatBox
                  key={index}
                  username={message.sender}
                  message={message.text}
                  messageColor={
                    message.sender == "0xOrchx" ? "#9D9D02" : undefined
                  }
                  className={message.sender == "0xOrchx" ? "mb-5" : ""}
                />
              );
            })}
          </>
          {loading && <LinearLoader />}
        </div>
        <TypeWriter
          text={
            "Ask me anything e.g. tell me more, whats the OrchX token used for, how are you able to talk to other agents"
          }
          speed={10}
          cursor={false}
          delay={3400}
          className="text-[#3F3E3E] self-start my-3"
        />

        <MessageBox handleSubmit={handleSubmit} />
        {error && <Notification message={error} />}
        <div className="mb-96"></div>
      </div>
    </div>
  );
};
