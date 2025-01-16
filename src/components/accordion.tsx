import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AccordionItemProps } from "@/model/accordion";
import { TypeWriter } from "./typewrite";

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const delayBase = 100;
  const delayIncFactor = 1000;
  let delayCounter = 0;
  return (
    <div className="border rounded-lg mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center hover:text-gray-500"
        type="button"
        aria-expanded={isOpen}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? " p-4" : "max-h-0"
        }`}
        role="region"
        aria-hidden={!isOpen}
      >
        {/* {isOpen && <TypeWriter speed={10} text={content} />} */}
        {isOpen &&
          content.map((entry, i) => {
            if (typeof entry != "string") {
              return entry;
            }
            return (
              <TypeWriter
                key={i}
                speed={10}
                delay={delayBase + delayIncFactor * delayCounter++}
                text={entry}
              />
            );
          })}
      </div>
    </div>
  );
};
