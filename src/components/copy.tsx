import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  /** The text to be copied to clipboard */
  text: string;
  /** Optional className for custom styling */
  className?: string;
  /** Optional duration (in ms) for the success state. Defaults to 2000ms */
  successDuration?: number;
  /** Optional callback when copy succeeds */
  onCopySuccess?: () => void;
  /** Optional callback when copy fails */
  onCopyError?: (error: Error) => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className = "",
  successDuration = 2000,
  onCopySuccess,
  onCopyError,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopySuccess?.();
      setTimeout(() => setCopied(false), successDuration);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to copy text");
      console.error("Failed to copy text:", error);
      onCopyError?.(error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium 
        transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
        ${
          copied
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : " hover:text-gray-400  bg-gray-800"
        } ${className}`}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      disabled={copied}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
};
