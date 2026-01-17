"use client";
import React from "react";

const ButtonBook = ({ onRead, book }) => {
  const handleRead = () => {
    alert(`আপনি "${book.title}" বইটি পড়ছেন!`);
  };

  return (
    <button
      onClick={handleRead}
      className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition duration-300"
    >
      পড়ুন
    </button>
  );
};

export default ButtonBook;
