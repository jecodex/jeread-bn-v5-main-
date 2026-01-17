"use client"; // This makes it a Client Component

import { useEffect, useState } from "react";
import { UserPlus, UserCheck, Loader2 } from "lucide-react";

export default function FollowButton({ userId }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUserId = "67cf2d19d7935b3babb458f6"; // Replace with actual logged-in user ID from auth system

  // Check if user is already following on mount
  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/following/${loggedInUserId}`
        );
        if (response.ok) {
          const following = await response.json();
          setIsFollowing(following.includes(userId));
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };
    checkFollowStatus();
  }, [userId, loggedInUserId]);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const endpoint = isFollowing
        ? `http://localhost:5000/api/unfollow/${userId}`
        : `http://localhost:5000/api/follow/${userId}`;
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });

      if (response.ok) {
        setIsFollowing(!isFollowing);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Follow/Unfollow error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg  transition-colors text-[#6B7280] ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </>
      ) : isFollowing ? (
        <>
          <UserCheck className="w-4 h-4" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4" />
          Follow
        </>
      )}
    </button>
  );
}