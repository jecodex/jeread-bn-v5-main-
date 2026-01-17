"use client";
import { useState } from "react";

export default function FollowButton() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing((prevState) => !prevState);
  };

  return (
    <button
      onClick={handleFollow}
      className={`mt-4 px-6 py-2 text-white font-semibold rounded-full ${
        isFollowing ? "bg-red-500" : "bg-blue-500"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
