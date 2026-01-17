"use client";

import { useState, useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function HorizontalNav() {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollWidth > container.scrollLeft + container.clientWidth
    );
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const categories = [
    "Home",
    "Following",
    "Culture",
    "Business",
    "Finance",
    "Technology",
    "U.S. Politics",
    "Food & Drink",
    "Sports",
    "Art & Illustration",
    "World Politics",
    "Health Politics",
    "News",
    "Fashion & Beauty",
    "Music",
    "Faith",
  ];

  return (
    <div className="relative flex items-center w-full">
      {/* বাম দিকের গ্রেডিয়েন্ট */}
      {showLeftArrow && (
        <div className="absolute left-0 h-full w-12 bg-gradient-to-r from-white via-white/60 to-transparent blur-md opacity-90 pointer-events-none"></div>
      )}
      {showLeftArrow && (
        <button
          onClick={() =>
            scrollContainerRef.current.scrollBy({
              left: -200,
              behavior: "smooth",
            })
          }
          className="absolute left-0 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 z-10"
        >
          <FaArrowLeft />
        </button>
      )}
      <div
        className="flex space-x-4 bg-gray-100 p-2 rounded-lg overflow-hidden cursor-grab"
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              index === 0
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {/* ডান দিকের গ্রেডিয়েন্ট */}
      {showRightArrow && (
        <div className="absolute right-0 h-full w-12 bg-gradient-to-l from-white via-white/60 to-transparent blur-md opacity-90 pointer-events-none"></div>
      )}
      {showRightArrow && (
        <button
          onClick={() =>
            scrollContainerRef.current.scrollBy({
              left: 200,
              behavior: "smooth",
            })
          }
          className="absolute right-0 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 z-10"
        >
          <FaArrowRight />
        </button>
      )}
    </div>
  );
}
