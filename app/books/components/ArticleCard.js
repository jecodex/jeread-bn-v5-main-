// components/ArticleCard.js
import Image from "next/image";
import React from "react";

const ArticleCard = () => {
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      {/* Header */}
      <h1 className="text-lg font-bold mb-3">Today&apos;s Article</h1>

      {/* Image */}
      <div className="rounded-lg overflow-hidden mb-3">
        <Image
          src="https://via.placeholder.com/400x200"
          alt="Article"
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Tag */}
      <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded-full mb-2">
        Design
      </span>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-1">
        How to get started as a mobile app designer and get your first client
      </h2>

      {/* Date and Read Time */}
      <p className="text-gray-500 text-sm">October 4, 2021 &bull; 3 min read</p>
    </div>
  );
};

export default ArticleCard;
