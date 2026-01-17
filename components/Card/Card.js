import Image from "next/image";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai"; // Import a clock icon

const Card = ({ title, tags, date, image, comingSoon }) => {
  return (
    <div className="relative border rounded-lg shadow-lg p-4 bg-white">
      {image ? (
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="w-full h-40 object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
          <p className="text-gray-500 text-xl">Coming Soon</p>
        </div>
      )}
      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded flex items-center gap-1 text-sm font-semibold text-gray-600">
        <AiOutlineClockCircle className="text-gray-500" /> {/* Add the icon */}
        <span>{date || "Coming Soon"}</span>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium text-white bg-green-500 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
