import React, { useState, useEffect } from 'react';
import { MessageCircle, Share2, ChevronUp, ChevronDown, MoreHorizontal, ArrowUp, ArrowDown, Bookmark } from 'lucide-react';

const QACard = ({ qaItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [upvotes, setUpvotes] = useState(qaItem?.upvotes || 128);
  const [downvotes, setDownvotes] = useState(qaItem?.downvotes || 12);
  const [userVote, setUserVote] = useState(null); // null, 'up', or 'down'
  const [isClient, setIsClient] = useState(false);

  // Ensure consistent rendering between server and client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Provide consistent default values
  const safeQaItem = {
    question: qaItem?.question || '',
    answer: qaItem?.answer || '',
    category: qaItem?.category || 'Q&A',
    bio: qaItem?.bio || 'Student',
    timeAgo: qaItem?.timeAgo || '10mo ago',
    commentsCount: qaItem?.commentsCount || 26,
    upvotes: qaItem?.upvotes || 128,
    downvotes: qaItem?.downvotes || 12,
    ...qaItem
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUpvote = () => {
    if (userVote === 'up') {
      setUpvotes(prev => prev - 1);
      setUserVote(null);
    } else {
      if (userVote === 'down') {
        setDownvotes(prev => prev - 1);
      }
      setUpvotes(prev => prev + 1);
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      setDownvotes(prev => prev - 1);
      setUserVote(null);
    } else {
      if (userVote === 'up') {
        setUpvotes(prev => prev - 1);
      }
      setDownvotes(prev => prev + 1);
      setUserVote('down');
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: safeQaItem.question,
        text: `Q: ${safeQaItem.question}\nA: ${safeQaItem.answer.substring(0, 100)}...`,
        url: window.location.href,
      }).catch(error => console.log('Error sharing:', error));
    } else if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`Q: ${safeQaItem.question}\nA: ${safeQaItem.answer}`)
        .then(() => alert('Q&A copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  // Don't render until client-side to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="bg-white dark:bg-[#1F2937] rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1F2937] rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
       {/* Promoted by header (similar to Reddit ads) */}
      {/* <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">Q</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Suggested by {qaItem.category || 'Q&A'}
          </span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div> */}
      <div className="p-4">
        {/* User info and follow button */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-[#45B09E] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                {safeQaItem.category}
              </span>
              <button className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors">
                Follow
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {safeQaItem.bio}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                • {safeQaItem.timeAgo}
              </span>
            </div>
          </div>
        </div>

        {/* Question */}
        <h3 className=" font-semibold text-[16px] text-gray-900 dark:text-gray-100 mb-3 leading-tight">
          {safeQaItem.question}
        </h3>

        {/* Answer */}
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-md leading-relaxed">
            {isExpanded ? safeQaItem.answer : `${safeQaItem.answer.substring(0, 200)}${safeQaItem.answer.length > 200 ? '...' : ''}`}
            {safeQaItem.answer.length > 200 && !isExpanded && (
              <button
                onClick={handleToggleExpand}
                className="ml-1 text-blue-500 hover:text-blue-600 font-medium"
              >
                (more)
              </button>
            )}
          </p>
          
          {isExpanded && safeQaItem.answer.length > 200 && (
            <button
              onClick={handleToggleExpand}
              className="mt-2 text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              Show less
            </button>
          )}
        </div>

        
        <div className="flex items-center justify-between border-t dark:border-gray-700 pt-3"> </div>
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            {/* Upvote */}
            <button 
              onClick={handleUpvote}
              className={`flex items-center rounded-full space-x-1 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors bg-[#F3F4F6] dark:bg-gray-800 ${
                userVote === 'up' ? 'text-orange-500' : ''
              }`}
            >
              <ArrowUp size={16} />
              <span className="text-sm ">Upvote</span>
              <span className="text-sm ">.</span>
              <span className="text-sm ">{upvotes}</span>
            </button>

            {/* Comments */}
            <button className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors">
              <MessageCircle size={16} />
              <span className="text-sm">{safeQaItem.commentsCount}</span>
            </button>

            {/* Share */}
            <button 
              onClick={handleShare}
              className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors"
            >
              <Share2 size={16} />
              <span className="text-sm">Share</span>
            </button>
          </div>

          {/* Bookmark icon at bottom right */}
          <button 
            className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors text-gray-500 dark:text-gray-400"
          >
            <Bookmark size={18} />
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default QACard;