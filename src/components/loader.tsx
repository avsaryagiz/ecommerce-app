import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
    </div>
  );
}
