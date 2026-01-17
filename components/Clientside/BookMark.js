"use client";
import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios";

export default function BookMark({ quoteId, userId }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = async () => {
    try {
      await axios.post("http://localhost:5000/bookmarks", {
        quoteId,
        userId,
      });
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error bookmarking quote:", error);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className="text-gray-500 hover:text-blue-500"
    >
      {isBookmarked ? (
        <FaBookmark className="text-blue-500" />
      ) : (
        <FaRegBookmark className="text-gray-500" />
      )}
    </button>
  );
}
