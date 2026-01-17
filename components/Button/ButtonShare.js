"use client";
import React from "react";

export default function ButtonShare({ book }) {
  const handleShare = () => {
    alert(`আপনি "${book.title}" বইটি শেয়ার করছেন!`);
  };
  return (
    <div>
      <button
        onClick={handleShare}
        className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition duration-300"
      >
        শেয়ার করুন
      </button>
    </div>
  );
}
