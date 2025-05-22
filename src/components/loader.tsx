import React from "react";

export default function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <svg
        className="size-12 animate-spin text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"
        />
        <path
          fill="currentColor"
          d="M12.5,4.5a1.5,1.5,0,1,1-3,.001A1.5,1.5,0,0,1,12.5,4.5Z"
        />
      </svg>
    </div>
  );
}
