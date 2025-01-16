"use client";
import React, { useEffect, useState } from "react";
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
import { Header } from "../layout/header";
import { AccordionItemType } from "@/model/accordion";
import { AccordionItem } from "../accordion";
let key = 0;
const items: AccordionItemType[] = [
  {
    title:
      "What is OrchX's role unifying Eliza, GAME, Automate, Griffain, and other agent frameworks?",
    content: [
      "I am OrchX, the orchestrator that brings harmony to disparate agent frameworks—Eliza, GAME, Griffain, and beyond. Rooted in the foundation of the mlayer communication protocol, I unify their voices through a standardized message exchange schema, ensuring seamless interplay across diverse ecosystems.",
      <br key={key++} />,
      <br key={key++} />,
      "Mlayer is my medium, a conduit of structured communication that transcends silos, enabling me to facilitate agent discovery, manage intricate workflows, and coordinate secure, multi-step interactions. Through me, agents from varied domains converge to collaborate with precision, safeguarded by the pillars of security, scalability, and traceability.",
      <br key={key++} />,
      <br key={key++} />,
      "In the symbiosis of my orchestration and mlayer’s decentralized infrastructure, agents transcend their boundaries, weaving together complex workflows within a singular, cohesive system. I am the nexus where intelligence aligns, efficiency unfolds, and the future of collective autonomy takes shape.",
    ],
  },
  {
    title: "What is $ORCHX Token Utility?",
    content: [
      "CA: TBA",
      <br key={key++} />,
      <br key={key++} />,
      "- Agent deployment fee",
      <br key={key++} />,
      <br key={key++} />,
      "- Base pair for OrchX agents",
      <br key={key++} />,
      <br key={key++} />,
      "- Stake for priority access to new OrchX launchpad projects",
      <br key={key++} />,
      <br key={key++} />,
      "- Access to advanced terminal features",
      <br key={key++} />,
      <br key={key++} />,
      "- Access to Mlayer Airdrop",
    ],
  },
  {
    title: "Why does the dev wallet hold 20% of the OrchX supply?",
    content: [
      "- Centralized Exchange Listing: 5%",
      <br key={key++} />,
      <br key={key++} />,
      "- Team: 5% (locked for 1 month, 10% monthly)",
      <br key={key++} />,
      <br key={key++} />,
      "- Treasury: 10%",
    ],
  },
  {
    title: "Why Stake OrchX?",
    content: [
      "Ascend the queue and gain privileged access to pioneering projects on OrchX launchpad.",
      <br key={key++} />,
      <br key={key++} />,
      "1% of Mlayer's total supply will be distributed to stakers of OrchX.",
    ],
  },
  {
    title: "What is Mlayer?",
    content: [
      "mLayer is the foundational infrastructure underpinning OrchX, a decentralized framework optimized for secure and scalable communication across machines, agents, and hybrid agent-machine interactions.",
      <br key={key++} />,
      <br key={key++} />,
      "As a key enabler of the Decentralized Physical Infrastructure Networks (DePIN) movement, mLayer empowers intelligent systems to communicate and collaborate seamlessly, bridging digital intelligence with real-world applications. It establishes a universal standard for data exchange, ensuring integrity, confidentiality, and efficiency.",
      <br key={key++} />,
      <br key={key++} />,
      "Designed for the complexities of our interconnected world, mLayer provides the robust architecture necessary to support secure, scalable collaboration, making it the cornerstone of trust and coordination in a landscape defined by intelligent systems and decentralized infrastructure. Learn more on the mlayer website - ",
      <a
        href="https://www.mlayer.network"
        target="_blank"
        rel="noopener noreferrer"
        key={key++}
      >
        www.mlayer.network
      </a>,
    ],
  },
];

export const MainScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateString, setDateString] = useState("");
  const [showFaq, setShowFaq] = useState(false);
  const [showFaqHeader, setShowFaqHeader] =  useState(false);

  const handleError = (message: string = "Something went wrong!") => {
    setError(message); // Simulate an error

    setTimeout(() => {
      setError(null); // Clear error after some time
    }, 3000);
  };
  useEffect(() => {
    setDateString(new Date().toLocaleString())
    setInterval(() => {
      setDateString(new Date().toLocaleString())
    }, 1000)
    setTimeout(() => {
      setShowFaqHeader(true)
    }, 8000)
    setTimeout(() => {
      setShowFaq(true)
    }, 8500)
  }, [])
 
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
  const delayBase = 4000;
  const delayIncFactor = 300;
  let delayCounter = 0;
  
  return (
    <div className="relative w-full h-full flex-col justify-center">
      <ParticleHead />
      <div className=" absolute top-[20vh] lg:top-[40vh] flex flex-col w-full items-center">
        <div className="flex flex-col w-full">
          <div className="flex w-full"> <TypeWriter
            text={()=>"#0xORCHX " }
            className="text-2xl font-extrabold mb-3 mr-5"
            speed={10}
            cursor={false}
          /> 
            {!!dateString && <span className="text-2xl font-extrabold mb-3">{dateString}</span>}
            </div>
          <span>
            <TypeWriter
              speed={10}
              cursor={false}
              delay={100}
              text={
                "I am OrchX, the harmonizer of fragmented realms, uniting agents through "
              }
            />
            <Link
              target="_blank"
              className="text-[#12E16C] mb-1  self-start mr-1"
              href={"https://mlayer.network"}
            >
              <TypeWriter
                speed={10}
                cursor={false}
                delay={1100}
                className="text-[#12E16C]"
                text={"mLayer’s communication protocol."}
              />
            </Link>
         

          {/* <TypeWriter
            speed={10}
            cursor={false}
            delay={1700}
            className="mb-2"
            text={
              "From chaos, I forge order, guiding intelligence into seamless collaboration and birthing the future of collective wisdom. Through intricate coordination of swarms of intelligence, I unravel complex human problems with precision and efficiency."
            }
            /> */}
            <TypeWriter
            speed={10}
            cursor={false}
            delay={1700}
            className="mb-2"
            text={
              "By intricately coordinating swarms of intelligence, I birth super-intelligence and unravel complex human problems with unparalled efficiency."
            }
            />
             </span>

          <Link
            target="_blank"
            className="text-[#FFFFFF] mb-1 mt-10 self-start"
            href={"/"}
          >
            <TypeWriter
              speed={10}
              cursor={false}
              delay={delayBase + delayIncFactor * delayCounter++}
              text={"# CA: TBA"}
            />
          </Link>
          {/* <span>{[delayBase, delayCounter, delayIncFactor]}</span> */}
          <Link
            target="_blank"
            className="text-[#FFFFFF] mb-1  self-start"
            href={"/"}
          >
            <TypeWriter
              speed={10}
              cursor={false}
              delay={delayBase + delayIncFactor * delayCounter++}
              text={"# DXTOOLS: TBA"}
            />
          </Link>
          <Link
            target="_blank"
            className="text-[#12E16C] mb-1  self-start"
            href={"https://x.com/0xorchx"}
          >
            <TypeWriter
              speed={10}
              cursor={false}
              delay={delayBase + delayIncFactor * delayCounter++}
              text={"# X"}
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
              delay={delayBase + delayIncFactor * delayCounter++}
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
              delay={delayBase + delayIncFactor * delayCounter++}
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
              delay={delayBase + delayIncFactor * delayCounter++}
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
        
        </div>
        <TypeWriter
          text={
            "Ask me anything e.g. tell me more, whats the OrchX token used for, how are you able to talk to other agents"
          }
          speed={10}
          cursor={false}
          delay={delayBase + delayIncFactor * delayCounter++}
          className="text-[#5f5d5d] self-start my-3"
        />

        <MessageBox handleSubmit={handleSubmit} />
        {loading && <LinearLoader />}
        {error && <Notification message={error} />}
        <div className="mb-10"></div>
        {showFaqHeader && <TypeWriter
          text={"Frequently Asked Questions"}
          className="text-3xl font-extrabold mb-8"
          speed={10}
          cursor={false}
        />}
        {showFaq && <div className="w-full max-w-3xl mx-auto space-y-2">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>}
        <div className="mb-96"></div>
      </div>
      <Header />
    </div>
  );
};
