import React, { useState, useEffect } from "react";

export const TypeWriter = ({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

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
  }, [text, delay]);

  useEffect(() => {
    let timer;

    if (isTyping && currentIndex < text.length) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, isTyping, speed, text]);

  return (
    <span className={className}>
      {displayText}
      {cursor && currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};
