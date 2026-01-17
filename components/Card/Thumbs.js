"use client";
import React, { useState } from "react";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";

const Thumbs = ({
  title = "Card Title",
  description = "This is a sample description.",
  onUpvote,
  onComment,
  onShare,
  initialUpvotes = 0,
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);

  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
    if (onUpvote) onUpvote();
  };

  const handleComment = () => {
    if (onComment) onComment();
  };

  const handleShare = () => {
    if (onShare) onShare();
  };

  return (
    <div className="flex justify-between items-center">
      <button
        className="flex items-center text-blue-500 hover:text-blue-700"
        onClick={handleUpvote}
      >
        <FaThumbsUp className="mr-2" /> {upvotes} Upvotes
      </button>
    </div>
  );
};

export default Thumbs;
