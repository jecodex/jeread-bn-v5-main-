"use client";
import React from "react";
import LikedButton from "./LikeButton";

const DislikedButton = ({ quoteId, userId, authorName, postId, className }) => {
  const handleDislike = () => {
    // Logic to handle dislike action (e.g., API call)
    console.log(`Disliked post ${postId} by ${userId}`);
  };

  return (
    <button
      onClick={handleDislike}
      className={`dislike-button ${className}`}
      aria-label="Dislike this post"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        fill={LikedButton ? "none" : "currentColor"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14H5.236A2 2 0 013.447 11.106l3.5-7A2 2 0 018.736 3h4.017c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2M17 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
        />
      </svg>
    </button>
  );
};

export default DislikedButton;
