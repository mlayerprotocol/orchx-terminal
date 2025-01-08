import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="w-12 h-12 self-center border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  );
};

export const LinearLoader: React.FC = () => {
    return (
      <div className="w-auto h-1  rounded-2xl mx-20 bg-gray-700 overflow-hidden">
        <div className="h-full rounded-2xl bg-[#9D9D02] animate-[progress_1.5s_ease-in-out_infinite]"></div>
      </div>
    );
  };
  