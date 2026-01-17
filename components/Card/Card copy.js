"use client";
import Link from "next/link";
import React from "react";

const Card = ({ joke }) => {
  const handleButtonClick = () => {
    // Add your button click logic here
    console.log("Button clicked!");
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Link href={`/ho/${joke.id}`} className="text-blue-500 hover:underline">
        {joke.setup || "Random Joke"}
      </Link>
      <button
        className="mt-2 bg-blue-500 text-white rounded p-2"
        onClick={handleButtonClick}
      >
        Handle Button
      </button>
    </div>
  );
};
export default Card;
