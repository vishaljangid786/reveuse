import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-80 bg-white">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-blue-500 font-bold text-lg">⏳</span>
        </div>
      </div>
      <p className="mt-4 text-gray-700 text-lg font-medium animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loader;
