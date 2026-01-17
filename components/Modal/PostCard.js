"use client";

import MoreOptions from '@/components/Card/MoreOptions';
import LikedButton from '@/components/Clientside/LikeButton';
import CommentFeed from "@/components/Home/CommentFeed";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { formatTimeToBangla } from '../tools/timeUtils';
import TruncatedTextId from '../tools/TruncatedTextId';
import { MessageCircle, Bookmark } from "lucide-react";
import { GrUpdate } from "react-icons/gr";
import TruncatedText from '../tools/TruncatedText';

/**
 * PostCard Component - Displays a social media post with engagement features
 * @param {object} props - Component properties
 * @param {object} props.author - Post author information
 * @param {string} props.content - Post content text
 * @param {string} props.date - Post publication date
 * @param {number} props.likes - Number of likes
 * @param {array} props.comments - Post comments
 * @param {string} props.postId - Unique post identifier
 * @param {number} props.views - Number of post views
 * @param {number} props.shareCount - Number of shares
 * @param {boolean} props.isAuthenticated - User authentication status
 * @param {string} props.userId - Current user ID
 * @param {function} props.onLoginRequired - Login required callback
 * @param {function} props.onSave - Save post callback
 * @param {string} props.backgroundImage - Optional background image URL
 */
const PostCard = ({ 
  author, 
  content, 
  date, 
  likes, 
  comments, 
  postId, 
  views,
  shareCount = 0,
  isAuthenticated = false,
  userId,
  onLoginRequired,
  onSave,
  backgroundImage
}) => {
  const [showComments, setShowComments] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  // Check if background image exists
  const hasBackgroundImage = backgroundImage && backgroundImage !== null && backgroundImage !== '""';

  // Effect to detect dark mode from system preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateTheme = () => {
      setIsDarkMode(darkModeMediaQuery.matches);
    };

    updateTheme();
    darkModeMediaQuery.addEventListener("change", updateTheme);

    return () => {
      darkModeMediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  const handleToggleCommentFeed = () => {
    setShowComments(!showComments);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/post/${postId}`;
    if (navigator.share) {
      navigator
        .share({
          title: `Post by ${author?.name}`,
          text: content?.substring(0, 100) + "...",
          url: shareUrl,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const handleSave = () => {
    if (!userId) {
      onLoginRequired?.();
      return;
    }
    setSaved(!saved);
    onSave && onSave({ _id: postId, content, author });
  };

  return (
    <div
      className={`w-full px-4 max-w-xl h-[600px] py-2 relative ${isDarkMode ? "bg-[#1F2937]" : "bg-white"} overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300 flex flex-col`}
    >
      {/* User info at top */}
      <div className="flex items-center justify-between z-10 mb-4">
        <Link href={`/profile/${author?.author_id || author?.id}`}>
          <div className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-1 -m-1 transition-colors">
            <Image
              width={32}
              height={32}
              src={author?.profile_picture || "/default-profile.jpg"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 transition-colors"
            />
            <div className="ml-2">
              <p className={`${isDarkMode ? "text-gray-300 hover:text-blue-400" : "text-gray-800 hover:text-blue-600"} font-medium text-sm transition-colors duration-200 underline-offset-2 hover:underline`}>
                {author?.name || "Unknown User"}
              </p>
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-xs transition-colors duration-300`}>
                {date ? formatTimeToBangla(date) : "Time unavailable"}
              </p>
            </div>
          </div>
        </Link>

        <MoreOptions />
      </div>
      
      {/* Content section - Background image section - middle content area */}
      <div 
        className="flex-1 relative overflow-hidden rounded-xl"
        style={{
          backgroundImage: hasBackgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundColor: hasBackgroundImage ? 'transparent' : '#ffffff',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability - only show when background image exists */}
        {hasBackgroundImage && <div className="absolute inset-0 bg-black bg-opacity-40"></div>}
        
        {/* Content wrapper with higher z-index */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-center flex-1 px-4">
            <div className="p-6 rounded-xl w-full max-w-[360px]">
              <div className="text-lg leading-relaxed font-serif space-y-4">
                <p className={`text-[16px] font-serif ${
                  hasBackgroundImage ? 'text-white drop-shadow-lg' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  <TruncatedText text={content || "No content available"} maxHeight={350} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Minimal like QuoteCard */}
      <div className={`flex items-center justify-between text-sm px-2 mb-2 mt-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        <span>{views || 0} people viewed</span>
        <div className="flex items-center space-x-4">
          {comments?.length > 0 && <span>{comments.length} Comment</span>}
          {shareCount > 0 && <span>{shareCount} Share</span>}
        </div>
      </div>

      {/* Bottom actions - Instagram style */}
      <div
        className="flex items-center justify-between border-t pt-3 mt-4"
        style={{ borderColor: isDarkMode ? "#374151" : "#e5e7eb" }}
      >
        <div className="flex items-center space-x-4">
          {/* Like/Upvote Button */}
          <div className="flex items-center">
            <LikedButton
              quoteId={postId}
              userId={userId}
              authorName={author?.name}
              onLoginRequired={onLoginRequired}
              initialLikesCount={likes > 0 ? likes : undefined}
            />
          </div>

          {/* Comment Button */}
          <button
            onClick={handleToggleCommentFeed}
            className="flex items-center space-x-1 group"
          >
            <div
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isDarkMode ? "text-gray-400 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <MessageCircle size={16} />
            </div>
            <span className={`text-sm font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              {comments?.length > 0 ? comments.length : 0}
            </span>
          </button>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="group"
          >
            <div
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isDarkMode ? "text-gray-400 hover:text-green-500" : "text-gray-600 hover:text-green-500"
              }`}
            >
              <GrUpdate size={14} />
            </div>
          </button>
        </div>

        {/* Save Button */}
        <button onClick={handleSave} className="group">
          <div
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              saved ? "text-blue-500" : isDarkMode ? "text-gray-400 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"
            }`}
          >
            <Bookmark size={16} className={saved ? "fill-current" : ""} />
          </div>
        </button>
      </div>

      {/* Comment Feed */}
      {isAuthenticated && showComments && (
        <div className="mt-4 max-h-40 overflow-y-auto">
          <CommentFeed postId={postId} comments={comments}  />
        </div>
      )}
    </div>
  );
};

export default PostCard;
