"use client";
import React, { useState } from "react";

interface CommandMap {
  [key: string]: (args?: string[]) => string | void;
}

export const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const commands: CommandMap = {
    help: () => "Available commands: 'help', 'clear', 'echo [text]'.",
    clear: () => setOutput([]),
    echo: (args?: string[]) => args?.join(" ") || "",
  };

  const handleCommand = () => {
    const args = input.trim().split(" ");
    const cmd = args[0].toLowerCase();

    const result =
      typeof commands[cmd] === "function"
        ? commands[cmd](args.slice(1))
        : `Command not found: ${cmd}`;

    if (result !== undefined) {
      setOutput((prev) => [...prev, `> ${input}`, result]);
    }

    setHistory((prev) => [...prev, input]);
    setInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim()) handleCommand();
    } else if (e.key === "ArrowUp") {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#0f0",
        padding: "10px",
        fontFamily: "monospace",
        height: "400px",
        overflowY: "auto",
      }}
    >
      {output.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      <div>
        <span>{">"}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            backgroundColor: "#000",
            color: "#0f0",
            border: "none",
            outline: "none",
            fontFamily: "monospace",
            width: "90%",
          }}
        />
      </div>
    </div>
  );
};
