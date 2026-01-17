// QuoteCard.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useState, useEffect } from "react";
import LikedButton from "@/components/Clientside/LikeButton";
import MoreOptions from "@/components/Card/MoreOptions";
import CommentFeed from "@/components/Home/CommentFeed";
import { formatTimeToBangla } from "@/components/tools/timeUtils";
import TruncatedText from "@/components/tools/TruncatedText";
import { MessageCircle, Share2, Bookmark, MoreVertical, Book } from "lucide-react";
import { ArrowUp } from "lucide-react";
import { GrUpdate } from "react-icons/gr";
import { GiFeather } from "react-icons/gi";
import CommentSection from "@/components/Home/CommentFeed";

const QuoteCard = memo(({
  quote,
  isAuthenticated,
  userId,
  isLastItem,
  lastPostRef,
  onDoubleClick,
  onIncrementView,
  onToggleComment,
  onShare,
  onLoginRequired,
  isCommentOpen,
  setLikeButtonRef,
  onSave,
  isSponsored = false,
  sponsorInfo = null
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [felt, setFelt] = useState(false);

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

  // Define border color based on sponsor status
  const borderClass = isSponsored 
    ? "border border-yellow-400" 
    : "";

  // Check if background image exists or is a color
  const hasBackgroundImage = quote.backgroundImage && quote.backgroundImage !== null && quote.backgroundImage !== '""';
  
  // Check if backgroundImage is a color code (starts with # or is a valid CSS color)
  const isColorCode = hasBackgroundImage && (
    quote.backgroundImage.startsWith('#') || 
    quote.backgroundImage.startsWith('rgb') || 
    quote.backgroundImage.startsWith('hsl') ||
    /^[a-zA-Z]+$/.test(quote.backgroundImage) // CSS color names like 'white', 'red'
  );

  const handleSave = () => {
    if (!userId) {
      onLoginRequired?.();
      return;
    }
    setSaved(!saved);
    onSave && onSave(quote);
  };

  const handleUpvote = () => {
    if (!userId) {
      onLoginRequired?.();
      return;
    }
    setLiked(!liked);
  };

  const handleFelt = () => {
    if (!userId) {
      onLoginRequired?.();
      return;
    }
    setFelt(!felt);
    // TODO: Add API call to save "felt this" to backend
  };

  const handleMoreOptions = () => {
    console.log("More options clicked");
  };

  return (
    <div
      className={`w-full px-4 max-w-xl ${hasBackgroundImage && !isColorCode ? 'h-[600px]' : ''} py-2 relative ${isDarkMode ? "bg-[#1F2937]" : "bg-white"} overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300 flex flex-col ${borderClass}`}
      ref={isLastItem ? lastPostRef : null}
      onMouseEnter={() => onIncrementView(quote._id)}
      onDoubleClick={() => onDoubleClick(quote._id)}
    >
      {/* User info at top */}
      <div className="flex items-center justify-between z-10 mb-3">
        <Link href={`/profile/${quote.author.author_id}`}>
          <div className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-1 -m-1 transition-colors">
            <Image
              width={32}
              height={32}
              src={quote.author.profile_picture || "https://images.unsplash.com/photo-1575993792833-f93417c7aa35?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="Profile"
              className={`w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 transition-colors ${isSponsored ? "border-yellow-500 dark:border-yellow-400" : ""}`}
            />
            <div className="ml-2">
              <p className={`${isDarkMode ? "text-gray-300 hover:text-blue-400" : "text-gray-800 hover:text-blue-600"} font-medium text-sm transition-colors duration-200 underline-offset-2 hover:underline`}>
                {quote.author.name}
              </p>
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-xs transition-colors duration-300`}>
                {formatTimeToBangla(quote.updated_at)}
              </p>
            </div>
          </div>
        </Link>

        <MoreOptions
          quote={quote}
          userId={userId}
          onLoginRequired={onLoginRequired}
          onToggleComment={onToggleComment}
          onShare={onShare}
          isCommentOpen={isCommentOpen}
          setLikeButtonRef={setLikeButtonRef}
          onSave={onSave}
          quoteId={quote._id}
          currentContent={quote.content}
          currentUserId={quote.author.author_id}
        />
      </div>
      
      {/* Background image section - middle content area */}
      <div 
        className={`relative overflow-hidden rounded-xl ${hasBackgroundImage && !isColorCode ? 'flex-1' : ''}`}
        style={{
          backgroundImage: hasBackgroundImage && !isColorCode ? `url(${quote.backgroundImage})` : 'none',
          backgroundColor: isColorCode ? quote.backgroundImage : (hasBackgroundImage ? 'transparent' : '#ffffff'),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability - only show when background image exists (not color) */}
        {hasBackgroundImage && !isColorCode && <div className="absolute inset-0 bg-black bg-opacity-40"></div>}
        
        {/* Content wrapper with higher z-index */}
        <div className={`relative z-10 ${hasBackgroundImage && !isColorCode ? 'flex flex-col h-full items-center justify-center' : ''}`}>
          {/* Content area with quote text */}
          <div className={`${hasBackgroundImage && !isColorCode ? 'px-4' : 'pt-4 px-4 pb-2'}`}>
            <div className="w-full ">
              <div className="text-lg leading-relaxed font-serif">
                {/* Content */}
                <p className={`text-[16px] text-gray-700 font-serif ${
                  hasBackgroundImage && !isColorCode ? 'text-white drop-shadow-lg text-center' : 'text-black'
                }`}>
                  <TruncatedText text={quote.content} maxHeight={350} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Minimal like BookReels */}
      <div className={`flex items-center justify-between text-sm px-2 mb-2 mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        <span>{quote.views} people viewed</span>
        <div className="flex items-center space-x-4">
          {quote.feltCount > 0 && (
            <span className="flex items-center gap-1">
              <GiFeather className="text-purple-500" size={14} />
              {quote.feltCount}
            </span>
          )}
          {quote.commentCount > 0 && <span>{quote.commentCount} Comment</span>}
          {quote.shareCount > 0 && <span>{quote.shareCount} Share</span>}
        </div>
      </div>

      {/* Bottom actions - Instagram style */}
      <div
        className="flex items-center justify-between border-t pt-3"
        style={{ borderColor: isDarkMode ? "#374151" : "#e5e7eb" }}
      >
        <div className="flex items-center space-x-4">
          {/* Like/Upvote Button */}
          <div className="flex items-center">
            <LikedButton
              ref={(ref) => setLikeButtonRef(quote._id, ref)}
              quoteId={quote._id}
              userId={userId}
              authorName={quote.author.name}
              onLoginRequired={onLoginRequired}
              initialLikesCount={quote.likes > 0 ? quote.likes : undefined}
            />
          </div>

          {/* Comment Button */}
          <button
            onClick={() => onToggleComment(quote)}
            className="flex items-center space-x-2 gap-2 group"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-sm ${
                isDarkMode ? "text-gray-300 hover:text-blue-500" : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <MessageCircle size={16} />

              {quote.commentCount > 0 && (
                <span className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  {quote.commentCount}
                </span>
              )}
            </div>
          </button>

          {/* Share Button */}
          <button 
            onClick={() => onShare(quote)}
            className="group"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-sm ${
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
      {isAuthenticated && isCommentOpen && (
        <div className="mt-4 max-h-40 overflow-y-auto">
          <CommentSection 
            quoteId={quote._id} 
            quoteAuthor={quote.author} 
          />
        </div>
      )}
    </div>
  );
});

QuoteCard.displayName = "QuoteCard";

export default QuoteCard;
