"use client";
import Image from "next/image";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useAuth } from "@/components/ContexProvider/ContextProvider";
import { ArrowDown, ArrowUp } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const LikedButton = forwardRef(({ quoteId, userId, authorName, initialLikesCount, isLiked: initialIsLiked, onLoginRequired }, ref) => {
  const auth = useAuth();
const googleUser = auth?.googleUser;
  const isAuthenticated = !!googleUser;
  
  const [liked, setLiked] = useState(initialIsLiked || false);
  const [likesCount, setLikesCount] = useState(initialLikesCount || 0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [displayCount, setDisplayCount] = useState(initialLikesCount || 0);

  useEffect(() => {
    // Only fetch like status if user is authenticated
    if (isAuthenticated) {
      // Fetch initial like status
      const fetchLikeStatus = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/posts/${quoteId}`);
          const data = await response.json();
          const isLikedByUser = data.likedBy?.includes(userId) || false;
          const currentLikes = data.likes || 0;
          
          setLiked(isLikedByUser);
          setLikesCount(currentLikes);
          setDisplayCount(currentLikes);
        } catch (error) {
          console.error("Error fetching like status:", error);
        }
      };

      fetchLikeStatus();
    } else {
      // For non-authenticated users, just get the like count
      const fetchLikeCount = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/posts/${quoteId}`);
          const data = await response.json();
          const currentLikes = data.likes || 0;
          
          setLikesCount(currentLikes);
          setDisplayCount(currentLikes);
        } catch (error) {
          console.error("Error fetching like count:", error);
        }
      };

      fetchLikeCount();
    }
  }, [quoteId, userId, isAuthenticated]);

  // Effect to control animation timing
  useEffect(() => {
    let animationTimer;
    if (showAnimation) {
      animationTimer = setTimeout(() => {
        setShowAnimation(false);
      }, 1000); // Animation lasts for 1 second
    }
    
    return () => {
      if (animationTimer) clearTimeout(animationTimer);
    };
  }, [showAnimation]);

  // Update displayCount whenever likesCount changes
  useEffect(() => {
    setDisplayCount(likesCount);
  }, [likesCount]);

  const handleLike = async () => {
    // Check if user is authenticated before proceeding
    if (!isAuthenticated) {
      if (onLoginRequired) {
        onLoginRequired();
      }
      return;
    }
    
    // Prevent multiple simultaneous updates
    if (isUpdating) return;
    
    setIsUpdating(true);
    
    // Determine new state before API call
    const newLiked = !liked;
    
    // Trigger the heart animation only when liking (not unliking)
    if (newLiked) {
      setShowAnimation(true);
    }
    
    // Optimistic UI update - immediately update the UI
    const newCount = likesCount + (newLiked ? 1 : -1);
    const updatedCount = newCount >= 0 ? newCount : 0; // Ensure count doesn't go below 0
    
    setLiked(newLiked);
    setLikesCount(updatedCount);
    setDisplayCount(updatedCount); // Update display count immediately
    
    try {
      // API endpoint is conditional based on the action (like or unlike)
      const endpoint = newLiked 
        ? `${API_BASE_URL}/posts/${quoteId}/like` 
        : `${API_BASE_URL}/posts/${quoteId}/unlike`;
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          username: authorName,
          postId: quoteId,
        }),
      });
      
      if (!response.ok) {
        // Rollback if API call fails
        setLiked(!newLiked); // Revert to previous state
        setLikesCount(likesCount); // Revert count
        setDisplayCount(likesCount); // Revert display count
        const errorData = await response.json();
        console.error("Server error:", errorData.message);
        throw new Error(`Failed to ${newLiked ? 'like' : 'unlike'} the post`);
      }
      
      // Update from server response
      const data = await response.json();
      if (data.updatedPost) {
        const serverLikes = data.updatedPost.likes || 0;
        setLikesCount(serverLikes);
        setDisplayCount(serverLikes);
      }
      
    } catch (error) {
      console.error(`Error ${newLiked ? 'liking' : 'unliking'} post:`, error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Expose handleLike method via ref
  useImperativeHandle(ref, () => ({
    handleLike
  }));

  // Like button SVG - conditionally render based on liked state
  const LikeButtonSVG = () => (
    <ArrowUp className={`w-4 h-4 ${liked && isAuthenticated ? 'text-[#2E69FF]' : 'text-gray-400'}`} />
  );

  return (
    <div className="flex items-center  px-4 rounded-full py-1 gap-2 relative bg-[#F3F4F6] dark:bg-gray-800">  
      {/* Heart animation overlay */}
      {showAnimation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="heart-animation">
              <ArrowUp 
                className="w-4 h-4 text-[#2E69FF]"
                style={{
                  animation: "heart-burst 1s ease-out forwards"
                }}
              />
          </div>
        </div>
      )}
      
      <button
        onClick={handleLike}
        className={`flex items-center gap-3 ${liked && isAuthenticated ? "text-blue-500" : "text-gray-400"}`}
        aria-label={liked ? "Unlike post" : "Like post"}
        disabled={isUpdating}
      >
        <div className={`flex items-center gap-2 ${liked && isAuthenticated ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'}`}>
          <LikeButtonSVG />
          <span className="text-[14px]">Upvote</span>
        </div>
        {displayCount > 0 && (
          <>  
            <span className="text-sm">•</span>
            <span className="text-sm ${liked && isAuthenticated ? 'text-[#2E69FF]' : 'text-gray-400'}">{displayCount}</span>
          </>
        )}
      </button>
      
      {/* Add global style for heart animation */}
      <style jsx global>{`
        @keyframes heart-burst {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          30% {
            opacity: 0.8;
            transform: scale(1.3);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
});

LikedButton.displayName = "LikedButton";

export default LikedButton;
