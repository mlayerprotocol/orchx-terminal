import React, { useState, useEffect } from "react";

export const TypeWriter = ({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  className = "",
}: {text: string |  (() => string), speed?: number, delay?: number, cursor?: boolean, className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    console.log("TYPE",typeof text )
    if (typeof text == "function") {
      setTextValue(text())
    } else {
      setTextValue(text)
    }
  }, [text]);

  useEffect(() => {
    // Reset when text changes
    setDisplayText("");
    setCurrentIndex(0);
    setIsTyping(false);

    // Initial delay before typing starts
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [textValue, delay]);

  useEffect(() => {
    let timer;

    if (isTyping && currentIndex < textValue.length) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev + textValue[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, isTyping, speed, textValue]);

  return (
    <span className={className}>
      {displayText}
      {cursor && currentIndex < textValue.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};
