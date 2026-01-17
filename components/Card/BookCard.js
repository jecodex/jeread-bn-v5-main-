"use client";
import React, { useState, useEffect } from 'react';
import { MessageCircle, Share2, Heart, Bookmark, Star, BookOpen, ArrowUp } from 'lucide-react';
import Image from 'next/image';

// GrUpdate icon component (since it's not available in lucide-react)
const GrUpdate = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
  </svg>
);

const BookCard = ({ bookData }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(bookData?.likes || 24);
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(bookData?.likes || 24);
  const [commentCount, setCommentCount] = useState(bookData?.commentsCount || 12);

  useEffect(() => {
    setIsClient(true);
    // Check for dark mode
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);
    
    const handleDarkModeChange = (e) => {
      setIsDarkMode(e.matches);
    };
    
    darkModeQuery.addEventListener('change', handleDarkModeChange);
    return () => darkModeQuery.removeEventListener('change', handleDarkModeChange);
  }, []);

  const handleUpvote = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
      setLiked(false);
    } else {
      setLikeCount(prev => prev + 1);
      setLiked(true);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Provide consistent default values
  const safeBookData = {
    bookTitle: bookData?.bookTitle || 'The Great Gatsby',
    author: bookData?.author || 'F. Scott Fitzgerald',
    genre: bookData?.genre || 'Classic Literature',
    description: bookData?.description || 'A classic American novel set in the summer of 1922, exploring themes of wealth, love, and the American Dream through the eyes of narrator Nick Carraway.',
    rating: bookData?.rating || 4.5,
    pages: bookData?.pages || 180,
    yearPublished: bookData?.yearPublished || 1925,
    userName: bookData?.userName || 'BookLover_BD',
    userAvatar: bookData?.userAvatar || 'B',
    timeAgo: bookData?.timeAgo || '2h ago',
    commentsCount: bookData?.commentsCount || 12,
    likes: bookData?.likes || 24,
    coverImage: bookData?.coverImage || `https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format`,
    ...bookData
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: `${safeBookData.bookTitle} by ${safeBookData.author}`,
        text: `Check out this book: ${safeBookData.bookTitle} by ${safeBookData.author}`,
        url: window.location.href,
      }).catch(error => console.log('Error sharing:', error));
    } else if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${safeBookData.bookTitle} by ${safeBookData.author} - ${safeBookData.description}`)
        .then(() => alert('Book details copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={14} className="text-yellow-400 fill-current" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={14} className="text-yellow-400 fill-current opacity-50" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={14} className="text-gray-300 dark:text-gray-600" />
      );
    }
    
    return stars;
  };

  if (!isClient) {
    return (
      <div className="bg-white dark:bg-[#1F2937] rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1F2937] rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4">
        {/* User info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#45B09E] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {safeBookData.userAvatar}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                {safeBookData.userName}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {safeBookData.timeAgo}
            </span>
          </div>
        </div>

        {/* Book content */}
        <div className="flex space-x-4 mb-4">
          {/* Book cover */}
          <div className="flex-shrink-0">
            <Image 
              src={safeBookData.coverImage}
              width={100}
              height={100}
              alt={`${safeBookData.bookTitle} cover`}
              className="w-24 h-32 object-cover rounded-lg shadow-md"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format';
              }}
            />
          </div>

          {/* Book details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1 leading-tight">
              {safeBookData.bookTitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              by {safeBookData.author}
            </p>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center space-x-1">
                {renderStars(safeBookData.rating)}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {safeBookData.rating}/5
              </span>
            </div>

            {/* Meta info */}
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {safeBookData.genre}
              </span>
              <span>{safeBookData.pages} pages</span>
              <span>{safeBookData.yearPublished}</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
              {safeBookData.description}
            </p>
          </div>
        </div>

        {/* Bottom actions - Instagram style */}
        <div
          className="flex items-center justify-between border-t pt-3"
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
            
            <button className="flex items-center space-x-1 group">
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
            
            <button className="group">
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
    </div>
  );
};

// Example usage with sample data
const App = () => {
  const sampleBookData = {
    bookTitle: "1984",
    author: "George Orwell",
    genre: "Dystopian Fiction",
    description: "A dystopian social science fiction novel that follows Winston Smith, a low-ranking member of 'the Party' in London, in a world where the Party rules with total control over its citizens.",
    rating: 4.8,
    pages: 328,
    yearPublished: 1949,
    userName: "রিডার_ঢাকা",
    userAvatar: "র",
    timeAgo: "৩০ মিনিট আগে",
    commentsCount: 18,
    likes: 42,
    coverImage: "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=300&h=400&fit=crop&auto=format"
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Book Activity Feed
        </h1>
        <BookCard bookData={sampleBookData} />
      </div>
    </div>
  );
};

export default BookCard;
