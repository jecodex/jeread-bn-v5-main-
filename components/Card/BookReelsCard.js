"use client";

import { useState, useEffect, memo } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical } from "lucide-react";
import { ArrowUp } from "lucide-react";
import QuoteCard from "./QuoteCard";
import BookCard from "./BookCard";
import { GrUpdate } from "react-icons/gr";

// Using a simple share icon instead of GrUpdate since it's not available
const UpdateIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 0-18.8 4.2"/>
  </svg>
);

// BookReelsCard Component - Now receives all data via props from QuotesPageClient
function BookReelsCard({ 
  bookReel, 
  userId, 
  handleLoginRequired,
  isAuthenticated,
  onDoubleClick,
  onIncrementView,
  onToggleComment,
  onShare,
  setLikeButtonRef 
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(bookReel?.likeCount || bookReel?.likesCount || 0);
  const [commentCount, setCommentCount] = useState(bookReel?.commentCount || bookReel?.commentsCount || 0);
  const [saved, setSaved] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get all data from props - no default values
  const text = bookReel?.text || bookReel?.content || "";
  const highlightText = bookReel?.highlightText || "";
  const userName = bookReel?.userName || bookReel?.author?.name || "Anonymous";
  const userText = bookReel?.userText || bookReel?.description || "";
  const backgroundImage = bookReel?.backgroundImage || bookReel?.image || "";
  const userProfile = bookReel?.userProfile || ""; // Get user profile image
  const bookInfo = bookReel?.bookInfo || {
    title: bookReel?.bookTitle || "",
    author: bookReel?.bookAuthor || "",
    page: bookReel?.page || 0,
  };

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

  // Update like count when prop changes
  useEffect(() => {
    setLikeCount(bookReel?.likeCount || bookReel?.likesCount || 0);
  }, [bookReel?.likeCount, bookReel?.likesCount]);

  // Update comment count when prop changes
  useEffect(() => {
    setCommentCount(bookReel?.commentCount || bookReel?.commentsCount || 0);
  }, [bookReel?.commentCount, bookReel?.commentsCount]);

  const handleLike = () => {
    if (!isAuthenticated) {
      handleLoginRequired?.();
      return;
    }
    
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      handleLoginRequired?.();
      return;
    }
    setSaved(!saved);
  };

  const handleMoreOptions = () => {
    console.log("More options clicked");
  };

  const handleUpvote = () => {
    if (!isAuthenticated) {
      handleLoginRequired?.();
      return;
    }
    handleLike();
  };

  const handleComment = () => {
    if (!isAuthenticated) {
      handleLoginRequired?.();
      return;
    }
    onToggleComment?.(bookReel);
  };

  const handleShareClick = () => {
    onShare?.(bookReel);
  };

  const handleCardDoubleClick = () => {
    onDoubleClick?.(bookReel._id);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Increment view count when component mounts
  useEffect(() => {
    if (bookReel?._id && onIncrementView) {
      onIncrementView(bookReel._id);
    }
  }, [bookReel?._id, onIncrementView]);

  // Set like button ref for double-click functionality
  useEffect(() => {
    if (bookReel?._id && setLikeButtonRef) {
      setLikeButtonRef(bookReel._id, { handleLike });
    }
  }, [bookReel?._id, setLikeButtonRef, handleLike]);

  return (
    <div
      className={`w-full px-4 max-w-xl h-[600px] py-2 relative ${isDarkMode ? "bg-[#1F2937]" : "bg-white"} overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300 flex flex-col`}
      onDoubleClick={handleCardDoubleClick}
    >
      {/* User info at top */}
      <div className="flex items-center justify-between z-10 mb-4">
        <div className="flex items-center">
          {/* Profile Picture or Fallback */}
          {userProfile && !imageError ? (
            <img
              src={userProfile}
              alt={userName}
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              onError={handleImageError}
            />
          ) : (
            <div
              className={`w-8 h-8 rounded-full ${isDarkMode ? "bg-gray-700 text-white" : "bg-[#45B09E] text-white"} flex items-center justify-center font-bold transition-colors duration-300`}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="ml-2">
            <p
              className={`${isDarkMode ? "text-gray-300" : "text-gray-800"} font-medium text-sm transition-colors duration-300`}
            >
              {userName}
            </p>
            <p
              className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-xs transition-colors duration-300`}
            >
              Book Highlight • Quote
            </p>
          </div>
        </div>

        {/* 3-dot menu button */}
        <button
          onClick={handleMoreOptions}
          className={`p-2 rounded-full hover:bg-opacity-20 ${isDarkMode ? "hover:bg-white text-gray-300" : "hover:bg-gray-200 text-gray-500"} transition-colors duration-200`}
        >
          <MoreVertical size={20} />
        </button>
      </div>
      
      {/* Background image section - middle content area */}
      <div 
        className="flex-1 relative overflow-hidden rounded-xl "
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Content wrapper with higher z-index */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Content area with highlighted text - flex-1 to take remaining space */}
          <div className="flex items-center justify-center flex-1 px-4">
            <div className="  p-6 rounded-xl w-full max-w-[360px]">
              <div className="text-lg leading-relaxed font-serif space-y-4">
                
                  <p className="text-[16px] text-white font-serif drop-shadow-lg">{text}</p>
               
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Bottom actions - Instagram style */}
      <div
        className="flex items-center justify-between border-t pt-3 mt-4"
        style={{ borderColor: isDarkMode ? "#374151" : "#e5e7eb" }}
      >
        <div className="flex items-center space-x-4">
          <button onClick={handleUpvote} className="flex items-center space-x-1 group">
            <div
              className={`flex items-center space-x-1 p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-200 hover:scale-110 ${
                liked ? "text-red-500" : isDarkMode ? "text-gray-400 hover:text-red-500" : "text-gray-600 hover:text-red-500"
              }`}
            >
              <ArrowUp size={16} className={liked ? "fill-current" : "text-gray-500"} />
              <span className="text-sm text-gray-500">Upvote</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className={`${isDarkMode ? "text-gray-500" : "text-gray-500"} text-sm `}>{likeCount}</span>
            </div>
          </button>

          <button onClick={handleComment} className="flex items-center space-x-1 group">
            <div
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isDarkMode ? "text-gray-400 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <MessageCircle size={16} />
            </div>
            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm font-medium`}>
              {commentCount}
            </span>
          </button>

          <button onClick={handleShareClick} className="group">
            <div
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isDarkMode ? "text-gray-400 hover:text-green-500" : "text-gray-600 hover:text-green-500"
              }`}
            >
             <GrUpdate size={14} />
            </div>
          </button>
        </div>

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
    </div>
  );
}

export default BookReelsCard;

// Updated QuotesPageClient FeedItem component
const FeedItemUpdated = memo(({ 
  item, 
  isLastItem, 
  lastPostRef, 
  isAuthenticated, 
  userId, 
  handleDoubleClick, 
  incrementViewCount, 
  handleToggleCommentFeed, 
  handleShare, 
  handleLoginRequired, 
  openCommentFeedMap, 
  setLikeButtonRef 
}) => {
  if (item.type === 'bookreels') {
    return (
      <div 
        key={item._id}
        ref={isLastItem ? lastPostRef : null} 
        className="w-full"
      >
       <BookReelsCard 
          bookReel={item}
          userId={userId}
          isAuthenticated={isAuthenticated}
          handleLoginRequired={handleLoginRequired}
          onDoubleClick={handleDoubleClick}
          onIncrementView={incrementViewCount}
          onToggleComment={handleToggleCommentFeed}
          onShare={handleShare}
          setLikeButtonRef={setLikeButtonRef}
        />
      </div>
    );
  }

  if (item.type === 'book') {
    return (
      <div 
        key={item._id}
        ref={isLastItem ? lastPostRef : null} 
        className="w-full"
      >
        <BookCard bookData={item} />
      </div>
    );
  }

  return (
    <QuoteCard 
      key={item._id}
      quote={item}
      isAuthenticated={isAuthenticated}
      userId={userId}
      isLastItem={isLastItem}
      lastPostRef={isLastItem ? lastPostRef : null}
      onDoubleClick={handleDoubleClick}
      onIncrementView={incrementViewCount}
      onToggleComment={handleToggleCommentFeed}
      onShare={handleShare}
      onLoginRequired={handleLoginRequired}
      isCommentOpen={openCommentFeedMap[item._id] || false}
      setLikeButtonRef={setLikeButtonRef}
    />
  );
});

FeedItemUpdated.displayName = 'FeedItemUpdated';
